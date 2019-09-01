const Express = require('express')
const Socket = require('socket.io')

const Port = process.env.PORT || 3000

// App Setup
const App = Express()
const Server = App.listen(Port, function() {
 console.log('Listening on Port : ' + Port)
})

// Static Files
App.use(Express.static('public'))

// Socket Setup
const IO = Socket(Server)

IO.on('connection', function(socket) {
 console.log('Socket - ' + socket.id)

 socket.on('RoomToJoin', function(RoomName) {
  socket.join(RoomName)
  console.log('Room Joined - ' + RoomName)
 })

 socket.on('chat', function(data) {
  console.log(data.RoomName)
   IO.sockets.to(data.RoomName).emit('chatMsgs', data)
 })
})
