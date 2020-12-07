import React from 'react';
import './Timer.css'

const Timer = ()=>{
    return(
        <div>
            {new Date().toLocaleTimeString()}
        </div>
    )
}

export default Timer;