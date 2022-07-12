/**
 * EVM network config module.
 * @module Network
 */

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';
import * as Hooks from './hooks/index.js';
import defaultNetworks from './defaults.js';

export const Network = {
    name: CRUDModel.name,
    actionTypes: CRUDModel.actionTypes,
    actions: {
        ...CRUDModel.actions,
        getBlockNumber: Actions.getBlockNumber,
        getChainId: Actions.getChainId,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
        useNetwork: Hooks.useNetwork,
        useLatestBlock: Hooks.useLatestBlock,
        useLatestBlockNumber: Hooks.useLatestBlockNumber,
    },
    defaultNetworks,
    selectors: CRUDModel.selectors,
    isAction: CRUDModel.isAction,
    reducer: CRUDModel.reducer,
    validate: CRUDModel.validate,
    validateId: CRUDModel.validateId,
    hydrate: CRUDModel.hydrate,
    encode: CRUDModel.encode,
};

export default Network;
