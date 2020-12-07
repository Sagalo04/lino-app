import React from 'react';
import './Button.css'

function OButton({label, onClick}) {
    return (
        // boton
        <button className="o-button" onClick={onClick}>{label}</button>
    );
}

export default OButton;