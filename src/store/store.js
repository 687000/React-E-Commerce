import {compose,createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
//middleWares, run before actions hit reducer.

const loggerMiddleware=(store)=>(next)=>(action)=>{
    if(!action.type){
        return next(action);
    }
    console.log('type:',action.type);
    console.log('payload:',action.payload);
    console.log('currentState:',store.getState());
    next(action);
    console.log('next state:',store.getState())
}

const middleWares=[loggerMiddleware]
//compose, pass multipla function left to right
const composedEnhancers=compose(applyMiddleware(...middleWares))
//logger-what state look like before dispatch, what dispatch does, and how dispatch impact state
export const store=createStore(rootReducer,undefined,composedEnhancers);
//rootR educer, addtional default states, and logger(throught composedEnhancers)