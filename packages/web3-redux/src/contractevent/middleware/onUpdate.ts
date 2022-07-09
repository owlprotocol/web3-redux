import { AnyAction, Store } from 'redux';
import ContractCRUD from '../../contract/crud.js';
import { compact } from '../../utils/lodash/index.js';

import { coder } from '../../utils/web3-eth-abi/index.js';
import ContractEventCRUD from '../crud.js';
import { ContractEvent } from '../model/interface.js';

/**
 * Middleware for whenever an event log created/updated.
 * Use cases:
 * - Decode events with undefined returnValues that are decodable with a contract abi
 */
export const onUpdate = (store: Store) => (next: (action: AnyAction) => any) => (action: AnyAction) => {
    let events: ContractEvent[] = [];
    if (ContractEventCRUD.actions.create.match(action) || ContractEventCRUD.actions.update.match(action)) {
        events = [action.payload];
    } else if (
        ContractEventCRUD.actions.createBatched.match(action) ||
        ContractEventCRUD.actions.updateBatched.match(action)
    ) {
        events = action.payload;
    }

    const state = store.getState();
    //Update events
    const updates = compact(
        events
            .filter((e) => !e.returnValues && e.data) //Filter events with data but no decoded values
            .map((e) => {
                //Undefined returnValues but data present
                //look to parse returnValues using contract event signature
                const networkId = e.networkId;
                const address = e.address;
                const contract = ContractCRUD.selectors.selectByIdSingle(state, { networkId, address });
                if (!contract?.eventAbiBySignature) return;
                const [eventSignature, ...topics] = e.topics ?? [];
                if (!eventSignature) return;
                const eventAbi = contract.eventAbiBySignature[eventSignature];
                if (!eventAbi.inputs) return;

                //https://web3js.readthedocs.io/en/v1.7.0/web3-eth-abi.html?#decodelog
                //Skip the first topic for non-anonymous logs
                const returnValues = coder.decodeLog(eventAbi.inputs, e.data!, topics);
                return {
                    networkId,
                    blockHash: e.blockHash,
                    logIndex: e.logIndex,
                    address,
                    returnValues,
                };
            }),
    );

    next(action);

    if (updates.length > 0) store.dispatch(ContractEventCRUD.actions.updateBatched(updates));
};

export default onUpdate;
