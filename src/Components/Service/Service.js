import React from 'react';
import './Service.css'
import ServiceHeader from './ServiceHeader/ServiceHeader';
import OButton from '../OButton/OButton'
import { Link } from 'react-router-dom';
//service Select
import ServiceSelect from './ServiceSelect/ServiceSelect';
import ServiceDatePicker from './ServiceDatePicker/ServiceDatePicker';


function Service(props) {
   
    return (
        <div className="o-service">
            <ServiceHeader />
            {/*Seleccionar Medico/Psicologo*/}
            <ServiceSelect label={"Deseo un:"} initialValue={"Médico/Psicólogo"} options={["Médico","Psicólogo"]}/>
            
            {/*Seleccionar especialidad*/}
            <ServiceSelect label={"Especialidad:"} initialValue={"General"} options={["General","Cardiólogo"]}/>
            {/*Seleccionar fecha*/}
            <ServiceDatePicker />
            <hr />
            {/*Boton para confimar servicio*/}
            <Link to="/Servicio">
                <OButton label={"Aceptar"}></OButton>
            </Link>
        </div>
    );
}

export default Service;