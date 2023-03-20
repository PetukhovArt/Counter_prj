import React, {ButtonHTMLAttributes, useState} from 'react';
import s from './Counter.module.css'
import {SuperButton} from '../SuperButton/SuperButton';
import {log} from 'util';


type CounterPropsType = {
    count: number
    counter: (name: string) => void
    disableButton: (name: string) => boolean
    maxValue: number
    startValue: number
    editMode: boolean
}

export const Counter: React.FC<CounterPropsType> = (props) => {
    const {editMode, maxValue, startValue, count, counter, disableButton, ...otherProps} = props

    const countClassName = ` ${s.countDefault} 
    ${count === maxValue || count === startValue ? s.countError : ''} 
    }`

    const displayError = maxValue === startValue || startValue < 0 || maxValue < startValue
    const displayEnterValues = maxValue !== startValue && startValue >= 0 && maxValue > startValue

    return (
        <div className={s.wrapper}>
            <div className={s.valuesWrapper}>
                {editMode && displayEnterValues ?
                    <div className={s.pressSet}>Enter values and press 'Set'</div>
                    : displayError ?
                        <div className={s.error}>Incorrect values!</div>
                        : <div className={countClassName}>{count}</div>
                }
            </div>

            <div className={s.buttonWrapper}>
                <SuperButton name="incr"
                             callBack={() => counter('incr')} //вызов коллбэка из родителя и передаем имя кнопки
                             callBackDisable={() => disableButton('incr')}
                ></SuperButton>
                <SuperButton name="decr"
                             callBack={() => counter('decr')}
                             callBackDisable={() => disableButton('decr')}
                ></SuperButton>
                <SuperButton name="Reset"
                             callBack={() => counter('Reset')}
                             callBackDisable={() => disableButton('Reset')}
                ></SuperButton>
                <SuperButton name="Menu"
                             callBack={() => counter('Menu')}
                             callBackDisable={() => disableButton('Menu')}
                ></SuperButton>
            </div>
        </div>
    )
}
