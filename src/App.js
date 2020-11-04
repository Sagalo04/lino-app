import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import Service from './Components/Service/Service';
import ServiceConfirm from './Components/Service/ServiceConfirm';
import SignIn from './Components/SignIn/SignIn';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <SignIn ></SignIn>
        </Route>
        <Route path="/home">
          <Router>
            <div className="App">
              <Navbar></Navbar>
              <Switch>
                {/*Ruta para la informacion del usuario*/}
                <Route path="/User/:id">
                  <h3>Usuario</h3>
                </Route>
                {/*Ruta para la informacion del usuario*/}
                <Route path="/User">
                  <h3>Usuario</h3>
                </Route>
                {/*Ruta para pagina de ayuda*/}
                <Route path="/Ayuda">
                  <h3>Ayuda</h3>
                </Route>
                {/*Ruta para reputacion del usuario*/}
                <Route path="/Reputacion">
                  <h3>Reputación</h3>
                </Route>
                {/*Ruta de pagina principal*/}
                <Route path="/home" >
                  <Service></Service>
                </Route>
                {/*Ruta para confirmar servicio*/}
                <Route path="/Servicio">
                  <ServiceConfirm />
                </Route>
                {/*Ruta de recurso no encontrado*/}
                <Route>
                  <h1>No found</h1>
                  <p>La página que estas buscando no está disponible</p>
                </Route>
              </Switch>
            </div>
          </Router>
        </Route>
        <Route path="/">
          <Redirect to="/signin"></Redirect>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
