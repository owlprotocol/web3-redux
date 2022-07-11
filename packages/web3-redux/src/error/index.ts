/**
 * Store errors from redux actions
 * @module Error
 */

export * from './model/index.js';
export * from './actions/index.js';

import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';

const model = {
    name: CRUDModel.name,
    actionTypes: CRUDModel.actionTypes,
    actions: {
        ...CRUDModel.actions,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
    },
};

export default model;
