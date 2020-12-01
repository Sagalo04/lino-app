import React from 'react';
import './Service.css'
import ServiceHeader from './ServiceHeader/ServiceHeader';
import OButton from '../OButton/OButton'
import { Link } from 'react-router-dom';
//service Select
import ServiceSelect from './ServiceSelect/ServiceSelect';
import ServiceDatePicker from './ServiceDatePicker/ServiceDatePicker';


export default class Service extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            home: false,  //servicio hogar
            remote: false, //servicio remoto
            specialty: [
                "General",
                "Cardiólogo"
            ]
        }
    }

    //levantamiento de estado
    handleHomeChange = (value) => {
        this.setState({home: value});
    }

    render(){
        let state = this.state;
        return (
            <div className="o-body">
                <div className="o-service">
                    <ServiceHeader home={state.home} onHomeChange = {this.handleHomeChange}/>
                    {/*Seleccionar Medico/Psicologo*/}
                    <ServiceSelect label={"Deseo un:"} initialValue={"Médico/Psicólogo"} options={["Médico", "Psicólogo"]} />
    
                    {/*Seleccionar especialidad*/}
                    <ServiceSelect label={"Especialidad:"} initialValue={"General"} options={this.state.specialty} />
                    {/*Seleccionar fecha*/}
                    <ServiceDatePicker />
                    <hr />
                    {/*Boton para confimar servicio*/}
                    <Link to="/Servicio">
                        <OButton label={"Aceptar"}></OButton>
                    </Link>
                </div>
            </div>
        );
    }
}


