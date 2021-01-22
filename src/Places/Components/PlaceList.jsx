import React from 'react';
import Button from '../../Share/Components/FormElemets/Button';
import Card from '../../Share/Components/UiElements/Card';
import PlaceItem from './PlaceItem';
import style from './PlaceList.module.css'

export default function PlaceList(props) {
    if(props.places.length===0){
        return (
            <div className="place-list center">
                 <Card>
                     <h2>No Place Found.May Be Create One?</h2>
                     <Button to="/new/place">Share Places</Button>
                 </Card>
            </div>
           
        )
    }
     return (
         <ul className={style.place_list}>
            {
              props.places.map(place=>(
            <PlaceItem 
                key={place._id}
                {...place}
                onDeletePlace={props.onDeletePlace}
                />))
            }
         </ul>
     )
    
}
