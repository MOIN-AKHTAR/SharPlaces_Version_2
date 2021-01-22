import React from 'react';
import style from './BackDrop.module.css'

export default function BackDrop(props) {
    return (
        <div className={style.backdrop}
        onClick={props.onClick}
         />
    )
}
