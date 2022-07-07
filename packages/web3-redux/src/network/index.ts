/**
 * EVM network config module.
 * @module Network
 */

export * from './model/index.js';
export * from './defaults.js';

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';
import * as Hooks from './hooks/index.js';

const model = {
    name: CRUDModel.name,
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
        useLatestBlock: Hooks.useLatestBlock,
        useLatestBlockNumber: Hooks.useLatestBlockNumber,
    },
};

export default model;
