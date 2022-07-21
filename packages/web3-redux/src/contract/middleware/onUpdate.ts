//@ts-nocheck
import { AnyAction, Store } from 'redux';

/*
import { coder } from '../../utils/web3-eth-abi/index.js';
import ContractCRUD from '../crud.js';
import { Contract } from '../model/index.js';
import { ContractEvent } from '../../contractevent/model/index.js';
import ContractEventCRUD from '../../contractevent/crud.js';
*/
/**
 * Middleware for whenever a contract created/updated.
 * Use cases:
 * - Decode events with undefined returnValues that are decodable with a contract abi
 */
export const onUpdate = (_: Store) => (next: (action: AnyAction) => any) => (action: AnyAction) => {
    next(action);
    /*
    let contracts: Contract[] = [];
    if (ContractCRUD.actions.create.match(action) || ContractCRUD.actions.update.match(action)) {
        contracts = [action.payload];
    } else if (ContractCRUD.actions.createBatched.match(action) || ContractCRUD.actions.updateBatched.match(action)) {
        contracts = action.payload;
    }

    //Update events
    const updates: ContractEvent[] = [];
    const state = store.getState();
    contracts.forEach((c) => {
        const networkId = c.networkId;
        const address = c.address;
        //TODO: Refactor as async saga
        const events = selectEvents(state, JSON.stringify({ networkId, address })) ?? [];
        events.forEach((e) => {
            if (!e.returnValues && e.data) {
                //Undefined returnValues but data present
                //look to parse returnValues using contract event signature
                if (!c?.eventAbiBySignature) return;
                const [eventSignature, ...topics] = e.topics ?? [];
                if (!eventSignature) return;
                const eventAbi = c.eventAbiBySignature[eventSignature];
                if (!eventAbi.inputs) return;

                //https://web3js.readthedocs.io/en/v1.7.0/web3-eth-abi.html?#decodelog
                //Skip the first topic for non-anonymous logs
                const returnValues = coder.decodeLog(eventAbi.inputs, e.data, topics);
                updates.push({
                    networkId: e.networkId,
                    blockHash: e.blockHash,
                    logIndex: e.logIndex,
                    address: e.address,
                    returnValues,
                });
            }
        });
    });

    next(action);

    if (updates.length > 0) {
        store.dispatch(ContractEventCRUD.actions.updateBatched(updates));
    }
    */
};

export default onUpdate;
