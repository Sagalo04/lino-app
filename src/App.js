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
import ServiceDoctor from './Components/Service/ServiceDoctor/ServiceDoctor';
import SignIn from './Components/SignIn/SignIn';
import UserProfile from './UserProfile';
import Help from './Components/Help/Help';

//ingreso un doctor o un paciente?
function ServiceType(props){
  if(UserProfile.getProvide()){
    return <ServiceDoctor/>;
  }else{
    return <Service></Service>;
  }
}

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <SignIn ></SignIn>
        </Route>

        <Route path="/Home" >
          <Navbar /> <ServiceType/>
        </Route>

        <Route path="/Servicio">
          <Navbar />
          <ServiceConfirm />
        </Route>

        <Route path="/Confirm">
          <Navbar />
          <ServiceConfirm />
        </Route>

        <Route path="/Ayuda">
          <Navbar />
          <Help />
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
