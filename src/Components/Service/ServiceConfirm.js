import React from 'react';
import ServiceConfirmHeader from './ServiceConfirmHeader/ServiceConfirmHeader';
import './ServiceConfirm.css'
import { Link } from 'react-router-dom';
import OButton from '../OButton/OButton';
//DocCard
import DocCard from './DocCard/DocCard';

function ServiceConfirm(props) {
    return (
        <div className="o-service">
            <ServiceConfirmHeader title="¡Hemos encontrado tu servicio!"/>
            <div className="o-service-contain">
                <DocCard 
                    name="Javier Antonio Vazques"
                    info="Médico Cardiólogo"
                    sourceImg="https://material-ui.com/static/images/avatar/1.jpg"
                />
                <div className="o-service-info">
                    <p>Fecha:</p>
                    <p>29/09/2020</p>
                </div>
                <div className="o-service-info">
                    <p>Hora estimada de llegada:</p>
                    <p>9:00 AM</p>
                </div>
                <div className="o-service-info">
                    <p>Precio de consulta:</p>
                    <p>$35.000</p>

                </div>
                <hr />

                <Link><OButton label={"Confirmar"}></OButton></Link>

            </div>
        </div>
    );
}

export default ServiceConfirm;