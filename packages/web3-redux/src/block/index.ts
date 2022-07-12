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
    selectors: CRUDModel.selectors,
    isAction: CRUDModel.isAction,
    reducer: CRUDModel.reducer,
    validate: CRUDModel.validate,
    validateId: CRUDModel.validateId,
    hydrate: CRUDModel.hydrate,
    encode: CRUDModel.encode,
};

export default Block;
