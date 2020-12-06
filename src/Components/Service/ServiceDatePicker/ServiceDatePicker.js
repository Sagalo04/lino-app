import React from 'react';
import './ServiceDatePicker.css'
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';

export default class ServiceDatePicker extends React.Component{
    constructor(props){
        super(props);
    }

    handleDateChange = (e) => {
        this.props.handler(this.props.k, e)
    };

    render(){
        const value = this.props.value;
        return (
            <div>
                <div className="o-select">
                    <p className='o-label'>Para el dia: </p>
                    <MuiPickersUtilsProvider className="o-mui" utils={DateFnsUtils} >
                        <KeyboardDatePicker
                            className="mydatepicker"
                            clearable
                            format="dd/MM/yyyy"
                            width='20'
                            // label="Día de la cita"
                            onChange={this.handleDateChange}
                            value={value}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <hr />
            </div>
    
        );
    }
}
