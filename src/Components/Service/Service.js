import React from 'react';
import './Service.css'
import ServiceHeader from './ServiceHeader/ServiceHeader';
import OButton from '../OButton/OButton'
import { Link } from 'react-router-dom';
//service Select
import ServiceSelect from './ServiceSelect/ServiceSelect';
import ServiceDatePicker from './ServiceDatePicker/ServiceDatePicker';

//web socket comunication
import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')


export default class Service extends React.Component {

    specialtyOptions = ["General", "Cardiólogo", "Pediatra"];
    typeOfService = ["Médico", "Psicólogo"];
    services = {};

    constructor(props) {
        super(props);
        this.state = {
            home: false,  //servicio hogar
            remote: false, //servicio remoto
            service: 0, //medico o psicologo
            specialty: 0,
            date: new Date()
        }
    }

    //levantamiento de estado
    handleChange = (k, value) => {
        this.setState({ [k]: value });
    }

    //envio solicitud de servicio
    request = _=>{
        //console.log(socket)
        socket.emit('request', this.state);
    }
    

    render() {
        let state = this.state;
        return (
            <div className="o-body">
                <div className="o-service">
                    {/*Tipos de servicio*/}
                    <ServiceHeader
                        states={{ home: state.home, remote: state.remote }}
                        handler={this.handleChange}
                        keys={{home: "home", remote: "remote"}} />

                    {/*Seleccionar Medico/Psicologo*/}
                    <ServiceSelect 
                        label={"Deseo un:"}
                        title={"Médico/Psicólogo"}
                        options={this.typeOfService}
                        handler={this.handleChange}
                        value= {state.service}
                        k ="service" />

                    {/*Seleccionar especialidad*/}
                    <ServiceSelect 
                        label={"Especialidad:"}
                        title={"General"}
                        options={this.specialtyOptions}
                        handler={this.handleChange}
                        value= {state.specialty}
                        k ="specialty"/>

                    {/*Seleccionar fecha*/}
                    <ServiceDatePicker
                        value={state.date}
                        handler={this.handleChange}
                        k="date"/>
                    
                    {/*Boton para confimar servicio*/}
                    
                        <OButton label={"Aceptar"} onClick={this.request}></OButton>
                    
                </div>
            </div>
        );
    }
}


