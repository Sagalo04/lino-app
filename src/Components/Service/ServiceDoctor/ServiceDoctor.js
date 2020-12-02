import React, {useEffect, useState} from 'react';
//import '../Service.css'
import ServiceHeader from '../ServiceHeader/ServiceHeader';
import OButton from '../../OButton/OButton'
//service Select

import Map from '../../Map/Map';
import UserProfile from '../../../UserProfile';
import ServiceRequest from './ServiceRequest/ServiceRequest';

//web socket comunication
import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')

const ServiceDoctor = ()=> {
    
    const [home, setHome] = useState(false);
    const [remote, setRemote] = useState(false);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        //subscribe as a doctor
        socket.emit('doctorSubscription');
        //bring back old requests
        socket.emit('retrievePrevRequests');
    });

    useEffect(() => {
        socket.on('requestDoctor', (requests)=>{
            setRequests(requests);
        })
        return ()=> socket.off();
    }, [requests])
    
    //levantamiento de estado
    const handleChange = (k, value) => {
        switch(k){
            case "home":
                setHome(value);
                break;
            case "remote":
                setRemote(value);
        }
    }

    const request = () =>{}

    return (
        <div className="o-body">
            <Map></Map>
            <div className="o-service">
                {/*Tipos de servicio*/}
                <ServiceHeader
                    states={{ home: home, remote: remote }}
                    handler={handleChange}
                    keys={{ home: "home", remote: "remote" }} />
                    {requests.map((request, index)=>{
                    return <ServiceRequest
                                key={index}
                                info={request}/>
                })}
                <OButton label={"Aceptar"} onClick={request}></OButton>
            </div>
        </div>
    );
}

export default ServiceDoctor
/*
export default class ServiceDoctor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            home: false,  //servicio hogar
            remote: false, //servicio remoto
            service: 0, //medico o psicologo
            specialty: 0,
            requests: []
        }
    }

    //Define socket operations
    componentDidMount(){
        
        
    }

    //levantamiento de estado
    handleChange = (k, value) => {
        this.setState({ [k]: value });
    }

    //envio solicitud de servicio
    request = _ => {
        console.log(this.state)
    }


    render() {
        let state = this.state;
        return (
            <div className="o-body">
                <Map></Map>
                <div className="o-service">
                   
                    <ServiceHeader
                        states={{ home: state.home, remote: state.remote }}
                        handler={this.handleChange}
                        keys={{ home: "home", remote: "remote" }} />

                   
                    {state.requests.map((request, index)=>{
                        return <ServiceRequest
                                    key={index}
                                    info={request}/>
                    })}
                    <OButton label={"Aceptar"} onClick={this.request}></OButton>
                </div>
            </div>
        );
    }
}


*/