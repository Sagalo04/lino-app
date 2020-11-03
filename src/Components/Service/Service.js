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
            <div className="o-select">
                <p className='o-label'>Deseo un: </p>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Médico/Psicologo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange2}
                    >
                        <MenuItem value={1}>Médico</MenuItem>
                        <MenuItem value={2}>Psicólogo</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <hr />

            <div className="o-select">
                <p className='o-label'>Especialidad: </p>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Especialidad</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange2}
                    >
                        <MenuItem value={1}>Cardiologia</MenuItem>
                        <MenuItem value={2}>General</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <hr />
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
            <Link to="/Servicio">
                <OButton label={"Aceptar"}></OButton>
            </Link>
        </div>
    );
}

export default Service;