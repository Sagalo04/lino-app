import React from 'react';
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

export default class ServiceDoctor extends React.Component {

    specialtyOptions = ["General", "Cardiólogo", "Pediatra"];
    typeOfService = ["Médico", "Psicólogo"];

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
        //subscribe as a doctor
        socket.emit('doctorSubscription');
        socket.emit('retrievePrevRequests');
        socket.on('requestDoctor', (requests)=>{
            this.setState({requests})
        })
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
                    {/*Tipos de servicio*/}
                    <ServiceHeader
                        states={{ home: state.home, remote: state.remote }}
                        handler={this.handleChange}
                        keys={{ home: "home", remote: "remote" }} />

                    {/*Services available*/}
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


