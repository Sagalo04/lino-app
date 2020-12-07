import React from 'react'
import OButton from '../../OButton/OButton'
import Timer from './Timer/Timer'

export default function ServiceStarted({ showButton, onClick }) {
    return (
        <div className="o-service">
            <div className='o-service-header'>
                <h3> Consulta en curso</h3>
                <p>Tiempo transcurrido</p>
                <Timer />
                {showButton? <OButton label={"Terminar"} onClick={onClick} />: null}
            </div>
        </div>
    )
}