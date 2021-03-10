import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';

import allSaga from './all-saga';
import allReducer from './all-reducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(allReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(allSaga);

export { store };
