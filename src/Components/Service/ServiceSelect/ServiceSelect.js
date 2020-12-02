import React from 'react';
import './ServiceSelect.css';
//material ui components
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';




export default class ServiceSelect extends React.Component{
    constructor(props){
        super(props);
    }

    handleChange = (e)=>{
        this.props.handler(this.props.k, e.target.value)
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
                        <InputLabel  className="o-title" id="simple-select-label">{title}</InputLabel>
                        <Select
                         className="o-selector"
                            labelId="simple-select-label"
                            id="simple-select"
                            value={value}
                            onChange={this.handleChange}>
                            {/*Options*/}    
                            {options.map((option, index) => {
                                return <MenuItem value={index} key={index}>{option}</MenuItem>
                            })} 
                        </Select>
                    </FormControl>
                </div>
                <hr />
            </div>
    
        );
    }
}
