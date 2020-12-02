import React from 'react';
//import '../Service.css'
import ServiceHeader from '../ServiceHeader/ServiceHeader';
import OButton from '../../OButton/OButton'
//service Select

import Map from '../../Map/MapDoc';
import UserProfile from '../../../UserProfile';
import ServiceSelect from './ServiceSelect/ServiceSelect';



export default class ServiceDoctor extends React.Component {

    specialtyOptions = ["General", "Cardiólogo", "Pediatra"];
    typeOfService = ["Médico", "Psicólogo"];
    services = {};
    constructor(props) {
        console.log(UserProfile.getMail())
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
        console.log(this.state)
    }
    

    render() {
        let state = this.state;
        let location= {lat: 3.4143397,long: -76.53682194444444}
        return (
            <div className="o-body">
                <Map location={location}></Map>
                <div className="o-service">
                    {/*Tipos de servicio*/}
                    <ServiceHeader
                        states={{ home: state.home, remote: state.remote }}
                        handler={this.handleChange}
                        keys={{home: "home", remote: "remote"}} />
                    <ServiceSelect></ServiceSelect>
                        <OButton label={"Aceptar"} onClick={this.request}></OButton>
                    
                </div>
                
            </div>
            
        );
    }
}


