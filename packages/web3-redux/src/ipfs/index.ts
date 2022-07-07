/**
 * @module Ipfs
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
        add: Actions.add,
        addAll: Actions.addAll,
        blockGet: Actions.blockGet,
        blockPut: Actions.blockPut,
        cat: Actions.cat,
        cat2: Actions.cat2,
        fetchIpfs: Actions.fetchIpfs,
        get: Actions.get,
        getCBOR: Actions.getCBOR,
        ls: Actions.ls,
        objectGet: Actions.objectGet,
        putCBOR: Actions.putCBOR,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
        useCat: Hooks.useCat,
        useIpfs: Hooks.useIpfs,
        useURI: Hooks.useURI,
    },
};

export default model;
