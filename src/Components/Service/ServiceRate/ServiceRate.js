import React from 'react'
import './ServiceRate.css'
import OButton from '../../OButton/OButton'

function reload(){window.location.reload()}

const ServiceRate = ({rateTo, name}) => {
    return (
        <div>
            <div className='o-service-rate'>
                <div className='o-servicerate-header'>
                    <h3>{`Califica a tu ${rateTo}`}</h3>
                </div>
                <p className='o-rate-info'>{`¿Cómo te fue con ${name}?`}</p>
                <p className='o-rate-info'>¿Deseas añadir un comentario adicional?</p>
                <textarea id="textarea" cols="30" rows="5" placeholder="Escríbelo aquí..."></textarea>
            </div>
            <div className="rate-button">
                <OButton label="Enviar" onClick={reload}/>
            </div>
        </div>

    )
}

export default ServiceRate