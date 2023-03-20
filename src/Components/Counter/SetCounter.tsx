import React, {ButtonHTMLAttributes, ChangeEvent, useState} from 'react';
import s from './Counter.module.css'
import {SuperButton} from '../SuperButton/SuperButton';
import {SuperInput} from '../SuperInput/SuperInput';


type CounterPropsType = {
    error: boolean
    maxValue: number
    startValue: number
    count: number
    setCounter: (name: string) => void
    disableButton: (name: string) => boolean
    disable: boolean
    setDisable: (value: boolean) => void
    onChangeMaxHandler: (newValue: number) => void
    onChangeMinHandler: (newValue: number) => void
    editModeActive:(newValue: number) => void
}

export const SetCounter: React.FC<CounterPropsType> = (props) => {
    const {
        error,
        disable,
        setDisable,
        count,
        maxValue,
        startValue,
        setCounter,
        onChangeMaxHandler,
        onChangeMinHandler,
        disableButton,
        editModeActive,
        ...otherProps
    } = props

    const onChangeMaxInput = (newValue: number) => {
        onChangeMaxHandler(newValue)
    }
    const onChangeMinInput = (newValue: number) => {
        onChangeMinHandler(newValue)
    }
    const onClickHandler = () => {
        setCounter('Set')
    }

    return (
        <div className={s.wrapper}>
            <div className={s.inputWrapper}>
                <div className={s.setItemWrapper}>
                    <span className={s.setItemTitle}>Max:</span>
                    <SuperInput
                        error={error}
                        value={maxValue}
                        name="max"
                        placeholder="Enter Number"
                        type="number"
                        inputOnChangeHandler={onChangeMaxInput}
                        editModeActive={editModeActive}
                    />
                </div>
                <div className={s.setItemWrapper}>
                    <span className={s.setItemTitle}>Min:</span>
                    <SuperInput
                        error={error}
                        value={startValue}
                        name="min"
                        placeholder="Enter Number"
                        type="number"
                        inputOnChangeHandler={onChangeMinInput}
                        editModeActive={editModeActive}
                    />
                </div>
            </div>
            <SuperButton name="Set"
                         callBack={onClickHandler}
                         callBackDisable={() => disable}
            ></SuperButton>
        </div>
    )
}
