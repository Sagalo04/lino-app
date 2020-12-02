import { fade, makeStyles, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import OButton from '../OButton/OButton';
import './Help.css'
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
        backgroundColor: 'white'
    },
    textField: {
        //width: '20rem',
        marginBottom: '2rem',

    },
}));
const useStylesReddit = makeStyles((theme) => ({
    root: {
        minWidth: '15rem',
        width: '30rem',
        height: '3.2rem',
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#fcfcfb',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        marginLeft: '-0.5rem',
        '&:hover': {
            backgroundColor: '#fff',
        },
        '&$focused': {
            backgroundColor: '#fff',
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
    focused: {},
}));

function RedditTextField(props) {
    const classes = useStylesReddit();

    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}
function Help(props) {
    const classes = useStyles();
    return (
        <div className="o-help">
            <div className="o-content-help">
                <h1 className="o-helpTitle">¿Problemas? <br /> Queremos ayudarte</h1>
                <div className="o-helpinput">
                    <RedditTextField
                        label="Escribe tu problema"
                        className={classes.margin + " o-input-form"}
                        defaultValue=""
                        variant="filled"
                        id="reddit-input"
                    />
                    <OButton label={"Buscar"}></OButton>
                </div>
            </div>
            <div className="o-helpDefine">
                <div className="o-help-option">
                    <p >Reporta un problema</p>
                    <i class="fas fa-chevron-right helpicon"></i>
                </div>
                <div className="o-help-option">
                    <p >Emergencia</p>
                    <i class="fas fa-chevron-right helpicon"></i>
                </div>
                <div className="o-help-option">
                    <p >Opciones de pago</p>
                    <i class="fas fa-chevron-right helpicon"></i>
                </div>
                <div className="o-help-option">
                    <p >Desembolsos </p>
                    <i class="fas fa-chevron-right helpicon"></i>
                </div>
            </div>
        </div>
    );
}

export default Help;
