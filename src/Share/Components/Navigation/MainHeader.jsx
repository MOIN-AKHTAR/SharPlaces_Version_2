import React from 'react';
import style from './MainHeader.module.css'

export default function MainHeader(props) {
    return (
        <header className={style.main_header}>
            {props.children}
        </header>
    )
}
