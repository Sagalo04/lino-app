import React, { useEffect, useState } from 'react';
//import '../Service.css'
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

//web socket comunication
import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')

const ServiceStates = {
    initial: 'Initial',
    serviceAcepted: 'serviceAcepted',
    serviceStarted: 'serviceStarted',
    ended: 'Ended'
}

const ServiceDoctor = () => {

    const [home, setHome] = useState(false);
    const [remote, setRemote] = useState(false);
    const [requests, setRequests] = useState([]);
    const [index, Setindex] = useState(0);
    const [ServiceState, setServiceState] = useState(ServiceStates.initial);
    const [patient, setPatient] = useState(null);

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
    useEffect(()=>{
        //bring back old requests
        socket.emit('retrievePrevRequests', socket.id);
    },[])

    //similar a componentDidUpdate
    useEffect(() => {
        //subscribe as a doctor
        socket.emit('doctorSubscription');
        
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
    //accept request
    const request = () => {
        //doctor info
        let info = {
            name: UserProfile.getMail().split('@')[0],
            specialty: 'Médico General',
            sourceImg: ''
        }
        //set patient
        setPatient(requests[index]);
        socket.emit('response', requests[index].id, info);
        setServiceState(ServiceStates.serviceAcepted);
    }
    //iniciar consilta
    const start = () => {
        socket.emit('start', patient.id);
        setServiceState(ServiceStates.serviceStarted);
    }
    //acabar con la consulta
    const terminate = () => {
        socket.emit('terminate', patient.id);
        setServiceState(ServiceStates.ended)
    }

    const checkServiceState = () => {
        switch (ServiceState) {
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
            case ServiceStates.serviceAcepted:
                return <Accept user={patient.user} onClick={start} />
                
            case ServiceStates.serviceStarted:
                return <ServiceStarted showButton={true} onClick={terminate} />

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
