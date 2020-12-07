import React from 'react';
import OButton from '../OButton/OButton';
import './Help.css'
import lupa from '../../Resources/Images/lupa.svg'


function Help(props) {
    return (
        <div className="o-help">
            <div className="o-content-help">
                <h1 className="o-helpTitle">¿Problemas? <br /> Queremos ayudarte</h1>
                <div className="o-helpinput">
            <input className="o-input-help" placeholder="Escribe tu problema"/>
                    <OButton label={"Buscar"}></OButton>
                </div>
            </div>
            <div className="o-helpDefine">
                <p className="o-title-top">Resultados de búsqueda</p>
                <div className="o-middle-help">
                <img className="o-lupa" alt="" src={lupa}/>
                <p>Sin resultados</p>
                </div>
                <div className="o-bottom-help"> 
                    <div className="o-help-option">
                        <p >Reporta un problema</p>
                        <i class="fas fa-chevron-right helpicon"></i>
                    </div>
                    <div className="o-help-option">
                        <p >Emergencia</p>
                        <i class="fas fa-chevron-right helpicon"></i>
                    </div>
                    <div className="o-help-option">
                        <p >Opciones de pago</p>
                        <i class="fas fa-chevron-right helpicon"></i>
                    </div>
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
