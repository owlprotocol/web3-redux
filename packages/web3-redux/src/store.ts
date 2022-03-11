import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { crashReporter, onPersistRehydrate } from './middleware/index.js';
import { onBlockUpdate } from './block/middleware/index.js';
import { onNetworkUpdate } from './network/middleware/index.js';
import { onContractUpdate } from './contract/middleware/index.js';
import { onEventUpdate } from './contractevent/middleware/index.js';

import { isClient } from './utils/isClient.js';
import { rootReducer, createRootReducer, createReducerWeb3ReduxWithPersist, defaultLocalStorage } from './reducer.js';
import { rootSaga as defaultRootSaga } from './saga.js';
const defaultMiddleware: any[] = [
    crashReporter,
    onPersistRehydrate,
    onNetworkUpdate,
    onContractUpdate,
    onBlockUpdate,
    onEventUpdate,
];

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
export const createStoreWithPersistor = () => createStore({ persistStorage: defaultLocalStorage });
export { store };

export default store;