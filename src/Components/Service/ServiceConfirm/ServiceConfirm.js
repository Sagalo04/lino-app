import React from 'react';
import ServiceConfirmHeader from '../ServiceConfirmHeader/ServiceConfirmHeader';
import './ServiceConfirm.css'
//DocCard
import DocCard from '../DocCard/DocCard';

function ServiceConfirm({name, info, sourceImg, date, home}){

    return(
        <div>
            <ServiceConfirmHeader title="¡Hemos encontrado tu servicio!" />
            <div className="o-service-contain">
                        <DocCard
                            name={name}
                            info={info}
                            sourceImg={sourceImg}
                        />
                        <div className="o-service-info">
                            <p>Fecha:</p>
                            <p>{date}</p>
                        </div>
                        <div className="o-service-info">
                            <p>Hora estimada de llegada:</p>
                            <p>9:00 AM</p>
                        </div>
                        <div className="o-service-info">
                            <p>Precio de consulta:</p>
                            <p>$35.000</p>
                        </div>
                        <br/>
                        <p>{home? 'Pronto llegará donde estás': 'Pronto comenzará un chat entre ambos'}</p>
                        <br/><br/>
                    </div>
        </div>
    );
}

export default ServiceConfirm;
