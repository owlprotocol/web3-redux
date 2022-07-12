/**
 * @module Http
 */

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';
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
};

export default HTTPCache;
