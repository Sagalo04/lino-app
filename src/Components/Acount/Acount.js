import { Avatar, fade, FormControl, InputBase, makeStyles, withStyles } from '@material-ui/core';
import React from 'react';
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
const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 0,
        position: 'relative',
        backgroundColor: '#F4F4F4',
        color: '#717171',
        fontWeight: '300',
        width: 'auto',
        padding: '6px 12px',
        height: '1rem',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);

const BootstrapInput2 = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 0,
        position: 'relative',
        backgroundColor: '#F4F4F4',
        color: '#717171',
        fontWeight: '300',
        width: '2rem',
        padding: '6px 12px',
        height: '1rem',
        marginRight: '1rem',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);

const BootstrapInput3 = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 0,
        position: 'relative',
        backgroundColor: '#F4F4F4',
        color: '#717171',
        fontWeight: '300',
        width: '7rem',
        padding: '6px 12px',
        height: '1rem',
        marginRight: '1rem',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);
function Acount(props) {
    const mail = UserProfile.getMail();
    const classes = useStyles();
    return (

        <div className="o-Acount">
            <div className="o-img-acount">
                <p style={{marginTop: '20rem'}}>
                    Bienvenido <label style={{fontWeight: 'bold'}}>Camilo</label> <br/>
                    Aquí podrás ver y modificar tu información
                </p>
            </div>
            {/* <img src={imagens} className="o-img-acount" alt="" /> */}
            <div className="o-contentAcount">
                <h3 className="o-personalTitle">Información personal</h3>
                <div className="o-contentPersonalAcount">
                    <div className="o-topAcount">
                        <div className="o-changeInfo">
                            <p className='o-labeled'>Nombre</p>
                            <FormControl className={classes.margin}>
                                <BootstrapInput defaultValue="Camilo" id="bootstrap-input" />
                            </FormControl>
                        </div>
                        <div className="o-changeInfo">
                            <p className='o-labeled'>Apellido</p>
                            <FormControl className={classes.margin}>
                                <BootstrapInput defaultValue="Sanchez" id="bootstrap-input" />
                            </FormControl>
                        </div>
                        <div className="o-changeInfo">
                            <p className='o-labeled'>Correo</p>
                            <FormControl className={classes.margin}>
                                <BootstrapInput disabled defaultValue={`${mail}`} id="bootstrap-input" />
                            </FormControl>
                        </div>
                        <div className="o-changeInfo">
                            <p className='o-labeled'>Edad</p>
                            <FormControl className={classes.margin}>
                                <BootstrapInput2 defaultValue="24" id="bootstrap-input" />
                            </FormControl>
                        </div>
                        <div className="o-changeInfo">
                            <p className='o-labeled'>Teléfono</p>
                            <FormControl className={classes.margin}>
                                <BootstrapInput2 defaultValue="+57" id="bootstrap-input2"  />
                            </FormControl>
                            <FormControl className={classes.margin}>
                                <BootstrapInput3 defaultValue="3042111518" id="bootstrap-input" />
                            </FormControl>
                        </div>
                        <div className="o-changeInfo">
                            <p className='o-labeled'>Idioma</p>
                            <FormControl className={classes.margin}>
                                <BootstrapInput defaultValue="Español" id="bootstrap-input" />
                            </FormControl>
                        </div>
                        <div className="o-changeInfo">
                            <p className='o-labeled'>Foto de perfil</p>
                            <div className="o-avatarChange">
                                <Avatar alt="name" src="" className={`${classes.large} o-change-logo`}></Avatar>
                                <p className="o-pchange">Cambiar</p>
                            </div>
                        </div>
                        <div className="o-changeButton">
                            <OButton label={"Guardar"}></OButton>

                        </div>

                    </div>
                </div>
                <div>
                    <h3 className="o-personalTitle">Reputación</h3>
                    <div className="o-reputation">
                        <i className='fas fa-star fa-2x iconProfile' size="2x"></i>
                        <i className='fas fa-star fa-2x iconProfile' size="2x"></i>
                        <i className='fas fa-star fa-2x iconProfile' size="2x"></i>
                        <i className='fas fa-star fa-2x iconProfile' size="2x"></i>
                        <i className='fas fa-star fa-2x iconProfile' size="2x"></i>
                    </div>
                    <div className="o-comments">
                        <p >Ver comentarios </p>
                        <i class="fas fa-chevron-right iconComments"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Acount;