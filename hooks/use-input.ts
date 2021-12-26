import React, {useReducer} from "react";

type Action = { type: 'CHANGE', value: string } | { type: 'BLUR' } | { type: 'RESET' };

type InputState = {
    value: string;
    isTouched: boolean;
}

const initialState: InputState = {
    value: '',
    isTouched: false
}

const inputReducer = (prevState: InputState, action: Action) => {
    if (action.type === 'CHANGE') {
        return {value: action.value, isTouched: prevState.isTouched}
    }
    if (action.type === 'BLUR') {
        return {value: prevState.value, isTouched: true}
    }
    return initialState;
}

const useInput = (validateFunc: (text: string) => boolean) => {

    const [inputState, dispatch] = useReducer(inputReducer, initialState, undefined);

    const inputIsValid = validateFunc(inputState.value);
    const inputInValid = !inputIsValid && inputState.isTouched;

    // handles in every key stroke
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'CHANGE',
            value: e.target.value
        })
    }

    // handle when lost focus
    const blurHandler = (_: any) => {
        dispatch({
            type: 'BLUR'
        })
    }

    // resetting while submitting
    const reset = () => {
        dispatch({
            type: 'RESET'
        })
    }

    return {
        value: inputState.value,
        hasError: inputInValid,
        isValid: inputIsValid,
        changeHandler,
        blurHandler,
        reset
    }
}

export default useInput;