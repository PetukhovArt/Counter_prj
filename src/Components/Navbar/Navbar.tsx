import React, {ButtonHTMLAttributes, ChangeEvent, MouseEvent, useState} from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

type NavbarPropsType = {}


export const Navbar: React.FC<NavbarPropsType> = (props) => {
    const {...otherProps} = props


    return (
        <div className={s.navbar}>
            <div className={s.linkWrapper}>
                <NavLink className={s.active}
                    to="/counter">Counter</NavLink></div>
            <div className={s.linkWrapper}>
                <NavLink className={s.active}
                    to="/setcounter">SetCounter</NavLink></div>
        </div>

)
}