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
        width: 33,
        height: 21,
        padding: 2,
    },
    switchBase: {
        padding: 3.7,
        color: '#D7D0B7',
        '&$checked': {
             transform: 'translateX(13px)',
            color: '#D7D0B7',
            
            '& + $track': {
                opacity: 1,
                backgroundColor: '#47FFA7',
                borderColor: '#54BEDF',
            },
        },
    },
    thumb: {
        width: 14,
        height: 14,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid '#E9E9E9'`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: '#E9E9E9',
    },
    checked: {},
}))(Switch);

export default class ServiceIcon extends React.Component{

    constructor(props){
        super(props);
    }

    handleChange = (e)=>{
        this.props.handler(this.props.k,!this.props.checked)
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
                        
                        {GetServIcon(icon)}
                        <h5>{label}</h5>
                    </div>}
                    labelPlacement="top" />
            </FormGroup>
        </FormControl>
        );
    }
}
