import React, { useState,useContext } from 'react';
import AuthContext from '../../Share/Context/AuthContex'
import Card from '../../Share/Components/UiElements/Card'
import Input from '../../Share/Components/FormElemets/input';
import Button from '../../Share/Components/FormElemets/Button';
import FileUpload from '../../Share/Components/FormElemets/FileUpload'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../Share/Utils/Validators';
import useForm from '../../Share/Hooks/FormHook';
import Loader from '../../Share/Components/UiElements/Loader';
import ErrorModel from '../../Share/Components/UiElements/ErrorModel';
import useHttpHook from '../../Share/Hooks/httpHooks';
import style from './Auth.module.css'

const Auth = () => {
  const {login}=useContext(AuthContext);
  const {isLoading,error,sendRequest,errorHandler}=useHttpHook();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image:null
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image:{
            value:null,
            isValid:false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();
    try {
      if(isLoginMode){
        const userData=await sendRequest("http://localhost:5000/api/v1/user/login","POST",JSON.stringify({
          email:formState.inputs.email.value,
          password:formState.inputs.password.value
        }),{
          "Content-Type":"application/json"
        });
        login(userData.userId,userData.token);
      }else{
        const formData=new FormData();
        formData.append("name",formState.inputs.name.value);
        formData.append("email",formState.inputs.email.value);
        formData.append("password",formState.inputs.password.value);
        formData.append("image",formState.inputs.image.value)
        const userData=await sendRequest("http://localhost:5000/api/v1/user/signup","POST",formData);
        login(userData.userId,userData.token);
      }
    } catch (error) {}
  };

  return (
    <React.Fragment>
     <ErrorModel error={error} onClear={errorHandler}/>
    <Card className={style.authentication}>
      {isLoading&&<Loader />}
      <h2>{isLoginMode?"Login":"SignUp"} Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        {!isLoginMode&&<FileUpload center onInput={inputHandler} id="image"/>}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
    </React.Fragment>
  );
};

export default Auth;
