import React,{useEffect, useState,useContext} from 'react';
import {VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH} from '../../Share/Utils/Validators'
import {useParams,useHistory} from 'react-router-dom'
import Input from '../../Share/Components/FormElemets/input';
import Button from '../../Share/Components/FormElemets/Button';
import Card from '../../Share/Components/UiElements/Card';
import useFormHook from '../../Share/Hooks/FormHook';
import useHttpHook from '../../Share/Hooks/httpHooks'
import Loader from '../../Share/Components/UiElements/Loader';
import ErrorModal from '../../Share/Components/UiElements/ErrorModel';
import AuthContext from '../../Share/Context/AuthContex'
import style from './NewPlace.module.css';


export default function UpdatePlace() {
  const placeId=useParams().pid;
  const history=useHistory();
  const {userId,token}=useContext(AuthContext)
  const {isLoading,error,errorHandler,sendRequest}=useHttpHook();
  const [place,setPlace]=useState(null);
  const [formState,inputHandler,setFormData]=useFormHook(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
    address:{
        value:"",
        isValid:false
    }},false
  )

     useEffect(() => {
      (async ()=>{
        const placeData=await sendRequest(`http://localhost:5000/api/v1/place/${placeId}`);
        setFormData({
          title: {
            value: placeData.title,
            isValid: true
          },
          description: {
            value: placeData.description,
            isValid: true
          },
        address:{
            value:placeData.address,
            isValid:true
        }},true);
        setPlace(placeData);
      })()
     }, []);


      const handleSubmit=async (e)=>{
          e.preventDefault();
          try {
            await sendRequest(`http://localhost:5000/api/v1/place/${placeId}`,"PUT",
            JSON.stringify({
              title:formState.inputs.title.value,
              description:formState.inputs.description.value,
              address:formState.inputs.address.value
            }),
            {
              "Content-Type":"application/json",
              Authorization:`Bearer ${token}`
            });
            history.replace(`/${userId}/places`)
          } catch (error) {}
      }

      if(error){
        return <ErrorModal error={error} onClear={errorHandler} />
      }

    if(!place && !isLoading) return (<div className="center">
      <Card>
        <h1>No Place Found :(</h1>
      </Card>
    </div>)

    if(isLoading){
      return (<div className="center">
      <Loader/>
    </div>)
    } 

    return (
      <React.Fragment>
      { !isLoading&&place&&<div className={style.place_form}>
            <div className="center">
                <h1>EDIT PLACE</h1>
            </div>
            <Input 
            id="title"
            placeholder="Enter place title"
            element="input"
            type="text"
            label="Title"
            errorText="Please provide a valid title"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            value={formState.inputs.title.value}
            isValid={true}
            />
            <Input 
            id="description"
            label="Description"
            errorText="Description must be atleast 5 characters long"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            value={formState.inputs.description.value}
            isValid={true}
            />
            <Input 
            id="address"
            label="Address"
            element="input"
            type="text"
            placeholder="Place address"
            errorText="Please provide valid address"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            value={formState.inputs.address.value}
            isValid={true}
            />
            <Button type="submit" 
            disabled={!formState.isValid}
            onClick={handleSubmit}
            >UPDATE PLACE</Button>
        </div>}
      </React.Fragment>
       
    )
}
