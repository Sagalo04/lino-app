import React from 'react'
import '../serviceAccept/serviceAccept.css'
import OButton from '../../../OButton/OButton'

export default function Acept({user,request}){
    return(
<div className="o-service">
<div className='o-service-header'>
    <h3> {user} está esperando por ti</h3>
    <p>Si presentas alguna dificultad en la consulta no dudes en visitar nuestra sección de <a href="/Ayuda" className="o-ayuda-text">ayuda</a></p>
    <OButton label={"Terminar"} />

</div>
</div>
)
}