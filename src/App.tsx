import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {Counter} from './Components/Counter/Counter';
import {SetCounter} from './Components/Counter/SetCounter';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Navbar} from './Components/Navbar/Navbar';

function App() {

    const getCountFromLS = (): number => {
        let countAsString = localStorage.getItem('count')
        if (countAsString) {
            return JSON.parse(countAsString)
        } else return 0
    } // value from LS || 0
    const getMaxValueFromLS = (): number => {
        let maxValueAsString = localStorage.getItem('maxValue')
        if (maxValueAsString) {
            return JSON.parse(maxValueAsString)
        } else return 0
    } // value from LS || 0
    const getStartValueFromLS = (): number => {
        let startValueAsString = localStorage.getItem('startValue')
        if (startValueAsString) {
            return JSON.parse(startValueAsString)
        } else return 0
    } // value from LS || 0

    const [count, setCount] = useState<number>(getCountFromLS)
    const [maxValue, setMaxValue] = useState<number>(getMaxValueFromLS)
    const [startValue, setStartValue] = useState<number>(getStartValueFromLS)
    const [disable, setDisable] = useState<boolean>(false)
    //disable for Set Button
    const [editMode, setEditeMode] = useState<boolean>(false)
    //for div "enter values" display

    useEffect(() => {
        localStorage.setItem('count', JSON.stringify(count))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        localStorage.setItem('startValue', JSON.stringify(startValue))
    }, [count, maxValue, startValue])
    //when dep-s differ , setItems to LS

    useEffect(() => { //disable Set Button properties (setCounter component)
        if (maxValue === startValue // incorrect values
            || startValue < 0 // incorrect values
            || maxValue < startValue // incorrect values
        ) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [maxValue, startValue, count]);

    function disableButton(name: string) {
        if (name === 'incr' && count === maxValue || editMode) return true
        if (count === startValue && name === 'decr') return true;
        if (maxValue === startValue || startValue < 0 || maxValue < startValue) return true;
        return count === startValue && name === 'Reset';
    }
    function editModeActive(newValue: number) { // if onChange from Inputs (setCounter)
        if (newValue) {
            setEditeMode(!!newValue)
            setDisable(false) // if onChange => "Set" button disable
        }
    }

    function counter(name: string) {
        if (name === 'incr' && count < maxValue) setCount(count + 1)
        if (name === 'decr' && count > startValue) setCount(count - 1)
        if (name === 'Reset') setCount(startValue)
    }
    function setCounter(name: string) { //onClick Set Button
        if (name === 'Set') {
            setCount(startValue)
            setEditeMode(false) //after onClick => disable Edite mode
            setDisable(true) //after onClick => disable Set
        }
    }
    const error = maxValue === startValue || startValue < 0 || maxValue < startValue
    function onChangeMaxHandler(newValue: number) {
        setMaxValue(newValue)
    }
    function onChangeMinHandler(newValue: number) {
        setStartValue(newValue)
    }


    return (
        <BrowserRouter>
            {/*<div className="appWrapper">*/}
            {/*    <Navbar/>*/}
            {/*    <div className="appWrapperContent">*/}
            {/*        <Routes>*/}
            {/*            <Route path="/counter/*"*/}
            {/*                   element={*/}
            {/*                       <Counter*/}
            {/*                           count={count}*/}
            {/*                           counter={counter}*/}
            {/*                           disableButton={disableButton}*/}
            {/*                           maxValue={maxValue}*/}
            {/*                           startValue={startValue}*/}
            {/*                           editMode={editMode}/>}*/}
            {/*            />*/}
            {/*            <Route path="/setcounter/*"*/}
            {/*                   element={*/}
            {/*                       <SetCounter*/}
            {/*                           error={error}*/}
            {/*                           maxValue={maxValue}*/}
            {/*                           startValue={startValue}*/}
            {/*                           count={count}*/}
            {/*                           setCounter={setCounter}*/}
            {/*                           disableButton={disableButton}*/}
            {/*                           onChangeMaxHandler={onChangeMaxHandler}*/}
            {/*                           onChangeMinHandler={onChangeMinHandler}*/}
            {/*                           disable={disable}*/}
            {/*                           setDisable={setDisable}*/}
            {/*                           editModeActive={editModeActive}*/}
            {/*                       />}*/}
            {/*            />*/}
            {/*        </Routes>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </BrowserRouter>
    );
}

// export default App;
