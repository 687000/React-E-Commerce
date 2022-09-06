import {compose,createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
//middleWares, run before actions hit reducer.
const middleWares=[logger]
//compose, pass multipla function left to right
const composedEnhancers=compose(applyMiddleware(...middleWares))
//logger-what state look like before dispatch, what dispatch does, and how dispatch impact state
export const store=createStore(rootReducer,undefined,composedEnhancers);
//rootR educer, addtional default states, and logger(throught composedEnhancers)