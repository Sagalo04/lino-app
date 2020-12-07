import React, {useState, useEffect} from 'react';
import './Timer.css'

const Timer = ()=>{
    const [time, setTime] = useState({s:0, m:0, h:0});

    //on mount
    useEffect(_=>{
        run();
        setInterval(run, 1000);
    }, [])
    
    var updatedM = time.m, updatedS = time.s, updatedH = time.h

    const run = ()=>{
        if(updatedM === 60){
            updatedH ++;
            updatedM = 0;
        }
        if(updatedS === 60){
            updatedM ++;
            updatedS = 0;
        }
        updatedS++;
        setTime({s: updatedS, m: updatedM, h:updatedH});
    }

    return(
        <div className="o-time-counter">
            {`${time.h < 10? `0${time.h}`: time.h}
            :${time.m < 10? `0${time.m}`: time.m}
            :${time.s < 10? `0${time.s}`: time.s}`}
        </div>
    )
}


export default Timer;