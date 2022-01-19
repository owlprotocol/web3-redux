import { combineReducers, createStore as createReduxStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { crashReporter, onNetworkUpdate } from './middleware';
import { onBlockUpdate } from './block/middleware';
import { rootReducer } from './reducer';
import { rootSaga } from './saga';
import { REDUX_ROOT } from './common';

const reducers = combineReducers({
    [REDUX_ROOT]: rootReducer,
});

/** @internal */
export const createStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const rootMiddleware = applyMiddleware(crashReporter, onNetworkUpdate as any, onBlockUpdate as any, sagaMiddleware);
    const store = createReduxStore(reducers, rootMiddleware);
    sagaMiddleware.run(rootSaga);
    return store;
};

export type StoreType = ReturnType<typeof createStore>;
export type DispatchType = StoreType['dispatch'];

export default createStore();
