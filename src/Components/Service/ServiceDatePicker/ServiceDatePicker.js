import React from 'react';
import './ServiceDatePicker.css'
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function ServiceDatePicker(props) {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="o-select">
            <p className='o-label'>Para el dia: </p>
            <MuiPickersUtilsProvider className="o-mui" utils={DateFnsUtils} >
                <KeyboardDatePicker
                    className="mydatepicker"
                    clearable
                    format="dd/MM/yyyy"
                    width='20'
                    label="Día de la cita"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default ServiceDatePicker;