/**
 * EVM smart contract / EOA module.
 * @module Contract
 */

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import rootSaga from './sagas/index.js';
import * as Hooks from './hooks/index.js';

export const Contract = {
    name: CRUDModel.name,
    actionTypes: CRUDModel.actionTypes,
    actions: {
        ...CRUDModel.actions,
        call: Actions.call,
        callBatched: Actions.callBatched,
        callSynced: Actions.callSynced,
        eventGetPast: Actions.eventGetPast,
        eventGetPastRaw: Actions.eventGetPastRaw,
        eventSubscribe: Actions.eventSubscribe,
        fetchAbi: Actions.fetchAbi,
        fetchTransactions: Actions.fetchTransactions,
        getBalance: Actions.getBalance,
        getCode: Actions.getCode,
        getNonce: Actions.getNonce,
        getNonceSynced: Actions.getNonceSynced,
        send: Actions.send,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
        useContract: Hooks.useContract,
        useContractCall: Hooks.useContractCall,
        useContractSend: Hooks.useContractSend,
        useContractWithAbi: Hooks.useContractWithAbi,
        useERC20: Hooks.useERC20,
        useERC721: Hooks.useERC721,
        useERC1155: Hooks.useERC1155,
        useEvents: Hooks.useEvents,
        useFetchAbi: Hooks.useFetchAbi,
        useFetchTransactions: Hooks.useFetchTransactions,
        useGetBalance: Hooks.useGetBalance,
        useGetCode: Hooks.useGetCode,
        useGetNonce: Hooks.useGetCode,
        useSupportsInterface: Hooks.useSupportsInterface,
    },
};

export default Contract;
