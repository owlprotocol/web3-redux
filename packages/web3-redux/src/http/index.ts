/**
 * @module Http
 */

export * from './model/index.js';

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';
import * as Hooks from './hooks/index.js';

const model = {
    name: CRUDModel.name,
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

export default model;
