/**
 * EVM network config module.
 * Store EVM network parameters such as RPC url, web3/web3Sender instances
 * and other relevant data such as block explorer urls.
 * @module Network
 */

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';
import * as Hooks from './hooks/index.js';
import defaultNetworks from './defaults.js';

export type { NetworkWithObjects } from './model/index.js';

export const Network = {
    name: CRUDModel.name,
    actionTypes: CRUDModel.actionTypes,
    actions: {
        ...CRUDModel.actions,
        getBlockNumber: Actions.getBlockNumberAction,
        getChainId: Actions.getChainId,
    },
    db: CRUDModel.db,
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
        useAccounts: Hooks.useAccounts,
        useDefaultNetworks: Hooks.useDefaultNetworks,
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
