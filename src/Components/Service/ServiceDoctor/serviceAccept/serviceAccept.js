import React from 'react'
import '../serviceAccept/serviceAccept.css'
import OButton from '../../../OButton/OButton'

export default function Acept({ user, onClick, home }) {
    return (
        <div className="o-service">
            <div className='o-service-header'>
                <h3>{home? `${user} está esperando por ti`: `Inicia un chat con ${user}`} </h3>
                <p>Si presentas alguna dificultad en la consulta no dudes en visitar nuestra sección de <a href="/Ayuda" className="o-ayuda-text">ayuda</a></p>
                <OButton label={"Iniciar consulta"} onClick={onClick} />
            </div>
        </div>
    )
}