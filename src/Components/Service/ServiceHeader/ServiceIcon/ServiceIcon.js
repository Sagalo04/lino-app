import { FormControl, FormControlLabel, FormGroup } from '@material-ui/core';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import './ServiceIcon.css'

const icons = {
    Home: "fas fa-home fa-2x o-icon",
    Remote: "fas fa-wifi fa-2x o-icon",
}

function GetServIcon(iconState) {
    let icon = icons[iconState] ? icons[iconState] : "fas fa-home fa-2x o-icon";
    return <i className={icon} size="2x"></i>
}

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
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

export default class ServiceIcon extends React.Component{

    constructor(props){
        super(props);
    }

    handleChange = (e)=>{
        this.props.onHomeChange(!this.props.checked)
    }

    render(){
        const icon = this.props.icon
        const label = this.props.label
        const checked = this.props.checked
        return(
            <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    value="top"
                    control={<AntSwitch checked={checked} onChange={this.handleChange} name="checked" />}
                    label={<div>
                        <h5>{label}</h5>
                        {GetServIcon(icon)}
                    </div>}
                    labelPlacement="top" />
            </FormGroup>
        </FormControl>
        );
    }
}
/*
function ServiceIcon({icon, label, checked, dataHandler}) {

    const [state, setState] = React.useState({
        checked: checked,
    })

    const handleChange = (event) => {
        //setState({ ...state, [event.target.name]: event.target.checked });
        
    }

    return (
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    value="top"
                    control={<AntSwitch checked={state.checked} onChange={handleChange} name="checked" />}
                    label={<div>
                        <h5>{label}</h5>
                        {GetServIcon(icon)}
                    </div>}
                    labelPlacement="top" />
            </FormGroup>
        </FormControl>
    );
}

export default ServiceIcon;*/