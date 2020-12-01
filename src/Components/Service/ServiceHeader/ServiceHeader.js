import React from 'react';
import ServiceIcon from './ServiceIcon/ServiceIcon';
import './ServiceHeader.css'

function ServiceHeader({states:{home, remote}, handleChange, keys}) {
    return (
        <div className="o-service-header">
            <h3>¿Qué servicio deseas?</h3>
            <div className="o-service-icons">
                <ServiceIcon label={"Hogar"} icon={"Home"} checked={home} handler ={handleChange} k={keys.home}></ServiceIcon>
                <ServiceIcon label={"Remoto"} icon={"Remote"} checked={remote} handler ={handleChange} k={keys.remote}></ServiceIcon>
            </div>
        </div>
    );
}

export default ServiceHeader;