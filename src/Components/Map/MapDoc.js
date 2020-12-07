import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import CurrentLocation from './LocationUser';

export class MapContainer extends Component {

    constructor(props) {
        super(props)
        let location = ""
        let user = "Me"
        if (this.props.location) {
            console.log('do something')
            location = this.props.location.location
            user = this.props.location.user
        } else {
            location = { lat: 3.4143397, lng: -76.53682194444444 }
            user = "Me"
        }
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            location: location,
            user: user
        }
    }

    /* Comprobación de props para cambiar el state */
    componentDidUpdate(prevProps) {
        /*Comprobación de las props */
        if (this.props.location) {
            /*Comprobacion de las props anteriores y actuales */
            if (this.props.location !== prevProps.location) {
                this.setState({ location: this.props.location.location })
                this.setState({ user: this.props.location.user })
            }
        }
    }

    render() {
        return (
            /* Inicio CurrentLocation */
            <CurrentLocation
                centerAroundCurrentLocation
                google={this.props.google}
                location={this.state.location}
                user={this.state.user}
            >
            </CurrentLocation>
            /* Fin CurrentLocation */
        );
    }
}

/*Key de la API de google */
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBnxvCl7rUeGz8ahhD3pjsjAwaq39xC3Vc'
})(MapContainer);