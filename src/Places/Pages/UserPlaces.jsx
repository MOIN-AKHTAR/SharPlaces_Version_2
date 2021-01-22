import React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom'
import PlaceList from '../Components/PlaceList';
import useHttpHook from '../../Share/Hooks/httpHooks';
import Loader from '../../Share/Components/UiElements/Loader';
import ErrorModel from '../../Share/Components/UiElements/ErrorModel';

export default function Place() {
    const userId=useParams().uid;
    const [places,setPlaces]=useState([]);
    const {isLoading,error,sendRequest,errorHandler}=useHttpHook();

    useEffect(() => {
        (async ()=>{
           try {
            const placesData=await sendRequest(`http://localhost:5000/api/v1/place/user/${userId}`);
            setPlaces(placesData.places);
           } catch (error) {}
        })()
    }, [sendRequest,userId]);

    const onDeletePlace=(id)=>setPlaces(prevPlace=>prevPlace.filter(place=>place._id!==id))

    return (
        <React.Fragment>
            <ErrorModel error={error} onClear={errorHandler} />
            {isLoading&&<Loader />}
           {!isLoading&&places&&<PlaceList
            places={places}
            onDeletePlace={onDeletePlace}
        />}
        </React.Fragment>
        
    )
}
