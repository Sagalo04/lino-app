import React from 'react';
import { Avatar } from '@material-ui/core';
import './ServiceRequest.css'

function serviceString(hogar, remoto){
    if(hogar && remoto) return 'Servicio Hogar o Remoto';
    if(hogar) return 'Servicio Hogar';
    if(remoto) return 'Servicio Remoto';
}
function ServiceRequest({info}) {
    return (
        <div className="o-patient">
            <div>
                <Avatar alt="name" src=""></Avatar>
            </div>
            <div >
                <div className="o-patient-service">
                    <p>{info.user}</p>
                    <p className="o-pat-between">  -  </p>
                    <p>{serviceString(info.home, info.remote)}</p>
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

export default ServiceRequest;