/**
 * Comments on Sync module
 * @module Sync
 */

import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';

export const Sync = {
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

export default Sync;
