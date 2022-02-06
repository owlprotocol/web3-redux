import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { crashReporter } from './middleware';
import { onBlockUpdate } from './block/middleware';
import { onNetworkUpdate } from './network/middleware';
import { rootReducer, createRootReducer, createReducerWeb3ReduxWithPersist } from './reducer';
import { rootSaga as defaultRootSaga } from './saga';
import isClient from './utils/isClient';

import { LocalStorageAsyncMock } from './test/localstorageAsync';

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

    const reducer = persistStorage ? createRootReducer(createReducerWeb3ReduxWithPersist(persistStorage)) : rootReducer;

    //Enable redux-devtools support
    const composeEnhancers = isClient() ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose : compose;
    const sagaMiddleware = createSagaMiddleware();
    const rootMiddleware = applyMiddleware(...(middleware ?? defaultMiddleware), sagaMiddleware);
    const store = createReduxStore(reducer, composeEnhancers(rootMiddleware));
    const persistor = persistStorage ? persistStore(store) : undefined;

    sagaMiddleware.run(rootSaga ?? defaultRootSaga);

    return { store, persistor };
};

export type StoreType = ReturnType<typeof createStore>['store'];
export type DispatchType = StoreType['dispatch'];

const { store } = createStore();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const localStorage = isClient() ? require('redux-persist/lib/storage').default : new LocalStorageAsyncMock();
const storeWithPersistor = createStore({ persistStorage: localStorage });

export { store, storeWithPersistor };

export default store;
