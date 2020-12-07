import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './CurrentoLocation';

export class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
    }

    handleChange = (k, value) => {
        this.setState({ [k]: value });
    }

    onMarkerClick = (props, marker, e) => {
        console.log(props.mapCenter.lat)
       
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

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
            <CurrentLocation
                centerAroundCurrentLocation
                google={this.props.google}
                handler = {this.props.handler}
                k={this.props.k}
            >
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
            </CurrentLocation>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBnxvCl7rUeGz8ahhD3pjsjAwaq39xC3Vc'
})(MapContainer);