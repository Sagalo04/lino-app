const app = require('express')();
const http = require('http');
const servidor = http.createServer(app);

const SocketIO = require('socket.io')
const io = SocketIO(servidor,{
    cors: {
        origin: '*'
    }
});

io.on('connection', socket =>{
    socket.on('request', (info)=>{
        console.log('service request info',info)
        console.log('from', info.user)
        //subscribe to my own channel to receive response
        socket.join(info.user);
        //wmit only to who ask
        io.to(info.user).emit('response', 'hola');
    })
})

servidor.listen(4000 || process.env.PORT, _=>{
    console.log("Servidor inicializado");
})
