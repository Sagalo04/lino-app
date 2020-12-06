import React from 'react';
import "./Navbar.css"
import NavIcon from './NavIcon/NavIcon';
import { NavLink } from 'react-router-dom';

function Navbar(props) {
    return (
        <header className="o-header">
            <nav className="navbar o-navbar navbar-expand-md" >
                <div className="o-nav-1">
                    <NavLink className="o-nav-title" to="/home">
                        <h2 >LINO</h2>
                    </NavLink>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-bars o-col"></i>
                </button>
                <div class="collapse navbar-collapse navbar-toggleable-xs o-collapse" id="navbarTogglerDemo01">
                        <div className="o-container-icons o-nav-2">
                            <NavLink to="/Ayuda" className="o-navlink">
                                <NavIcon title={"Ayuda"} icon={"question"} />
                            </NavLink>
                            <NavLink to="/User" className="o-navlink">
                                <NavIcon title={"Mi Cuenta"} icon={"user"} />
                            </NavLink>
                            <NavLink to="/" className="o-navlink">
                                <NavIcon title={"Cerrar Sesión"} icon={"close"} />
                            </NavLink>
                        </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;