import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {Counter} from './Components/Counter/Counter';
import {SetCounter} from './Components/Counter/SetCounter';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Navbar} from './Components/Navbar/Navbar';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './redux/store';
import {
    decrementAC,
    incrementAC,
    onChangeMaxHandlerAC,
    onChangeMinHandlerAC, resetCounterAC,
    setCounterAC
} from './redux/counter-reducer';

export type StateType = {
    count: number
    maxValue: number
    startValue: number
}

export function AppWithReactRedux() {
    const state = useSelector<AppRootStateType, StateType>(state => state.stateCounter)
    const dispatch = useDispatch()

    const [disable, setDisable] = useState<boolean>(false)
    //disable for Set Button
    const [editMode, setEditeMode] = useState<boolean>(false)
    //for div "enter values" display in component "Counter"

    useEffect(() => { //disable Set Button properties (setCounter component)
        if (state.maxValue === state.startValue // incorrect values
            || state.startValue < 0 // incorrect values
            || state.maxValue < state.startValue // incorrect values
        ) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [state.maxValue, state.startValue, state.count]);

    function disableButton(name: string) {
        if (name === 'incr' && state.count === state.maxValue || editMode) return true
        if (state.count === state.startValue && name === 'decr') return true;
        if (state.maxValue === state.startValue || state.startValue < 0 || state.maxValue < state.startValue) return true;
        return state.count === state.startValue && name === 'Reset';
    }

    function editModeActive(newValue: number) { // if onChange from Inputs (setCounter)
        if (newValue) {
            setEditeMode(!!newValue)
            setDisable(false) // if onChange => "Set" button disable
        }
    }

    function counter(name: string) {
        if (name === 'incr' && state.count < state.maxValue) dispatch(incrementAC())
        if (name === 'decr' && state.count > state.startValue) dispatch(decrementAC())
        if (name === 'Reset') dispatch(resetCounterAC())
    }

    function setValueToCounter(name: string) { //onClick Set Button
        if (name === 'Set') {
            dispatch(setCounterAC())
            setEditeMode(false) //after onClick => disable Edite mode
            setDisable(true)//after onClick => disable Set
        }
    }

    function onChangeMaxHandler(newValue: number) {
        dispatch(onChangeMaxHandlerAC(newValue))
    }

    function onChangeMinHandler(newValue: number) {
        dispatch(onChangeMinHandlerAC(newValue))
    }

    const error = state.maxValue === state.startValue || state.startValue < 0 || state.maxValue < state.startValue


    return (
        <div className="appWrapper">
            <div className="appWrapperContent">
                <Counter
                    count={state.count}
                    counter={counter}
                    disableButton={disableButton}
                    maxValue={state.maxValue}
                    startValue={state.startValue}
                    editMode={editMode}
                />
                <SetCounter
                    error={error}
                    maxValue={state.maxValue}
                    startValue={state.startValue}
                    setValueToCounter={setValueToCounter}
                    disableButton={disableButton}
                    onChangeMaxHandler={onChangeMaxHandler}
                    onChangeMinHandler={onChangeMinHandler}
                    disable={disable}
                    editModeActive={editModeActive}
                />
            </div>
            <div className="description">
                Max and Min should be more than 0 <br/>
                Max and Min should be not equal <br/>
                Max should be more than Min
            </div>
        </div>
    );
}

