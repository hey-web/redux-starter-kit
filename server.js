'use strict'

const fs = require('fs')
const http = require('http')
const path = require('path')

const basePath = path.dirname(process.argv[1])
const port = process.argv[2] || 4000
const dataFile = './data/index.json'

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();


let notes = require(dataFile).notes

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
});


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
		text,
		createdAt: new Date()
	}
	notes[id] = note

	myEmitter.emit('noteChanged')
}

const getNote = id => {
	return id ? data.notes[id] : null
}

const updateNote = (id, text) => {
	let note = notes[id]
	
	if(!note) return

	note = {
		text,
		createdAt: new Date()
	}
	notes[id] = note

	myEmitter.emit('noteChanged')
}

const deleteNote = id => {
	delete notes[id]

	myEmitter.emit('noteChanged')
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
	console.log(reqUrl);
	let option = {
		id
	}

	console.log(option);

	let data = ''

	if(method === 'POST' || method === 'PUT'){
		req.on('data', (chunk) => {
			data += chunk
		})

		req.on('end', () => {
			option.text = JSON.parse(data).text;
			res.end(JSON.stringify(next(method, option)))
		})
	}else{
		res.end(JSON.stringify(next(method, option)))
	}

})

app.listen(port)
console.log('Server started on %s', port)