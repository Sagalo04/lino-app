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
var requests = [];

function deleteRequest(id){
    requests = requests.filter(request => request.id !== id);
}

io.on('connection', socket =>{
    socket.on('request', (info)=>{
        requests.push(info);
        console.log('requests',requests)
        //emit to all doctors
        io.to(DOCTOR_ROOM).emit('requestDoctor', requests);
    });

    //are you a doctor?
    socket.on('doctorSubscription', ()=>{
        socket.join(DOCTOR_ROOM)
    })

    socket.on('retrievePrevRequests', (id)=>{
        io.to(id).emit('requestDoctor', requests);
    })

    socket.on('response', (id, docInfo)=>{
        deleteRequest(id);
        io.to(id).emit('response', docInfo);
    })

    socket.on('delete', ()=>{
        deleteRequest(socket.id);
        io.to(DOCTOR_ROOM).emit('requestDoctor', requests);
    })

    socket.on('start', id =>{
        io.to(id).emit('start');
    })

    socket.on('terminate', id =>{
        io.to(id).emit('terminate');
    })
})

servidor.listen(4000 || process.env.PORT, _=>{
    console.log("Servidor inicializado");
})
