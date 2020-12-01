import React from 'react';
import './Service.css'
import ServiceHeader from './ServiceHeader/ServiceHeader';
import OButton from '../OButton/OButton'
import { Link } from 'react-router-dom';
//service Select
import ServiceSelect from './ServiceSelect/ServiceSelect';
import ServiceDatePicker from './ServiceDatePicker/ServiceDatePicker';


export default class Service extends React.Component {

    specialtyOptions = ["General", "Cardiólogo"];
    services = {};

    constructor(props) {
        super(props);
        this.state = {
            home: false,  //servicio hogar
            remote: false, //servicio remoto
            service: '', //medico o psicologo
            specialty:'',
        }
    }

    //levantamiento de estado
    handleChange = (k, value) => {
        this.setState({ [k]: value });
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
                    <ServiceSelect label={"Deseo un:"}
                        title={"Médico/Psicólogo"}
                        options={["Médico", "Psicólogo"]}
                        handler={this.handleChange}
                        value= {state.service}
                        k ="service" />

                    {/*Seleccionar especialidad*/}
                    <ServiceSelect label={"Especialidad:"} initialValue={"General"} options={this.specialtyOptions} />
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


