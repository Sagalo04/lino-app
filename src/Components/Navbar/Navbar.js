import React from 'react';
import "./Navbar.css"
import NavIcon from './NavIcon/NavIcon';
import { NavLink } from 'react-router-dom';
function Navbar(props) {
    return (
        <header className="o-header">
            <nav className="navbar o-navbar">
                <div className="o-nav-1">
                    <NavLink className="o-nav-title" to="/">
                        <h2 >LINO</h2>
                    </NavLink>
                    <NavLink to="/Reputacion" className="o-navlink">
                        <NavIcon title={"Reputación"} icon={"star"} />
                    </NavLink>
                </div>
                <div className="o-nav-2">
                    <NavLink to="/Ayuda" className="o-navlink">
                        <NavIcon title={"Ayuda"} icon={"question"} />
                    </NavLink>
                    <NavLink to="/User" className="o-navlink">
                        <NavIcon title={"Mi Cuenta"} icon={"user"} />
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;