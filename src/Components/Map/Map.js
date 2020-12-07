import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './CurrentoLocation';

/* Clase MapContainer */
export class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
    }

    /* Función al clickear un marcador */
    onMarkerClick = (props, marker, e) => {
        console.log(props.mapCenter.lat)
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    /* Función al cerrar el infowindow */
    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };


    render() {
        return (
            /* Inicio CurrentLocation */
            <CurrentLocation
                centerAroundCurrentLocation
                google={this.props.google}
                handler = {this.props.handler}
                k={this.props.k}
            >
                {/* Inicio Marcador e informacion del marcador*/}
                <Marker onClick={this.onMarkerClick} name={'Ubicación actual'} />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
                {/* Fin Marcador e informacion del marcador*/}
            </CurrentLocation>
            /* Fin CurrentLocation */
        );
    }
}

 /* Key de la API de google */
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBnxvCl7rUeGz8ahhD3pjsjAwaq39xC3Vc'
})(MapContainer);