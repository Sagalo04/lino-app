import React, { useEffect, useState } from 'react';
//import '../Service.css'
import ServiceHeader from '../ServiceHeader/ServiceHeader';
import OButton from '../../OButton/OButton'
import Map from '../../Map/MapDoc';
import UserProfile from '../../../UserProfile';
import ServiceRequest from './ServiceRequest/ServiceRequest';

//web socket comunication
import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')

const ServiceDoctor = () => {

    const [home, setHome] = useState(false);
    const [remote, setRemote] = useState(false);
    const [requests, setRequests] = useState([]);
    const [index, Setindex] = useState(0);
    const [serviceAccepted, setServiceAccepted] = useState(false);
    
    //valores quemados para pruebas
    const service = 0 //medico
    const specialty = 0 //general

    //criterios para filtrar una peticion
    const checkModality = (request) => {
        //verifica que el tipo de servicio de la peticion (hogar o remoto) coincida con los del medico
        return (home && request.home) || (remote && request.remote)
    }
    const checkKindOfService = (request)=>{
        //verifica que el tipo de servicio y especialidad de la peticion coincidan con el el medico
        return request.service === service && request.specialty === specialty;
    }
    //funcion para filtrar de acuerdo a los criterios
    const filterRequests = (requests) => {
        return requests.filter(request => checkModality(request) && checkKindOfService(request))
    }

    useEffect(() => {
        //subscribe as a doctor
        socket.emit('doctorSubscription');
        //bring back old requests
        socket.emit('retrievePrevRequests', socket.id);
        socket.on('requestDoctor', (requests) => {
            const filtered = filterRequests(requests);
            setRequests(filtered);
        })
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
        }
    }

    const request = () => {
        //doctor info
        let info = {
            name: UserProfile.getMail().split('@')[0],
            specialty: 'Médico General',
            sourceImg: ''
        }
        socket.emit('response', requests[index].id, info);
        setServiceAccepted(true);
    }

    const changeActive = (index) => {
        Setindex(index)
    }

    const checkActive = (indexa) => {
        let color = "#FAFAFA"
        if (index == indexa) {
            color = "#E1F4FF"
        }
        return color
    }

    const checkServiceState = () => {
        if (serviceAccepted) {
            return (
                <div className="o-service">
                    <div className='o-service-header'>
                        <h3>{`${requests[index].user} está esperando por ti`}</h3>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="o-service">
                    {/*Tipos de servicio*/}
                    <ServiceHeader
                        title={"Activa tu Servicio a prestar"}
                        states={{ home: home, remote: remote }}
                        handler={handleChange}
                        keys={{ home: "home", remote: "remote" }} />
                    {/*requests*/}
                    {requests.map((request, index) => {
                        return <ServiceRequest
                            key={index}
                            info={request}
                            changeActive={changeActive.bind(this, index)}
                            color={checkActive(index)}
                            location={requests[index]} />
                    })}
                    {requests.length === 0? null:
                    <OButton label={"Aceptar"} onClick={request}></OButton>}
                </div>
            )
        }
    }

    return (
        <div className="o-body">
            <Map location={requests[index]} />
            {checkServiceState()}
        </div>
    );
}

export default ServiceDoctor
