const app = require('express')();
const http = require('http');
const servidor = http.createServer(app);

const SocketIO = require('socket.io')
const io = SocketIO(servidor,{
    cors: {
        origin: '*'
    }
});

//Doctor room
const DOCTOR_ROOM = 'DOCTOR_ROOM';
//requests
const requests = [];

io.on('connection', socket =>{
    socket.on('request', (info)=>{
        requests.push(info);
        console.log('requests',requests)
        //subscribe to my own channel to receive response
        socket.join(info.user);
        //emit only to who ask
        //io.to(info.user).emit('response', 'hola');
        //emit to all doctors
        io.to(DOCTOR_ROOM).emit('requestDoctor', requests);
    });

    //are you a doctor?
    socket.on('doctorSubscription', ()=>{
        console.log(socket.id)
        socket.join(DOCTOR_ROOM)
    })
})

servidor.listen(4000 || process.env.PORT, _=>{
    console.log("Servidor inicializado");
})
