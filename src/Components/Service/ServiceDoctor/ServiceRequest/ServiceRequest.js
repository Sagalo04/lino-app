import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import './ServiceRequest.css'

function serviceString(hogar, remoto) {
    if (hogar && remoto) return 'Servicio Hogar o Remoto';
    if (hogar) return 'Servicio Hogar';
    if (remoto) return 'Servicio Remoto';
}


function ServiceRequest({ info, changeActive, color, location }) {
    const [direction, setDirection] = useState('');
    const [city, setCity] = useState('');
    const locationAdress = (location) => {
        
        const apikey = "Wj9_EjUtlEwzDVI2NJjCoSOsRc2iFSIDISNitVRusfk"
        const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${apikey}&mode=retrieveAddresses&prox=${location.lat},${location.lng}`
        fetch(url)
            .then(res => res.json())
            .then((resJson) => {
    
                //console.log(resJson.Response.View[0].Result[0].Location.Address.Label.split(',')[1].split(" ")[2])
                let str = resJson.Response.View[0].Result[0].Location.Address.Label.split(',')[0]
                let strC = resJson.Response.View[0].Result[0].Location.Address.Label.split(',')[1].split(" ")[2]
                setCity(strC)
                setDirection(str)
            })
            .catch((e) => {
                console.log('Error in getAddressFromCoordinates', e)
            })
    }

    //const [str, setStr] = useState('');
    //setStr(locationAdress(location.location))
    locationAdress(location.location)
    return (
        <div style={{ backgroundColor: `${color}` }} className="o-patient" onClick={changeActive}>
            <div>
                <Avatar alt="name" src=""></Avatar>
            </div>
            <div >
                <div className="o-patient-service">
                    <p>{info.user}</p>
                    <p className="o-pat-between">  -  </p>
                    <p>{serviceString(info.home, info.remote)}</p>
                </div>
                <div className="o-patient-service">
                    <p>{direction}</p>
                    <p className="o-pat-between">  -  </p>
                    <p>{city}</p>
                </div>
                <p className="o-distance">A 7 km</p>
            </div>
        </div>
    );
}

export default ServiceRequest;