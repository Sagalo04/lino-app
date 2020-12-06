import React from 'react'
import './ServiceConfirmHeader.css'

function ServiceConfirmHeader({title}){
    return (
        <div className="o-service-confirm-header">
            <h3 className="o-confirmTitle">{title}</h3>
        </div>
    );
}

export default ServiceConfirmHeader