/**
 * Comments on ContractEvent module
 * @module ContractEvent
 */

export * from './model/index.js';

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';

const model = {
    name: CRUDModel.name,
    actions: {
        ...CRUDModel.actions,
        getAssets: Actions.getAssets,
        getPastLogs: Actions.getPastLogs,
        subscribeLogs: Actions.subscribeLogs,
        unsubscribeLogs: Actions.unsubscribeLogs,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
    },
};

export default model;
