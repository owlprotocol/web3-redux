/**
 * @module 4Byte
 */

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';

export const _4Byte = {
    name: CRUDModel.name,
    actionTypes: CRUDModel.actionTypes,
    actions: {
        ...CRUDModel.actions,
        fetchEventSignature: Actions.fetchEventSignature,
        fetchFunctionSignature: Actions.fetchFunctionSignature,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
    },
};

export default _4Byte;
