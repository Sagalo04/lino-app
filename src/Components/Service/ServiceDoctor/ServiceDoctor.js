import React, { useEffect, useState } from 'react';
//import '../Service.css'
import ServiceHeader from '../ServiceHeader/ServiceHeader';
import OButton from '../../OButton/OButton'
//service Select

import Map from '../../Map/MapDoc';
import UserProfile from '../../../UserProfile';
import ServiceRequest from './ServiceRequest/ServiceRequest';

//web socket comunication
import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')

const ServiceDoctor = () => {

    const [home, setHome] = useState(false);
    const [remote, setRemote] = useState(false);
    const [requests, setRequests] = useState([]);
    const [index, Setindex] = useState(0)

    const filterRequests = (requests) => {
        return requests.filter(request => {
            let homeBool = false;
            let remoteBool = false;
            if (home) {
                if (request.home) homeBool = true
            }
            if (remote) {
                if (request.remote) remoteBool = true
            }
            return homeBool || remoteBool;
        }
        )
    }

    useEffect(() => {
        //subscribe as a doctor
        socket.emit('doctorSubscription');
        //bring back old requests
        socket.emit('retrievePrevRequests');
    });

    useEffect(() => {
        socket.on('requestDoctor', (requests) => {
            const filtered = filterRequests(requests);
            setRequests(filtered);
        })
        return () => socket.off();
    }, [requests])

    //levantamiento de estado
    const handleChange = (k, value) => {
        switch (k) {
            case "home":
                setHome(value);
                break;
            case "remote":
                setRemote(value);
        }
    }

    const request = () => {
        const filtered = filterRequests(requests);
        console.log(filtered);
    }

    const changeActive = (index) => {
        Setindex(index)
        //console.log(requests[index].location)
    }

    const checkActive = (indexa) => {
        let color = "#FFFFFF"
        if (index == indexa) {
            color = "#B9E1FF"

        }

        return color
    }




    return (
        <div className="o-body">
            <Map 
            location={requests[index]}
            />
            <div className="o-service">
                {/*Tipos de servicio*/}
                <ServiceHeader
                    title={"Activa tu Servicio a prestar"}
                    states={{ home: home, remote: remote }}
                    handler={handleChange}
                    keys={{ home: "home", remote: "remote" }} />
                {requests.map((request, index) => {
                    return <ServiceRequest
                        key={index}
                        info={request}
                        changeActive={changeActive.bind(this, index)}
                        color={checkActive(index)}
                        location={requests[index]}/>       
                })}
                <OButton label={"Aceptar"} onClick={request}></OButton>
            </div>
        </div>
    );
}

export default ServiceDoctor
/*
export default class ServiceDoctor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            home: false,  //servicio hogar
            remote: false, //servicio remoto
            service: 0, //medico o psicologo
            specialty: 0,
            requests: []
        }
    }

    //Define socket operations
    componentDidMount(){


    }

    //levantamiento de estado
    handleChange = (k, value) => {
        this.setState({ [k]: value });
    }

    //envio solicitud de servicio
    request = _ => {
        console.log(this.state)
    }


    render() {
        let state = this.state;
        let location= {lat: 3.4143397,long: -76.53682194444444}
        return (
            <div className="o-body">
                <Map location={location}></Map>
                <div className="o-service">

                    <ServiceHeader
                        states={{ home: state.home, remote: state.remote }}
                        handler={this.handleChange}
<<<<<<< HEAD
                        keys={{home: "home", remote: "remote"}} />
                    <ServiceSelect ></ServiceSelect>
                    <ServiceSelect ></ServiceSelect>
                    <ServiceSelect ></ServiceSelect>
                    <OButton label={"Aceptar"} onClick={this.request}></OButton>

=======
                        keys={{ home: "home", remote: "remote" }} />


                    {state.requests.map((request, index)=>{
                        return <ServiceRequest
                                    key={index}
                                    info={request}/>
                    })}
                    <OButton label={"Aceptar"} onClick={this.request}></OButton>
>>>>>>> 9d4a614404bf966fac677dd2cd429f919eeb2836
                </div>
            </div>
        );
    }
}


*/