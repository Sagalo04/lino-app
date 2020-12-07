import React, { useEffect, useState } from 'react';
import './ServiceDoctor.css'
import ServiceHeader from '../ServiceHeader/ServiceHeader';
import OButton from '../../OButton/OButton'
import Map from '../../Map/MapDoc';
import UserProfile from '../../../UserProfile';
//Service Provider states
import ServiceRequest from './ServiceRequest/ServiceRequest';
import Accept from './serviceAccept/serviceAccept'
import ServiceRate from '../ServiceRate/ServiceRate'
import ServiceStarted from '../ServiceStarted/ServiceStarted'
import Chat from '../Chat/Chat'

//web sockets
import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')

const ServiceStates = {
    initial: 'Initial',
    homeServiceAcepted: 'homeServiceAcepted',
    homeServiceStarted: 'homeServiceStarted',
    remoteServiceAcepted: 'remoteServiceAcepted',
    remoteServiceStarted: 'remoteServiceStarted',
    ended: 'Ended',
    chat: 'chat'
}

const ServiceDoctor = () => {

    const [home, setHome] = useState(false);
    const [remote, setRemote] = useState(false);
    const [requests, setRequests] = useState([]);
    const [index, Setindex] = useState(0);
    const [ServiceState, setServiceState] = useState(ServiceStates.initial);
    const [patient, setPatient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState('');

    //valores quemados para pruebas
    const service = 0 //medico
    const specialty = 0 //general

    //criterios para filtrar una peticion
    const checkModality = (request) => {
        //verifica que el tipo de servicio de la peticion (hogar o remoto) coincida con los del medico
        return (home && request.home) || (remote && request.remote)
    }
    const checkKindOfService = (request) => {
        //verifica que el tipo de servicio y especialidad de la peticion coincidan con el el medico
        return request.service === service && request.specialty === specialty;
    }
    //funcion para filtrar de acuerdo a los criterios
    const filterRequests = (requests) => {
        return requests.filter(request => checkModality(request) && checkKindOfService(request))
    }

    //similar a componentDidMount
    useEffect(() => {
        //suscribirme como doctor para recibir peticiones
        socket.emit('doctorSubscription');
        //consultar peticiones antiguas
        socket.emit('retrievePrevRequests', socket.id);
    }, [])

    useEffect(() => {
        //consultar peticiones antiguas
        socket.emit('retrievePrevRequests', socket.id);
    }, [home, remote, ServiceState])

    //similar a componentDidUpdate
    useEffect(() => {
        //peticion de cita
        socket.on('requestDoctor', (requests) => {
            console.log('Hola', requests)
            const filtered = filterRequests(requests);
            setRequests(filtered);
        });
        //mensaje de chat
        socket.on('message', (message) => {
            setMessages(messages.push(message));
            console.log('mensajes: ', message);
        });
        return () => socket.off();
    });

    //levantamiento de estado
    const handleChange = (k, value) => {
        switch (k) {
            case "home":
                setHome(value);
                break;
            case "remote":
                setRemote(value);
                break;
            case "message":
                setChat(value);
                break;
            default:
                break;
        }
    }
    const refresh = () => {
        setServiceState(ServiceStates.initial);
    }

    const changeActive = (index) => {
        Setindex(index)
    }

    const checkActive = (indexa) => {
        let color = "#FAFAFA"
        if (index === indexa) {
            color = "#E1F4FF"
        }
        return color
    }

    //CICLO DE VIDA DEL SERVICIO
    //aceptar peticion
    const request = () => {
        //doctor info
        let info = {
            name: UserProfile.getMail().split('@')[0],
            specialty: 'Médico General',
            sourceImg: ''
        }
        //setear paciente
        setPatient(requests[index]);

        if (home) {
            setServiceState(ServiceStates.homeServiceAcepted);
            socket.emit('response', requests[index].id, info);
        }
        if (remote) {
            setServiceState(ServiceStates.remoteServiceAcepted);
            socket.emit('response', requests[index].id, info);
        }
    }
    //funcion para enviar mensaje
    const sendMessage = () => {
        let message = { to: patient.id, from: socket.id, content: 'Hola', time: new Date().toLocaleTimeString() };
        socket.emit(message);
    }
    //iniciar consulta
    const homeStart = () => {
        socket.emit('homeStart', patient.id);
        setServiceState(ServiceStates.homeServiceStarted);
    }
    const remoteStart = () => {
        socket.emit('remoteStart', patient.id);
        setServiceState(ServiceStates.remoteServiceStarted);
    }

    //acabar con la consulta
    const terminate = () => {
        socket.emit('terminate', patient.id);
        setServiceState(ServiceStates.ended)
    }

    const checkServiceState = () => {
        switch (ServiceState) {
            //bandeja de entrada iniciada
            case ServiceStates.initial:
                return (
                    <div className="o-service">
                        {/*Tipos de servicio*/}
                        <ServiceHeader
                            title={"Activa tu Servicio a prestar"}
                            states={{ home: home, remote: remote }}
                            handler={handleChange}
                            keys={{ home: "home", remote: "remote" }} />
                        {/*requests*/}
                        <div className="o-request-container">
                            {requests.map((request, index) => {
                                return <ServiceRequest
                                    key={index}
                                    info={request}
                                    changeActive={changeActive.bind(this, index)}
                                    color={checkActive(index)}
                                    location={requests[index]} />
                            })}
                        </div>
                        {requests.length === 0 ? null :
                            <OButton label={"Aceptar"} onClick={request}></OButton>}
                    </div>
                );
            //servicio hogar aceptado
            case ServiceStates.homeServiceAcepted:
                return <Accept home={true} user={patient.user} onClick={homeStart} />
            //servicio hogar iniciado
            case ServiceStates.homeServiceStarted:
                return <ServiceStarted showButton={true} onClick={terminate} />
            //servicio remoto aceptado
            case ServiceStates.remoteServiceAcepted:
                return <Accept home={false} user={patient.user} onClick={remoteStart} />
            //servicio remoto iniciado
            case ServiceStates.remoteServiceStarted:
                return <Chat messages={messages} other={patient.user} handler={handleChange} k={'message'} />
            //servicio finalizado
            case ServiceStates.ended:
                return (
                    <div className="o-service">
                        <ServiceRate rateTo="paciente" name={patient.user} onClick={refresh} />
                    </div>
                );
            default:
                break;
        }
    }
    return (
        <div className="o-body">
            <Map location={patient || requests[index]} />
            {checkServiceState()}
        </div>
    );
}

export default ServiceDoctor
