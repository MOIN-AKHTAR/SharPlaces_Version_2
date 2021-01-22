import React from 'react';
import style from './Avatar.module.css'

export default function Avatar(props) {
    return (
        <div className={`${style.avatar} ${props.customStyle}`} style={props.style}>
            <img src={props.image} alt={props.alt} style={{width:props.width,height:props.width}}/>
        </div>
    )
}
