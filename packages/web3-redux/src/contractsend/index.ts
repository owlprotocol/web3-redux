/**
 * Comments on ContractSend module
 * @module ContractSend
 */

import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';

export const ContractSend = {
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

export default ContractSend;
