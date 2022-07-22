/**
 * @module Http
 */

import * as Actions from './actions/index.js';
import { HTTPCacheCRUD as CRUDModel } from './crud.js';
import { HTTPCacheSaga as rootSaga } from './sagas/index.js';
import * as Hooks from './hooks/index.js';

const HTTPCache = {
    name: CRUDModel.name,
    actionTypes: CRUDModel.actionTypes,
    actions: {
        ...CRUDModel.actions,
        httpGet: Actions.httpGet,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
        useHttpGet: Hooks.useHttpGet,
    },
    selectors: CRUDModel.selectors,
    isAction: CRUDModel.isAction,
    reducer: CRUDModel.reducer,
    validate: CRUDModel.validate,
    validateId: CRUDModel.validateId,
    hydrate: CRUDModel.hydrate,
    encode: CRUDModel.encode,
};

export default HTTPCache;
