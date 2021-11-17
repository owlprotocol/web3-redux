import { combineReducers, createStore as createReduxStore, applyMiddleware } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import createSagaMiddleware from 'redux-saga';
import crashReporter from './middleware/crashReporter';
import { rootReducer } from './reducer';
import { rootSaga } from './saga';
import { REDUX_ROOT } from './common';

const reducers = combineReducers({
    [REDUX_ROOT]: enableBatching(rootReducer as (state: any, action: any) => any),
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
