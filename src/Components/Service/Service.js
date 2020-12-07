import React, { useState, useEffect } from 'react';
import './Service.css'
import ServiceHeader from './ServiceHeader/ServiceHeader';
import OButton from '../OButton/OButton'
//service Select
import ServiceSelect from './ServiceSelect/ServiceSelect';
import ServiceDatePicker from './ServiceDatePicker/ServiceDatePicker';
import Map from '../Map/Map';
import UserProfile from '../../UserProfile';
//import service states
import ServicePending from './ServicePending/ServicePending';
import ServiceConfirm from './ServiceConfirm/ServiceConfirm';
import ServiceRate from './ServiceRate/ServiceRate';
import ServiceStarted from './ServiceStarted/ServiceStarted';
import Chat from './Chat/Chat';

import { services } from '../../Constants/Services'


//web socket comunication
import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')

const ServiceStates = {
    initial: 'Initial',
    pending: 'Pending',
    resolved: 'Resolved',
    homeServiceStarted: 'homeServiceStarted',
    remoteServiceStarted: 'remoteServiceStarted',
    ended: 'Ended'
}

function Service() {
    //states
    const [user, setUser] = useState(UserProfile.getMail());
    const [home, setHome] = useState(false);
    const [remote, setRemote] = useState(false);
    const [service, setService] = useState(0);
    const [specialty, setSpecialty] = useState(0);
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [ServiceState, setServiceState] = useState(ServiceStates.initial);
    const [error, setError] = useState();
    const [doctor, setDoctor] = useState({});
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState('');

    //levantamiento de estado
    const handleChange = (k, value) => {
        switch (k) {
            case "user":
                setUser(value);
                break;
            case "home":
                setHome(value);
                break;
            case "remote":
                setRemote(value);
                break;
            case "service":
                setService(value);
                break;
            case "specialty":
                setSpecialty(value);
                break;
            case "date":
                setDate(value);
                break;
            case "location":
                setLocation(value);
                break;
            case "message":
                setChat(value);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        //cuando responden a la peticion
        socket.on('response', (docInfo) => {
            setDoctor(docInfo)
            setServiceState(ServiceStates.resolved);
        });
        //cuando inicia la consulta
        socket.on('homeStart', () => {
            setServiceState(ServiceStates.homeServiceStarted);
        });
        socket.on('remoteStart', () => {
            setServiceState(ServiceStates.remoteServiceStarted);
        });
        //cuando terminan el servicio
        socket.on('terminate', () => {
            setServiceState(ServiceStates.ended);
            setMessages([]);
        });
        socket.on('message', (message) => {
            console.log(messages)
            let totales = messages.push(message)
            setMessages(totales);
        });
    })

    //CLICLO DE VIDA DEL SERVICIO
    //envio solicitud de servicio
    const request = _ => {
        //validar si ha seleccionado un tipo de servicio
        if (!home && !remote) {
            setError(true);
        } else {
            const info = { id: socket.id, user, home, remote, service, specialty, date, location };
            socket.emit('request', info);
            setError(false);
            setServiceState(ServiceStates.pending);
        }
    }

    const refresh = () => {
        setServiceState(ServiceStates.initial);
    }

    //funcion para cancelar servicio
    const deleteRequest = () => {
        socket.emit('delete');
        setServiceState(ServiceStates.initial);
    }

    //funcion para enviar mensaje
    const sendMessage = () => {
        let message = { to: doctor.id, from: socket.id, content: chat, time: new Date().toLocaleTimeString() };
        setChat('');
        socket.emit('message', message);
    }

    //acabar con la consulta
    const terminate = () => {
        socket.emit('terminate', doctor.id);
        setServiceState(ServiceStates.ended)
        setMessages([]);
    }

    const checkServiceState = () => {
        switch (ServiceState) {
            //initial state render
            case ServiceStates.initial:
                return (
                    <div className="o-service">
                        {/*Tipos de servicio*/}
                        <ServiceHeader
                            title={"¿Qué tipo de servicio deseas?"}
                            states={{ home: home, remote: remote }}
                            handler={handleChange}
                            keys={{ home: "home", remote: "remote" }} />
                        {/*Seleccionar Medico/Psicologo*/}
                        <ServiceSelect
                            label={"Deseo un:"}
                            title={"Médico/Psicólogo"}
                            options={services.map(e => e.label)}
                            handler={handleChange}
                            value={service}
                            k="service" />
                        {/*Seleccionar especialidad*/}
                        <ServiceSelect
                            label={"Especialidad:"}
                            title={"General"}
                            options={services[service].specialties}
                            handler={handleChange}
                            value={specialty}
                            k="specialty" />
                        {/*Seleccionar fecha*/}
                        <ServiceDatePicker
                            value={date}
                            handler={handleChange}
                            k="date" />
                        {/*mensaje de error por si no selecciona el tipo de servicio*/}
                        {error ? <div className="o-error-message-service">
                            <p>Debes seleccionar un al menos un tipo de servicio.<br /> Inténtalo de nuevo</p>
                        </div>
                            : null}
                        {/*Boton para enviar servicio*/}
                        <OButton label={"Aceptar"} onClick={request}></OButton>
                    </div>
                );
            //pending state render
            case ServiceStates.pending:
                return (
                    <div className="o-service">
                        <ServicePending deleteRequest={deleteRequest} />
                    </div>
                );
            //resolved state render
            case ServiceStates.resolved:
                return (
                    <div className="o-service">
                        <ServiceConfirm
                            name={doctor.name}
                            info={doctor.specialty}
                            sourceImg={doctor.sourceImg}
                            date={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                            home={home}
                        />
                    </div>
                );
            //homeServiceStarted state render
            case ServiceStates.homeServiceStarted:
                return <ServiceStarted showButton={false} />;
            //remoteServiceStarted state render
            case ServiceStates.remoteServiceStarted:
                return <Chat other={doctor.name} k="message" messages={messages} handler={handleChange} send={sendMessage} value={chat} end={terminate}/>
            //service ended state render
            case ServiceStates.ended:
                return (
                    <div className="o-service">
                        <ServiceRate rateTo="doctor" name={doctor.name} onClick={refresh} />
                    </div>
                )
            default:
                break;
        }
    }

    return (
        <div className="o-body">
            <Map value={location}
                k="location"
                handler={handleChange}
            />
            {checkServiceState()}
        </div>
    );
}

export default Service

