import React from 'react';
import './ServiceSelect.css';
//material ui components
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
//material ui styles
import { makeStyles } from '@material-ui/core/styles';



export default class ServiceSelect extends React.Component{
    constructor(props){
        super(props);
    }

    handleChange = (e)=>{
        this.props.handler(this.props.k, )
    }

    render(){
        
        const label = this.props.label;
        const title = this.props.title;
        const options = this.props.options;
        const value = this.props.value;
        return (
            <div>
                <div className="o-select">
                    <p className='o-label'>{label}</p>
                    <FormControl>
                        <InputLabel id="simple-select-label">{title}</InputLabel>
                        <Select
                            labelId="simple-select-label"
                            id="simple-select"
                            value={value}
                            onChange={this.handleChange}>

                            {options.map((option, index) => {
                                return <MenuItem value={index}>{option}</MenuItem>
                            })} 
                        </Select>
                    </FormControl>
                </div>
                <hr />
            </div>
    
        );
    }
}
