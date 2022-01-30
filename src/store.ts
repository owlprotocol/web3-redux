import { combineReducers, createStore as createReduxStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { crashReporter } from './middleware';
import { onBlockUpdate } from './block/middleware';
import { onNetworkUpdate } from './network/middleware';
import { reducerWithPersist, createReducerWithPersist } from './reducer';
import { rootSaga as defaultRootSaga } from './saga';
import { REDUX_ROOT } from './common';

const defaultMiddleware: any[] = [crashReporter, onNetworkUpdate, onBlockUpdate];

/** @internal */
interface CreateStoreOptions {
    persistStorage?: any;
    middleware?: any[];
    rootSaga?: any;
}
/** @internal */
export const createStore = (options?: CreateStoreOptions) => {
    const { persistStorage, middleware, rootSaga } = options ?? {};

    const web3ReduxReducer = persistStorage ? createReducerWithPersist(persistStorage) : reducerWithPersist;
    const reducers = combineReducers({
        [REDUX_ROOT]: web3ReduxReducer,
    });

    const sagaMiddleware = createSagaMiddleware();
    const rootMiddleware = applyMiddleware(...(middleware ?? defaultMiddleware), sagaMiddleware);
    const store = createReduxStore(reducers, rootMiddleware);
    const persistor = persistStore(store);

    sagaMiddleware.run(rootSaga ?? defaultRootSaga);

    return { store, persistor };
};

export type StoreType = ReturnType<typeof createStore>['store'];
export type DispatchType = StoreType['dispatch'];

const { store } = createStore();
export default store;
