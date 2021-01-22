import React,{useContext} from 'react';
import Input from '../../Share/Components/FormElemets/input';
import Button from '../../Share/Components/FormElemets/Button';
import ErrorModel from '../../Share/Components/UiElements/ErrorModel';
import Loader from '../../Share/Components/UiElements/Loader';
import FileUpload from '../../Share/Components/FormElemets/FileUpload';
import {VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH} from '../../Share/Utils/Validators';
import useFormHook from '../../Share/Hooks/FormHook';
import useHttpHook from '../../Share/Hooks/httpHooks';
import AuthContext from '../../Share/Context/AuthContex';
import {useHistory} from 'react-router-dom';
import style from './NewPlace.module.css';

export default function NewPlace() {
  const {isLoading,error,sendRequest,errorHandler}=useHttpHook();
  const {userId,token}=useContext(AuthContext);
  const history=useHistory();
  const [formState,inputHandler]=useFormHook({
  image:{
    value: null,
    isValid: false
  },
  title: {
    value: '',
    isValid: false
  },
  description: {
    value: '',
    isValid: false
  },
address:{
    value:'',
    isValid:false
}},false)

      const handleSubmit=async (e)=>{
        try {
          e.preventDefault();
          const formData=new FormData();
          formData.append("title",formState.inputs.title.value);
          formData.append("description",formState.inputs.description.value);
          formData.append("address",formState.inputs.address.value);
          formData.append("image",formState.inputs.image.value);
          formData.append("creator",userId);

          await sendRequest("http://localhost:5000/api/v1/place/","POST",formData,{
            Authorization:`Bearer ${token}`
          });
          history.push(`/${userId}/places`);
        } catch (error) {}
    }


    return (
      <React.Fragment>
      <ErrorModel error={error} onClear={errorHandler}/>
      {isLoading&&<Loader />}
      <div className={style.place_form}>
            <div className="center">
            <h1>ADD A NEW PLACE</h1>
            </div>
            <FileUpload center id="image" onInput={inputHandler} />
            <Input 
            id="title"
            placeholder="Enter place title"
            element="input"
            type="text"
            label="Title"
            errorText="Please provide a valid title"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            />
            <Input 
            id="description"
            label="Description"
            errorText="Description must be atleast 5 characters long"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
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
            />
            <Button 
            type="submit"
            disabled={!formState.isValid}
            onClick={handleSubmit} 
             >ADD PLACE</Button>
        </div>
      </React.Fragment>
        
    )
}



