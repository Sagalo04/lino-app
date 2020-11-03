import React from 'react';
import ServiceIcon from './ServiceIcon/ServiceIcon';
import './ServiceHeader.css'

function ServiceHeader(props) {

    return (
        <div className="o-service-header">
            <h3>¿Que servicio deseas?</h3>
            <div className="o-service-icons">
                <ServiceIcon label={"Hogar"} icon={"Home"}></ServiceIcon>
                <ServiceIcon label={"Remoto"} icon={"Remote"}></ServiceIcon>
                {/* <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            value="top"
                            control={<AntSwitch checked={state.checkedB} onChange={handleChange} name="checkedB" />}
                            label={
                                <div>
                                    <h5>Remoto</h5>
                                    <i className="fas fa-wifi fa-2x o-icon"></i>
                                </div>
                            }
                            labelPlacement="top" />
                    </FormGroup>
                </FormControl> */}
            </div>
        </div>
    );
}

export default ServiceHeader;