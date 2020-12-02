import { FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './SignIn.css'
import OButton from '../OButton/OButton'
import { Link, useHistory } from 'react-router-dom';
import UserProfile from '../../UserProfile';

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
        marginBottom: '2rem'
    },
}));


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
        if(values.mail != ""){
            UserProfile.setMail(values.mail);

            if(values.mail.includes('@doctor')){
                UserProfile.setProvide(true)
            }else{
                UserProfile.setProvide(false)
            }
            console.log(UserProfile.getProvide())
            history.push(`/Home`);
        }
        
    };
    return (
        <div className="o-contain">
            <div className="o-contain-signin">
                <div className="o-signin">
                    <h2 className="o-title">Iniciar Sesión</h2>
                    <TextField
                        className={classes.textField}
                        id="input-with-icon-textfield"
                        label="Nombre de usuario"
                        required
                        value={values.mail}
                        onChange={handleChange2('mail')}
                    />
                    <FormControl className={clsx(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
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


                    <OButton label={"Ingresar"}
                        onClick={handleOnSubmit}
                    />


                    <p className="mb-5">¿Olvidaste tu contraseña?</p>
                </div>

                <p className="o-text">¿No tienes una cuenta? <Link to="/">Registrate acá</Link> </p>
            </div>
        </div>
    );
}

export default SignIn;