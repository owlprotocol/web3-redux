/**
 * ContractSend module
 * Temporarily store transactions signature requests
 * before they are signed as fully formed transactions.
 * @module ContractSend
 */

import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';

export { ContractSendStatus } from './model/index.js';

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
    selectors: CRUDModel.selectors,
    isAction: CRUDModel.isAction,
    reducer: CRUDModel.reducer,
    validate: CRUDModel.validate,
    validateId: CRUDModel.validateId,
    hydrate: CRUDModel.hydrate,
    encode: CRUDModel.encode,
};

export default ContractSend;
