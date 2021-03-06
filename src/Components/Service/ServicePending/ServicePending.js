import React from 'react';
import './ServicePending.css';
import OButton from '../../OButton/OButton'

function ServicePending({deleteRequest}){
    return(
        <div>
            <div className="o-service-header">
                <h3>Esperando confirmación</h3>
            </div>
            <div className="o-service-pending">
                <p className="o-message-pending">
                    Tu servicio estará listo en breve
                </p>
                <svg  className="pending">
                    <circle r="30" cx="50%" cy="50%"/>
                </svg>
                <OButton label={"Cancelar Servicio"} onClick={deleteRequest}/>
            </div>
        </div>
    );
}

export default ServicePending;