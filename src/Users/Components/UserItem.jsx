import React from 'react';
import {Link} from 'react-router-dom';
import Avatar from '../../Share/Components/UiElements/Avatar';
import Card from '../../Share/Components/UiElements/Card'
import style from './UserItem.module.css'

export default function UserItem(props) {
    return (
        <li className={style.user_item}>
          <Card className={style.user_item__content}>
             <Link to={`/${props.id}/places`}>
                 <div className={style.user_item__image}>
                     <Avatar 
                      image={"http://localhost:5000/"+props.image}
                      alt={props.name}
                     />
                 </div>
                 <div className={style.user_item__info}>
                     <h2>{props.name}</h2>
                     <h3>{props.placeCount.length} {props.placeCount.length===1?"Places":"Places"}</h3>
                 </div>
             </Link>
            </Card>
        </li>
    )
}
