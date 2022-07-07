/**
 * EVM call data module.
 * @module EthCall
 */

export * from './model/index.js';
export * from './actions/index.js';
export * from './reducer.js';

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';

const model = {
    name: CRUDModel.name,
    actions: {
        ...CRUDModel.actions,
        fetch: Actions.fetch,
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
