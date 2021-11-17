import { combineReducers, createStore as createReduxStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import crashReporter from './middleware/crashReporter';
import { rootReducer } from './reducer';
import { rootSaga } from './saga';
import { REDUX_ROOT } from './common';

const reducers = combineReducers({
    [REDUX_ROOT]: rootReducer,
});

export const createStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createReduxStore(reducers, applyMiddleware(crashReporter, sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
};

export type StoreType = ReturnType<typeof createStore>;
export type DispatchType = StoreType['dispatch'];

export default createStore();
