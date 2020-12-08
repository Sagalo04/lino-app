import React from 'react';
import './Button.css'

function OButton({label, onClick, onSubmit}) {

    
    return (
        // boton
        <button className="o-button" onClick={onClick}>{label}</button>
    );
}

export default OButton;