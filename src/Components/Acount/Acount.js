import { Avatar, makeStyles } from '@material-ui/core';
import React from 'react';
import imagens from '../../Resources/Images/help.png'
import UserProfile from '../../UserProfile';
import OButton from '../OButton/OButton';
import './Acount.css'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginRight: '10rem'
    },
}));


function Acount(props) {
    const mail = UserProfile.getMail();
    const classes = useStyles();
    return (

        <div className="o-Acount">
            <img src={imagens} width="600rem" alt="" />
            <div className="o-contentAcount">
                <div className="o-contentTopAcount">
                    <Avatar alt="name" src="" className={classes.large}></Avatar>
                    <div className="o-topAcount">
                        <p>Camilo García</p>
                        <div className="o-reputation">
                            <p>Reputación 5.0</p>
                            <i className='fas fa-star AcountIcon' size="2x"></i>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="o-itemsAcount">
                        <p>País</p>
                        <p>Colombia</p>
                    </div>
                    <div className="o-itemsAcount">
                        <p>Correo asociado</p>
                        <p>{mail}</p>
                    </div>
                    <div className="o-itemsAcount">
                        <p>Edad</p>
                        <p>41</p>
                    </div>
                </div>
                <OButton label={"Editar"}></OButton>
            </div>
        </div>
    );
}

export default Acount;