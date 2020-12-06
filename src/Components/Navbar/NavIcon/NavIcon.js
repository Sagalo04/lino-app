import React from 'react';
import "./NavIcon.css"

const icons = {
    star: "fas fa-star",
    question: "fas fa-question-circle",
    user: "fas fa-user",
    close: "fas fa-sign-out-alt"
}

function GetNavIcon(iconState) {
    let icon = icons[iconState] ? icons[iconState] : "fas fa-question-circle";
    return <i className={icon} size="2x"></i>
}

function NavIcon({ title, icon }) {
    return (
        <div className="o-nav-icon">
            {/* {GetNavIcon(icon)} */}
            <p className="o-nav-icon-title">{title}</p>
        </div>
    );
}

export default NavIcon;