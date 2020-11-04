import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
        <Route path="/" exact>

          <div className="App">
            <Navbar></Navbar>
            <Router>
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
                <Route path="/" exact>
                  <Service></Service>
                </Route>
                {/*Ruta para confirmar servicio*/}
                <Route path="/Servicio" exact>
                  <ServiceConfirm />
                </Route>
                {/*Ruta de recurso no encontrado*/}
                <Route>
                  <h1>No found</h1>
                  <p>La página que estas buscando no está disponible</p>
                </Route>
              </Switch>
            </Router>
          </div>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
