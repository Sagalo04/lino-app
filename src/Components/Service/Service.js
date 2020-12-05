import React from 'react';
import './Service.css'
import ServiceHeader from './ServiceHeader/ServiceHeader';
import OButton from '../OButton/OButton'
//service Select
import ServiceSelect from './ServiceSelect/ServiceSelect';
import ServiceDatePicker from './ServiceDatePicker/ServiceDatePicker';
import Map from '../Map/Map';
import UserProfile from '../../UserProfile';
import ServicePending from './ServicePending/ServicePending'

//import specialtyOptions
import { typeOfService, specialtyOptions } from '../../Constants/Services'
//import service states
import ServiceStates from '../../Constants/ServiceStates'

//web socket comunication
import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')

socket.on('response', (message) => {
    console.log(message);
})

export default class Service extends React.Component {

    specialtyOptions = specialtyOptions;
    typeOfService = typeOfService;

    constructor(props) {
        super(props);
        this.state = {
            user: UserProfile.getMail(),
            home: false,  //servicio hogar
            remote: false, //servicio remoto
            service: 0, //medico o psicologo
            specialty: 0,
            date: new Date(),
            location: '',
            ServiceState: ServiceStates.initial, //start in initial state
            error: false,
        }
    }

    //levantamiento de estado
    handleChange = (k, value) => {
        this.setState({ [k]: value });
    }

    //envio solicitud de servicio
    request = _ => {
        let state = this.state;
        //validar si ha seleccionado un tipo de servicio
        if(!state.home && !state.remote){
            this.setState({error: true})
        }else{
            socket.emit('request', this.state);
            this.setState({error: false, ServiceState: ServiceStates.pending})
        }
    }

    checkServiceState = () => {
        let state = this.state;

        switch(state.ServiceState){
            //initial state render
            case ServiceStates.initial:
                return (
                    <div className="o-service">
                        {/*Tipos de servicio*/}
                        <ServiceHeader
                            title={"¿Qué servicio deseas?"}
                            states={{ home: state.home, remote: state.remote }}
                            handler={this.handleChange}
                            keys={{ home: "home", remote: "remote" }} />
                        {/*Seleccionar Medico/Psicologo*/}
                        <ServiceSelect
                            label={"Deseo un:"}
                            title={"Médico/Psicólogo"}
                            options={this.typeOfService}
                            handler={this.handleChange}
                            value={state.service}
                            k="service" />
                        {/*Seleccionar especialidad*/}
                        <ServiceSelect
                            label={"Especialidad:"}
                            title={"General"}
                            options={this.specialtyOptions}
                            handler={this.handleChange}
                            value={state.specialty}
                            k="specialty" />
                        {/*Seleccionar fecha*/}
                        <ServiceDatePicker
                            value={state.date}
                            handler={this.handleChange}
                            k="date" />
                        {/*mensaje de error por si no selecciona el tipo de servicio*/}
                        {state.error? <div className="o-error-message-service">
                                <p>Debes seleccionar un al menos un tipo de servicio.<br/> Inténtalo de nuevo</p>
                            </div>
                        :null}
                        {/*Boton para enviar servicio*/}
                        <OButton label={"Aceptar"} onClick={this.request}></OButton>
                    </div>
                );
            //pending state render
            case ServiceStates.pending:
                return (
                    <div className="o-service">
                        <ServicePending/>
                    </div>
                );
            //resolved state render
            case ServiceStates.resolved:
                return(
                    <div className="o-service">Hola</div>
                );
        }
    }

    render() {
        return (
            <div className="o-body">
                <Map value={this.state.location}
                    k="location"
                    handler={this.handleChange}
                />
                {this.checkServiceState()}
            </div>
        );
    }
}


