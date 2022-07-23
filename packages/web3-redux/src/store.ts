import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { crashReporter } from './middleware/index.js';
import { onNetworkUpdate } from './network/middleware/index.js';
//import { onContractUpdate } from './contract/middleware/index.js';
//import { onEventUpdate } from './contractevent/middleware/index.js';

import { isClient } from './utils/isClient.js';
import { rootReducer } from './reducer.js';
import { rootSaga as defaultRootSaga } from './saga.js';
const defaultMiddleware: any[] = [crashReporter, onNetworkUpdate];

/** @internal */
interface CreateStoreOptions {
    middleware?: any[];
    rootSaga?: any;
}
/** @internal */
export const createStore = (options?: CreateStoreOptions) => {
    const { middleware, rootSaga } = options ?? {};

    //Enable redux-devtools support, tracing
    const reduxDevToolsExists = isClient() && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const composeEnhancers = reduxDevToolsExists
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 10 })
        : compose;
    const sagaMiddleware = createSagaMiddleware();
    const rootMiddleware = applyMiddleware(...(middleware ?? defaultMiddleware), sagaMiddleware);

    const store = createReduxStore(rootReducer, composeEnhancers(rootMiddleware));
    sagaMiddleware.run(rootSaga ?? defaultRootSaga);

    return store;
};

export type StoreType = ReturnType<typeof createStore>;
export type DispatchType = StoreType['dispatch'];

const store = createStore();
export { store };
