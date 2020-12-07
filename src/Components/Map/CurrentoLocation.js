import React from 'react';
import ReactDOM from 'react-dom';

/* Estilos del mapa*/
const mapStyles = {
    map: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: '-100'
    }
};

/* Clase CurrentLocation */
export class CurrentLocation extends React.Component {
    constructor(props) {
        super(props);
        /* latitud y longitud que recibe por geolocalización */
        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            }
        };
    }

    /*Comprueba si la locacion actual cambia */
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
        
    }

    /* Función para centrar el mapa */
    recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;
        const google = this.props.google;
        const maps = google.maps;
        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
        this.props.handler(this.props.k, this.state.currentLocation)
    }

    /*Toma la locación actual*/
    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    });
                });
            }
        }
        this.loadMap();
    }

    /*Función para cargar el map */
    loadMap() {
        if (this.props && this.props.google) {
            /*Verifica si google esta disponible */
            const { google } = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            /*Referencia el actual DOM element */
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
            /*maps.Maps() es el constructor que inicializa el mapa */
            this.map = new maps.Map(node, mapConfig);
        }
        
    }

    /* Función que retorna el mapa */
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

/* Props por defecto */
CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
        lat: 3.42158,
        lng: -76.5205
    },
    centerAroundCurrentLocation: false,
    visible: true
};

export default CurrentLocation;