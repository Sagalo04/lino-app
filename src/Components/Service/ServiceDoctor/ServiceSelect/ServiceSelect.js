import React from 'react';
import { Avatar } from '@material-ui/core';
import './ServiceSelect.css'

function ServiceSelect(props) {
    return (
        <div className="o-patient">
            <div>
                <Avatar alt="name" src=""></Avatar>
            </div>
            <div >
                <div className="o-patient-service">
                    <p>Paciente 2</p>
                    <p className="o-pat-between">  -  </p>
                    <p> Servicio Hogar</p>
                </div>
                <div className="o-patient-service">
                    <p>Carrera 98a #25-9</p>
                    <p className="o-pat-between">  -  </p>
                    <p>Valle del Lili-Cali</p>
                </div>
                <p className="o-distance">A 7 km</p>
            </div>
        </div>
    );
}

export default ServiceSelect;