import { fade, FormControl, InputBase, makeStyles, withStyles } from '@material-ui/core';
import React from 'react';
import OButton from '../../OButton/OButton';
import './Chat.css'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 0,
        position: 'relative',
        backgroundColor: '#EEEEEE',
        color: '#111111',
        fontWeight: '300',
        width: '20rem',
        padding: '6px 12px',
        height: '1.8rem',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);

function Chat({other}) {
    const classes = useStyles();
    return (
        <div className="o-chat">
            <div className="o-chatHeader">
                <div className="o-chatHeader">
                    <p className="o-chatHeaderText">Chat: </p>
                    <p className="o-chatPerson">{other}</p>
                </div>
                <OButton label={"Abandonar"}></OButton>
            </div>
            <div className="o-chatContent">
                <div className="o-recive">
                    <p className="o-chatName">
                        Lesly Lucumi
                    </p>
                    <p className="o-chatMsg">
                        xD
                    </p>
                    <p className="o-chatHr">
                        2:44 pm
                    </p>
                </div>
                <div className="o-send">
                    <p className="o-chatName">
                        Yo
                    </p>
                    <p className="o-chatMsg">
                        Hola
                    </p>
                    <p className="o-chatHr">
                        2:44 pm
                    </p>
                </div>
            </div>
            <div className="o-chatFooter">
                <FormControl className={classes.margin}>
                    <BootstrapInput placeholder="Escribe aquí" id="bootstrap-input" />
                </FormControl>
                <OButton label={"Enviar"}></OButton>
            </div>
        </div>
    );
}

export default Chat;