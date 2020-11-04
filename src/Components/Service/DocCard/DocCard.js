import React from 'react';
import { Avatar } from '@material-ui/core';
import './DocCard.css'

function DocCard({name, info, sourceImg}){
    return (
        <div className="o-DocCard-body">
            <Avatar alt="name" src={sourceImg}></Avatar>
            <p className="o-name">{name}</p>
            <p>{info}</p>
        </div>
    );
}

export default DocCard;