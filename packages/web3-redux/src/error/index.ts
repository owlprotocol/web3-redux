/**
 * Store errors from redux actions
 * @module Error
 */

import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';

export const ReduxError = {
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

export default ReduxError;
