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

function App() {
  return (
    <Router>
      <div className="App">

        <Navbar></Navbar>
        <Switch>
          <Route path="/User/:id">
            <h3>Usuario</h3>
          </Route>
          <Route path="/User">
            <h3>Usuario</h3>
          </Route>
          <Route path="/Ayuda">
            <h3>Ayuda</h3>
          </Route>
          <Route path="/Reputacion">
            <h3>Reputación</h3>

          </Route>
          <Route path="/" exact>
            <Service></Service>
          </Route>

          <Route path="/Servicio" exact>
            <ServiceConfirm />
          </Route>
        </Switch>
      </div>

    </Router>

  );
}

export default App;
