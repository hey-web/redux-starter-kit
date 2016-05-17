'use strict'

const fs = require('fs')
const http = require('http')
const path = require('path')

const basePath = path.dirname(process.argv[1])
const port = process.argv[2] || 4000
const dataFile = './data/index.json'

const EventEmitter = require('events')
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()


let notes = fs.existsSync(dataFile) ? require(dataFile).notes : {}

//Emitter to monitor notes changed
const syncNotes = () => {
	fs.writeFile(dataFile, JSON.stringify({notes: notes}, null, 4),(err) => {
		if(err) throw error
		console.log('sync notes successfully')
	})
}

myEmitter.on('noteChanged', () => {
	//Call sync operation when notes changed
	syncNotes()
})


const genId = () => { return (Math.random() + '').substring(2)}

const genRes = (method, headers, reqPath, data) => {
	return JSON.stringify({
		method,
		headers,
		reqPath,
		data
	}, null, 4)
}

//Manage Notes
const createNote = text => {
	let id = genId()
	let note = {
		id,
		text,
		createdAt: new Date()
	}
	notes[id] = note

	myEmitter.emit('noteChanged')

	return note
}

const getNote = id => {
	return id ? data.notes[id] : null
}

const updateNote = (id, text) => {
	let note = notes[id]
	
	if(!note) return

	note = {
		id,
		text,
		updatedAt: new Date()
	}
	notes[id] = note

	myEmitter.emit('noteChanged')

	return
}

const deleteNote = id => {
	delete notes[id]

	myEmitter.emit('noteChanged')

	return
}

const getNotes = () => notes


const next = (method, option ) => {
	switch(method){
		case 'GET' : return option.id ? getNote(option.id) : getNotes()// Get note or notes
		case 'POST': return createNote(option.text)// Create note
		case 'PUT': return updateNote(option.id,option.text)// Update note
		case 'DELETE': return deleteNote(option.id)// Delete note
		default: return getNotes()// Get all notes
	}
}


const app = http.createServer((req, res)=>{

	let reqUrl = req.url
	let method = req.method
	let id = reqUrl.substr(reqUrl.lastIndexOf('/') + 1)
	let data = ''
	let option = {
		id
	}

	console.log( method + ' ' + reqUrl + '\n' + JSON.stringify(option, null , 4))



	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
	res.setHeader('Content-Type','text/plain')

	if(method === 'POST' || method === 'PUT'){
		req.on('data', (chunk) => {
			data += chunk
		})

		req.on('end', () => {
			console.log('Uploaded data:' + data)
			option.text = JSON.parse(data).text
			let body = JSON.stringify(next(method, option)||{})
			console.log('returned data:'+body)
			res.end(body)
		})
	}else if(method === 'GET' || method === 'DELETE'){
		console.log('get/delete')
		let body = JSON.stringify(next(method, option)||{})
		res.end(body,'utf-8')
	}else{
		res.statusCode = 200
		res.statusMessage = 'OK'
		res.end('')
	}

	req.on('error',error => {
		console.log('An unexpected error happened')
		console.log(error)
	})

})

app.listen(port)
console.log('Server started on %s', port)