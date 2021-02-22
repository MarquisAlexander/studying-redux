import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';

import rootReducer from './modules/rootReducer';
import { ICartState } from './modules/cart/types';

export interface IState {
    cart: ICartState;
}

const sagaMiddlerate = createSagaMiddleware();

const middlewares = [sagaMiddlerate];

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middlewares)
    )
    );

sagaMiddlerate.run(rootSaga);

export default store;