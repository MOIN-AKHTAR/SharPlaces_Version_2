import React from 'react';
import UserItem from './UserItem';
import Card from '../../Share/Components/UiElements/Card'
import  style from './UserList.module.css';

export default function UserList(props) {
    if(props.users.length===0){
        return <div className="place-list center"><Card>
            <h2>No User Found</h2>
        </Card></div>
    }else{
        return (
            <ul className={style.users_list}>
                {
                    props.users.map(user=>(
                        <UserItem 
                        key={user._id}
                        id={user._id}
                        image={user.image}
                        name={user.name}
                        placeCount={user.places}
                        />
                    ))
                }
            </ul>
        )
    }
    
}
