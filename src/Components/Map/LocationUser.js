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
        /* Recibe el nombre del usuario*/
        this.user = this.props.user
        /* latitud y longitud que recibe por el usuario */
        const { lat, lng } = this.props.location;
        const location = {
            lat: lat,
            lng: lng
        }
        /* Marcador de la localizacion */
        this.mark = new this.props.google.maps.Marker({
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

    /*Comprueba cambios de props y state */
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }

        /* Comprueba localización y usuario y los actualiza*/
        if (this.props.location.lat !== this.state.currentLocation.lat
            || this.props.location.lng !== this.state.currentLocation.lng || prevProps.user !== this.props.user) {
            this.setState({ currentLocation: this.props.location })
            this.user = this.props.user
        }

        /* Si la localización cambia centra el mapa */
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
            if (this.mark) {
                /* Borra los marcadores en el mapa */
                this.mark.setMap(null)
            }
            /*crea nuevo marcador */
            var marker = new google.maps.Marker({
                position: this.state.currentLocation,
                animation: google.maps.Animation.DROP,
                title: "Hello World!"
            });
            const contentString =
                `<h2> ${this.user} <h2>`;
            const infowindow = new google.maps.InfoWindow({
                content: contentString,
            });
            marker.addListener("click", () => {
                infowindow.open(map, marker);
            });
            this.mark = marker
            let center = new maps.LatLng(current.lat, current.lng);
            this.mark.setMap(map)
            map.panTo(center);
        }
    }

    /*Toma la locación actual */
    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    this.setState({
                        currentLocation: this.props.location
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
                    zoom: zoom + 2,
                    disableDefaultUI: true,
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
        lat: 4.42158,
        lng: -76.5205
    },
    centerAroundCurrentLocation: false,
    visible: true
};

export default CurrentLocation;