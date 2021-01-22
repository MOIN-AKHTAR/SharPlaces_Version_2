import React,{useState,useContext} from 'react';
import Button from '../../Share/Components/FormElemets/Button';
import Card from '../../Share/Components/UiElements/Card';
import Model from '../../Share/Components/UiElements/Model';
import Loader from '../../Share/Components/UiElements/Loader';
import AuthContex from '../../Share/Context/AuthContex';
import useHttpHook from '../../Share/Hooks/httpHooks'
import style from './PlaceItem.module.css'
import ErrorModal from '../../Share/Components/UiElements/ErrorModel';

export default function PlaceItem(props) {
    const {loggedIn,userId,token}=useContext(AuthContex);
    const {isLoading,error,errorHandler,sendRequest}=useHttpHook()
    const [showMap,setShowMap]=useState(false);
    const [showConfirmModel,setConfirmModel]=useState(false);

    const openModel=()=>setShowMap(true);
    const closeModel=()=>setShowMap(false);
    const openConfirmModel=()=>setConfirmModel(true);
    const cancelConfirmModel=()=>setConfirmModel(false);

    const deletePlace=async ()=>{
           try {
               cancelConfirmModel();
               await sendRequest(`http://localhost:5000/api/v1/place/${props._id}`,"DELETE",null,{
                   Authorization:`Bearer ${token}`
               });
               props.onDeletePlace(props._id);
           } catch (error) {
               
           }
    } 

    if(isLoading) return <Loader />
    if(error)return <ErrorModal error={error}  onClear={errorHandler} />

    return (
       <React.Fragment>
           <Model 
           show={showMap}
           onCancel={closeModel}
           header={props.address}
           contentClass={style.place_item__modal_content}
           footerClass={style.place_item__modal_actions}
           footer={<Button onClick={closeModel}>Close</Button>}
           >
           <div className={style.map}>
               <h1>MAP HERE</h1>
           </div>
           </Model>
           <Model
           show={showConfirmModel}
           header="Are you sure?"
           onCancel={cancelConfirmModel}
           footerClass={style.place_item__modal_actions}
           footer={<React.Fragment>
               <Button onClick={cancelConfirmModel}>CANCEL</Button>
               <Button onClick={deletePlace}>DELETE</Button>
               </React.Fragment>}
           >
           <p>Are you sure you want to proceed with this action? This action will not be undo.</p>
           </Model>
            <li className={style.place_item} >
                    <Card className={style.place_item__content}>
                        <div className={style.place_item__image}>
                        <img src={`http://localhost:5000/${props.image}`} alt={props.title}/>
                        </div>
                        <div className={style.place_item__info}>
                            <h2>{props.title}</h2>
                            <h3>{props.address}</h3>
                            <p>{props.description}</p>
                        </div>
                        <div className={style.place_item__actions}>
                            <Button onClick={openModel}>VIEW</Button>
                            {loggedIn&&props.creator===userId&&<Button to={`/${props._id}/place`}>EDIT</Button>}
                            {loggedIn&&props.creator===userId&&<Button danger onClick={openConfirmModel}>DELETE</Button>}
                        </div>
                    </Card>
                </li>
       </React.Fragment>
    )
}
