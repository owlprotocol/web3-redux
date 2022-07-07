/**
 * Comments on Config module
 * @module Config
 */

export * from './model/index.js';

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';
import * as Hooks from './hooks/index.js';

const model = {
    name: CRUDModel.name,
    actions: {
        ...CRUDModel.actions,
        set: Actions.set,
        setAccount: Actions.setAccount,
        setNetworkId: Actions.setNetworkId,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
        useConfig: Hooks.useConfig,
        useAccount: Hooks.useAccount,
        useNetworkId: Hooks.useNetworkId,
    },
};

export default model;
