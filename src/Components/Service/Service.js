import React from 'react';
import Switch from '@material-ui/core/Switch';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select } from '@material-ui/core';

import './Service.css'
import {
    KeyboardDatePicker, MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 170,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        // display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.common.white,
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: '#54BEDF',
                borderColor: '#54BEDF',
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: '#959595',
    },
    checked: {},
}))(Switch);

function Service(props) {

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    })
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const [age, setAge] = React.useState('');

    const handleChange2 = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className="o-service">
            <div className="o-service-header">
                <h3>¿Que servicio deseas?</h3>
                <div className="o-service-icons">
                    <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                value="top"
                                control={<AntSwitch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                                label={<div>
                                    <h5>Hogar</h5>
                                    <i className="fas fa-home fa-2x o-icon"></i>
                                </div>}
                                labelPlacement="top" />
                        </FormGroup>
                    </FormControl>

                    <FormControl component="fieldset">
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
                    </FormControl>
                    {/* <Switch
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    /> */}
                </div>
            </div>
            <div className="o-select">
                <p>Deseo un: </p>
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
                <p>Especialidad: </p>
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
                <p>Para el dia: </p>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <KeyboardDatePicker
                        className="mydatepicker"
                        clearable
                        format="dd/MM/yyyy"
                        // margin="normal"
                        width='20'
                        label="Día de la cita"
                        value={selectedDate}
                        onChange={handleDateChange}
                    // KeyboardButtonProps={{
                    //     'aria-label': 'change date',
                    // }}
                    />
                </MuiPickersUtilsProvider>
            </div>

            <hr />

            <button className="o-button">Aceptar</button>
        </div>
    );
}

export default Service;