import React from 'react';
import ServiceConfirmHeader from './ServiceConfirmHeader/ServiceConfirmHeader';
import './ServiceConfirm.css'
import { Link } from 'react-router-dom';
import OButton from '../OButton/OButton';
//DocCard
import DocCard from './DocCard/DocCard';
import Map from '../Map/Map';

export default class Service extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},  //servicio hogar
        }
    }

    componentDidMount() {
        fetch("https://5fc6641b4931580016e3cf35.mockapi.io/doctores/1")
            .then((response) => response.json())
            .then((json) => {
                let jj = json;
                this.setState({ data: jj })
            })
            .catch((error) => console.error(error))
    }
    
    render() {
        console.log(this.state.data)
        return (
            <div className="o-body">
                <Map></Map>
                <div className="o-service">
                    <ServiceConfirmHeader title="¡Hemos encontrado tu servicio!" />
                    <div className="o-service-contain">
                        <DocCard
                            name={this.state.data.name}
                            info={this.state.data.specialty}
                            sourceImg={this.state.data.image}
                        />
                        <div className="o-service-info">
                            <p>Fecha:</p>
                            <p>29/09/2020</p>
                        </div>
                        <div className="o-service-info">
                            <p>Hora estimada de llegada:</p>
                            <p>9:00 AM</p>
                        </div>
                        <div className="o-service-info">
                            <p>Precio de consulta:</p>
                            <p>$35.000</p>

                        </div>
                        <hr />

                        <Link><OButton label={"Confirmar"}></OButton></Link>

                    </div>
                </div>
            </div>
        );
    }
}
