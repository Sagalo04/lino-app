import React from 'react';
import './ServiceSelect.css';
//material ui components
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
//material ui styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    formControl: {
        minWidth: 170
    }
})

function ServiceSelect(props) {
    //state
    const [value, setValue] = React.useState('');
    //handleChange
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    //styles
    const classes = useStyles();

    return (
        <div>
            <div className="o-select">
                <p className='o-label'>{props.label}</p>
                <FormControl className={classes.formControl}>
                    <InputLabel id="simple-select-label">{props.initialValue}</InputLabel>
                    <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        value={value}
                        onChange={handleChange}
                    >
                        {props.options.map((option, index) => {
                            return <MenuItem value={index}>{option}</MenuItem>
                        })}
                        
                    </Select>
                </FormControl>
            </div>
            <hr />
        </div>

    );
}

export default ServiceSelect;