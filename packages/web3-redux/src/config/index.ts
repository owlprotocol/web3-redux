/**
 * Comments on Config module
 * @module Config
 */

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';
import * as Hooks from './hooks/index.js';

export const Config = {
    name: CRUDModel.name,
    actionTypes: CRUDModel.actionTypes,
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

export default Config;
