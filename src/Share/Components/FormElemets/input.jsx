import React,{useReducer,useEffect} from 'react';
import {validate} from '../../Utils/Validators';
import style from './input.module.css';


const inputReducer=(state,action)=>{
    switch (action.type) {
        case "CHANGE":
             return {
              ...state,
              value:action.val,
              isValid:validate(action.val,action.validators),
              isTouched:true
             }
        default:
           return state;
    }
}

export default function Input(props) {
    const [inputs,dispatch]=useReducer(inputReducer,{
        value:props.value || "",
        isValid:props.isValid || false,
        isTouched:false
    });


    const {id,onInput}=props;
    const {value,isValid}=inputs;

    useEffect(() => {
        onInput(id, value, isValid)
      }, [id, value, isValid, onInput]);

    const changeInput=(e)=>{
        dispatch({
            type:"CHANGE",
            val:e.target.value,
            validators:props.validators
        })
    }

    const element=props.element==="input"?<input id={props.label} 
    placeholder={props.placeholder} 
    type={props.type}
    onChange={changeInput}
    value={inputs.value}
    />:<textarea
    id={props.label}
    rows={props.rows || 3}
    onChange={changeInput}
    value={inputs.value}
     />
     
    return (
        <div className={`${style.form_control} ${!inputs.isValid&&inputs.isTouched&&style.form_control__invalid}` }>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputs.isValid&&inputs.isTouched&&<p>{props.errorText}</p>}
        </div>
    )
}
