import React from 'react';
import ServiceIcon from './ServiceIcon/ServiceIcon';
import './ServiceHeader.css'

function ServiceHeader({home, remote, onHomeChange}) {
    
    return (
        <div className="o-service-header">
            <h3>¿Qué servicio deseas?</h3>
            <div className="o-service-icons">
                <ServiceIcon label={"Hogar"} icon={"Home"} checked={home} onHomeChange ={onHomeChange}></ServiceIcon>
                <ServiceIcon label={"Remoto"} icon={"Remote"}></ServiceIcon>
            </div>
        </div>
    );
}

export default ServiceHeader;