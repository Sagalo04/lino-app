import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './LocationUser';

export class MapContainer extends Component {

    constructor(props) {
        super(props)
        let location = ""
        if (this.props.location) {
            console.log('do something')
            location = this.props.location.location
        } else {
            location = { lat: 3.4143397, lng: -76.53682194444444 }
        }

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            location: location
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.location) {
            if (this.props.location !== prevProps.location) {
                this.setState({ location: this.props.location.location })
            }
        }

    }

    
    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };


    render() {
        //console.log(this.state.location)
        return (
            <CurrentLocation
                centerAroundCurrentLocation
                google={this.props.google}
                location={this.state.location}
            //location={{lat:3.4143397,lng:-76.53682194444444}}
            >
                {/* <Marker onClick={this.onMarkerClick} name={'Current Location'} position={this.state.location} />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow> */}
            </CurrentLocation>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBnxvCl7rUeGz8ahhD3pjsjAwaq39xC3Vc'
})(MapContainer);