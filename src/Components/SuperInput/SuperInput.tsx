import React, {ButtonHTMLAttributes, ChangeEvent, MouseEvent, useState} from 'react';
import s from './SuperInput.module.css'

type SuperInputPropsType = {
    value: number
    error: boolean //to color Input while error
    name: string
    placeholder: string
    type: string
    inputOnChangeHandler: (value: number)=> void
    editModeActive:(value: number)=>void
}


export const SuperInput: React.FC<SuperInputPropsType> = (props) => {
    const {editModeActive,error, name, value, placeholder, type, inputOnChangeHandler,...otherProps} = props

    const onChangeCalls = (e: ChangeEvent<HTMLInputElement>) => {
        inputOnChangeHandler(e.currentTarget.valueAsNumber)
        editModeActive(e.currentTarget.valueAsNumber)
    }

    return (
        <input className={ error? `${s.defaultInput} ${s.errorInput}` : s.defaultInput}
               placeholder={placeholder}
               type={type}
               value={value}
               onChange={onChangeCalls}
        />
    )
}