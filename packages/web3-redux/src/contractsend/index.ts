/**
 * Comments on ContractSend module
 * @module ContractSend
 */

export * from './model/index.js';

import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';

const model = {
    name: CRUDModel.name,
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
