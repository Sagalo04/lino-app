import React from 'react';
import ReactDOM from 'react-dom';

const mapStyles = {
    map: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: '-100'
    }
};

export class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);

        const { lat, lng } = this.props.initialCenter;

        const { latitude, long } = this.props.location;
        this.latitude = latitude
        this.longitude = long
        this.state = {
            currentLocation: {
                lat: latitude,
                lng: long
            }
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;
        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
    }

    componentDidMount() {
        const apikey = "RqKj4UStDiwdpMnDcPC5hGzDGaCqchf_NVyU41ZiqWk"
        const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${apikey}&mode=retrieveAddresses&prox=${this.state.currentLocation.lat},${this.state.currentLocation.lng}`
        fetch(url)
            .then(res => res.json())
            .then((resJson) => {

                console.log(resJson.Response.View[0].Result[0].Location.Address.Label)

            })
            .catch((e) => {
                console.log('Error in getAddressFromCoordinates', e)
            })
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: this.latitude,
                            lng: this.longitude
                        }
                    });
                });
            }
        }
        this.loadMap();
    }

    loadMap() {
        if (this.props && this.props.google) {
            // checks if google is available
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;

            // reference to the actual DOM element
            const node = ReactDOM.findDOMNode(mapRef);

            let { zoom } = this.props;
            const { lat, lng } = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);

            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom + 2.5
                }
            );

            // maps.Map() is constructor that instantiates the map
            this.map = new maps.Map(node, mapConfig);
        }
    }

    renderChildren() {
        const { children } = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;

            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation

            });
        });
    }

    render() {
        const style = Object.assign({}, mapStyles.map);
        return (
            <div>
                <div style={style} ref="map">
                    Loading map...
            </div>
                {this.renderChildren()}
            </div>
        );
    }
}

CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
        lat: 4.42158,
        lng: -76.5205
    },
    centerAroundCurrentLocation: false,
    visible: true
};

export default CurrentLocation;