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
        <Route path="/" exact>
          <SignIn ></SignIn>
        </Route>

        <Route path="/Home" >
          <Navbar/>
          <Service></Service>
        </Route>

        <Route path="/Servicio">
          <Navbar/>
          <ServiceConfirm />
        </Route>

        <Route path="/Confirm">
          <Navbar/>
          <ServiceConfirm />
        </Route>

        <Route>
          <h1>No found</h1>
          <p>La página que estas buscando no está disponible</p>
        </Route>

      </Switch>
    </Router>

  );
}

export default App;
