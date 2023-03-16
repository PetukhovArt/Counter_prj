import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import '../../App.css';
import s from './SuperButton.module.css'


type ButtonPropsType =  {
    name: string
    callBack:()=>void //callBack из родительских компонент
    callBackDisable:()=>boolean //callBack из родительских компонент
}

export const SuperButton: React.FC<ButtonPropsType>= (props) => {
    //деструктуризация props , чтобы не использовать "props" (...otherProps - заглушка , если будут добавлены еще пропсы)
    const {name,callBack,callBackDisable,...otherProps}=props

    const onClickHandler = () => {
        callBack() //вызов коллбэка из родителя
    }
    const disableHandler = () => {
        return callBackDisable();  //вызов коллбэка из родителя
    }

    return (
        <button className={s.button} //use module.css
                onClick={onClickHandler}
                disabled={disableHandler()}
        >
            {name}
        </button>

    )
}

