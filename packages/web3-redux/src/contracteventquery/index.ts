/**
 * ContractEventQuery module
 * Used to cache past event query ranges (eg. blocks 0-100) to avoid
 * re-fetching already cached data.
 * @module ContractEventQuery
 */

import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';

const ContractEventQuery = {
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

export default ContractEventQuery;
