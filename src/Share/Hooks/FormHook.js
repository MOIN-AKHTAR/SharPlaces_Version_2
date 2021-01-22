import {useReducer,useCallback} from 'react';

const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
      case "SET_DATA":
        return {
          inputs:action.formData,
          isValid:action.formValidation
        }
      default:
        return state;
    }
  };


export default function useFormHook(initialFormState,initialFormValidation) {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs:initialFormState,
        isValid: initialFormValidation
      });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
          type: 'INPUT_CHANGE',
          value: value,
          isValid: isValid,
          inputId: id
        });
      }, []);

    const setFormData=useCallback(
      (initialFormData,initalFormValidation) => {
        dispatch({
          type:"SET_DATA",
          formData:initialFormData,
          formValidation:initalFormValidation
        })
      },
      [],
    )


      return [formState,inputHandler,setFormData];
}
