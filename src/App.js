import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Service from './Components/Service/Service';
import ServiceDoctor from './Components/Service/ServiceDoctor/ServiceDoctor';
import SignIn from './Components/SignIn/SignIn';
import UserProfile from './UserProfile';
import Help from './Components/Help/Help';
import Acount from './Components/Acount/Acount';

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

        <Route path="/Ayuda">
          <Navbar />
          <Help />
        </Route>

        <Route path="/User">
          <Navbar />
          <Acount />
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
