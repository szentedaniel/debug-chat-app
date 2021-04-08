const express = require('express')
const path = require('path')
const http = require('http')
const socket = require('socket.io')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 8000

const app = express()
const server = http.createServer(app)

const io = socket(server)

app.use(express.static(path.join(__dirname, '..', 'public')))

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT} \nOn your network: http://localhost:${PORT}`)
})

let connected_clients = []
let msgs = []

io.on('connection', socket => {
    connected_clients.push(socket)
    console.log('Client connected ', socket.id)
    console.log('connections: ', connected_clients.length);
    

    socket.on('joined', () => {
        console.log(socket.id);
        io.to(socket.id).emit('prev_msgs', msgs)
    })

    socket.on('chat_msg', msg => {
        if (msgs.length <= 20) {
            msgs.push(msg)
        }else{
            msgs.shift()
            msgs.push(msg)
        }
        io.emit('chat_msg', msg)
    })







    socket.on('disconnect', () => {
        connected_clients.pop(socket)
        console.log('Someone disconnected');
        console.log('connections: ', connected_clients.length);

    })
    
})