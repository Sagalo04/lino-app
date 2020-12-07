import React from 'react';
import OButton from '../OButton/OButton';
import './Help.css'
import lupa from '../../Resources/Images/lupa.svg'


function Help(props) {
    return (
        // contenedor mayor
        <div className="o-help">
            {/* contendor de los recursos dentro de la imagen */}
            <div className="o-content-help">
                <h1 className="o-helpTitle">¿Problemas? <br /> Queremos ayudarte</h1>
                <div className="o-helpinput">
            <input className="o-input-help" placeholder="Escribe tu problema"/>
                    <OButton label={"Buscar"}></OButton>
                </div>
            </div>
            {/* panel de la derecha */}
            <div className="o-helpDefine">
                {/* titulo del panel */}
                <p className="o-title-top">Resultados de búsqueda</p>
                <div className="o-middle-help">
                    {/* icono de la lupa */}
                <img className="o-lupa" alt="" src={lupa}/>
                <p>Sin resultados</p>
                </div>
                {/* opciones de busqueda rapida */}
                <div className="o-bottom-help"> 
                {/* opciones con su icono de flecha */}
                    <div className="o-help-option">
                        <p >Reporta un problema</p>
                        <i class="fas fa-chevron-right helpicon"></i>
                    </div>
                    {/* opciones con su icono de flecha */}
                    <div className="o-help-option">
                        <p >Emergencia</p>
                        <i class="fas fa-chevron-right helpicon"></i>
                    </div>
                    {/* opciones con su icono de flecha */}
                    <div className="o-help-option">
                        <p >Opciones de pago</p>
                        <i class="fas fa-chevron-right helpicon"></i>
                    </div>
                    {/* opciones con su icono de flecha */}
                    <div className="o-help-option">
                        <p >Desembolsos </p>
                        <i class="fas fa-chevron-right helpicon"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help;
