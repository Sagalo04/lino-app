import { FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import clsx from 'clsx';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './SignIn.css'
import OButton from '../OButton/OButton'
import { Link, useHistory } from 'react-router-dom';
import UserProfile from '../../UserProfile';

// estilos
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '20rem',
        marginBottom: '2rem',
        textAlign: 'center',
    },
}));

// funcion para la verificaicon de inicio de seiosn
function SignIn(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        mail: '',
    });
    const [error, setError] = useState();

    const history = useHistory()

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleChange2 = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleOnSubmit = () => {
        if (values.mail !== "" && values.password !== "") {
            setError(false);
            UserProfile.setMail(values.mail);

            if (values.mail.includes('@doctor')) {
                UserProfile.setProvide(true)
            } else {
                UserProfile.setProvide(false)
            }
            history.push(`/Home`);
        }else{
            setError(true);
        }

    };
    return (
        // contenedor mayor
        <div className="o-contain">
            <div className="o-contain-signin">
                <div className="o-signin">
                    {/* titulo */}
                    <h2 className="o-title">Iniciar Sesión</h2>
                    {/* textfield para el usuario */}
                    <TextField
                        className={classes.textField}
                        id="input-with-icon-textfield"
                        label="Correo"
                        value={values.mail}
                        onChange={handleChange2('mail')}
                    />
                    {/* panel para la contraseña */}
                    <FormControl className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                        {/* input de texto */}
                        <Input
                            required
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {/* mensaje de error en caso de que haya */}
                    {error ? <div className="o-error-message-service">
                            <p>Debes completar los campos de correo y contraseña<br /> Inténtalo de nuevo</p>
                        </div>
                            : null}
                            {/* boton */}
                    <OButton label={"Ingresar"}
                        onClick={handleOnSubmit}
                    />

                    {/* panel con los textos de abajo para registro y olvido de contraseña */}
                    <p className="mb-3">¿Olvidaste tu contraseña?</p>
                    <p className="o-text">¿No tienes una cuenta? <Link className="o-linkLogin" to="/">Registrate aquí</Link> </p>
                </div>

            </div>
        </div>
    );
}

export default SignIn;