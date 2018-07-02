const EventEmitter = require('events')

module.exports = function(tasksNSP) {
    tasksNSP.on('connection', (socket) => {
        console.log('new user connected ' + socket.id);
        socket.on('disconnect', (socket) => {
            console.log('user disconected' + socket.id)
        })
        socket.on('task', (task) => {
            socket.broadcast.emit('task', task);
            socket.emit('task', task);
        })
        socket.on('task-delete', (taskId) => {
            console.log('here', taskId)
            socket.broadcast.emit('task-delete', taskId)
            socket.emit('task-delete', taskId)
        })
    })
}
