import React from 'react';
import style from './Loader.module.css';

export default function Loader() {
    return (
        <div className={style.overLay}>
        <div className={style.lds_ring}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        </div>
    )
}
