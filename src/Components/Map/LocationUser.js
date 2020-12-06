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

        //const { lat, lng } = this.props.initialCenter;
        //cont gogle =  
        const { lat, lng } = this.props.location;
        const location = {
            lat: lat,
            lng: lng
        }
        var mark = new this.props.google.maps.Marker({
            position: location,
            title: "Hello World!"
        });
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            },
        };
    }
    componentDidUpdate(prevProps, prevState) {

        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }

        if (this.props.location.lat !== this.state.currentLocation.lat
            && this.props.location.lng !== this.state.currentLocation.lng) {
            //console.log(this.props.location)
            //console.log(this.state.currentLocation)
            this.setState({ currentLocation: this.props.location })
        }
        if (prevState.currentLocation != this.state.currentLocation) {
            
            this.recenterMap();
        }
    }

    recenterMap() {

        

        const map = this.map;
        const current = this.state.currentLocation;
        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            if(this.mark){
                this.mark.setMap(null)

            }
            console.log(this.state.markerts)
            var marker = new google.maps.Marker({
                position: this.state.currentLocation,
                title: "Hello World!"
            });
            this.mark = marker
            console.log(this.state.markerts)
            let center = new maps.LatLng(current.lat, current.lng);
            this.mark.setMap(map)
            map.panTo(center);
;
        }
    }

    componentDidMount() {

        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: this.props.location
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