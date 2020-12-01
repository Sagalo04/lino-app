import React from 'react';
import ServiceIcon from './ServiceIcon/ServiceIcon';
import './ServiceHeader.css'

function ServiceHeader({states:{home, remote}, handler, keys}) {
    return (
        <div className="o-service-header">
            <h3>¿Qué servicio deseas?</h3>
            <div className="o-service-icons">
                <ServiceIcon label={"Hogar"} icon={"Home"} checked={home} handler ={handler} k={keys.home}></ServiceIcon>
                <ServiceIcon label={"Remoto"} icon={"Remote"} checked={remote} handler ={handler} k={keys.remote}></ServiceIcon>
            </div>
        </div>
    );
}

export default ServiceHeader;