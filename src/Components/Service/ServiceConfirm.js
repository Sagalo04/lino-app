import { Avatar } from '@material-ui/core';
import React from 'react';
import ServiceHeader from './ServiceHeader/ServiceHeader';
import './ServiceConfirm.css'
import { Link } from 'react-router-dom';
import OButton from '../OButton/OButton';

function ServiceConfirm(props) {
    return (
        <div className="o-service">
            <ServiceHeader />
            <div className="o-service-contain">
                <Avatar alt="name" src="https://material-ui.com/static/images/avatar/1.jpg"></Avatar>
                <p>Javier Antonio Vazques</p>
                <p>Médico Cardiólogo</p>
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