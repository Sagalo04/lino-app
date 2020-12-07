import React from 'react';
import "./NavIcon.css"

function NavIcon({ title }) {
    return (
        <div className="o-nav-icon">
            <p className="o-nav-icon-title">{title}</p>
        </div>
    );
}

export default NavIcon;