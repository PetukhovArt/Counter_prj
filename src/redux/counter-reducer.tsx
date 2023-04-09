export type incrementActionType = {
    type: 'INCREMENT'
}
export type decrementActionType = {
    type: 'DECREMENT'
}
export type resetCounterActionType = {
    type: 'RESET-COUNTER'
}
export type setCounterActionType = {
    type: 'SET-COUNTER'
}
export type onChangeMaxActionType = {
    type: 'MAX-VALUE-CHANGE'
    newValue: number
}
export type onChangeMinActionType = {
    type: 'MIN-VALUE-CHANGE'
    newValue: number
}

type initialStateType = typeof initialState

type ActionTypes = incrementActionType | decrementActionType | resetCounterActionType | setCounterActionType | onChangeMaxActionType | onChangeMinActionType

export const incrementAC = ():incrementActionType => {
    return {type: 'INCREMENT'}
}
export const decrementAC = ():decrementActionType => {
    return {type: 'DECREMENT'}
}
export const resetCounterAC = ():resetCounterActionType => {
    return {type: 'RESET-COUNTER'}
}
export const setCounterAC = ():setCounterActionType => {
    return {type: 'SET-COUNTER'}
}
export const onChangeMaxHandlerAC = (newValue: number): onChangeMaxActionType  => {
    return {type: 'MAX-VALUE-CHANGE', newValue }
}
export const onChangeMinHandlerAC = (newValue: number): onChangeMinActionType => {
    return {type: 'MIN-VALUE-CHANGE', newValue }
}

let initialState = {
    count: 0,
    maxValue: 1,
    startValue: 0,
}

export const counterReducer = (state: initialStateType = initialState, action: ActionTypes)
    : initialStateType => {
    switch (action.type) {
        case 'INCREMENT':  return {...state, count: state.count + 1}
        case 'DECREMENT':  return {...state, count: state.count - 1}
        case 'RESET-COUNTER':  return {...state, count: state.startValue}
        case 'SET-COUNTER':  return {...state, startValue: state.startValue}
        case 'MAX-VALUE-CHANGE': return {...state, maxValue: action.newValue}
        case 'MIN-VALUE-CHANGE': return {...state, startValue: action.newValue}
        default:
            return state
    }
}



