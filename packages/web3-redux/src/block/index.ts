/**
 * EVM block data module.
 * @module Block
 */

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';
import * as Hooks from './hooks/index.js';

export const Block = {
    name: CRUDModel.name,
    actionTypes: CRUDModel.actionTypes,
    actions: {
        ...CRUDModel.actions,
        fetch: Actions.fetch,
        subscribe: Actions.subscribe,
        unsubscribe: Actions.unsubscribe,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
        useBlock: Hooks.useBlock,
        useBlockSync: Hooks.useBlockSync,
    },
};

export default Block;
