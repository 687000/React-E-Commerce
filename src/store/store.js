import { compose,createStore,applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';
//middleWares, run before actions hit reducer.

const persistConfig ={
    key: 'root',
    storage,
    blacklist:['user'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleWares=[process.env.NODE_ENV!=="production"&&logger,thunk].filter(Boolean);

//const middleWares=[loggerMiddleware]
//compose, pass multipla function left to right
const composeEnhancer=(process.env.NODE_ENV!=="production"&&window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers=composeEnhancer(applyMiddleware(...middleWares));
//logger-what state look like before dispatch, what dispatch does, and how dispatch impact state
export const store = createStore(
    persistedReducer,
    undefined,
    composedEnhancers
  );
//rootR educer, addtional default states, and logger(throught composedEnhancers)

export const persistor=persistStore(store);