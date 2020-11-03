import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import './Service.css'
import {
    KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import ServiceHeader from './ServiceHeader/ServiceHeader';
import OButton from '../OButton/OButton'
import { Link } from 'react-router-dom';
//service Select
import ServiceSelect from './ServiceSelect/ServiceSelect';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 170,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function Service(props) {

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const classes = useStyles();


    const [age, setAge] = React.useState('');

    const handleChange2 = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className="o-service">
            <ServiceHeader />
            {/*Seleccionar Medico/Psicologo*/}
            <ServiceSelect label={"Deseo un:"} initialValue={"Médico/Psicólogo"} options={["Médico","Psicólogo"]}/>
            
            {/*Seleccionar especialidad*/}
            <ServiceSelect label={"Especialidad:"} initialValue={"General"} options={["General","Cardiólogo"]}/>
            {/*Seleccionar fecha*/}
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
            <hr />
            {/*Boton para confimar servicio*/}
            <Link to="/Servicio">
                <OButton label={"Aceptar"}></OButton>
            </Link>
        </div>
    );
}

export default Service;