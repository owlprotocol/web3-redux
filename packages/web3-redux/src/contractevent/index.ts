/**
 * Comments on ContractEvent module
 * @module ContractEvent
 */

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';

const ContractEvent = {
    name: CRUDModel.name,
    actionTypes: CRUDModel.actionTypes,
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

export default ContractEvent;
