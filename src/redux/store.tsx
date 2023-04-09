import {combineReducers, createStore} from 'redux';
import {counterReducer} from './counter-reducer';


export type AppRootStateType = ReturnType<typeof rootReducer>
export type StoreReduxType=typeof store

export const rootReducer = combineReducers({
    stateCounter: counterReducer
})

export const store = createStore(rootReducer)
// @ts-ignore
window.store = store