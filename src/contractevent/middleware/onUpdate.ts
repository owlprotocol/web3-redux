import { AnyAction, Store } from 'redux';
import { AbiCoder } from 'web3-eth-abi';

import { selectByIdSingle as selectContract } from '../../contract/selectors';

import { CREATE, UPDATE } from '../actions';
import { ContractEvent } from '../model/interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const coder: AbiCoder = require('web3-eth-abi');
/**
 * Middleware for whenever an event log created/updated.
 * Use cases:
 * - Decode batched event subscriptions that match multiple smart contracts
 */
//TODO: Handle batched updates? Is this even required? Most updates will be fetch or subscription updates.
export const onUpdate = (store: Store) => (next: (action: AnyAction) => any) => (action: AnyAction) => {
    let events: ContractEvent[] = [];
    if (action.type.startsWith(CREATE) || action.type.startsWith(UPDATE)) {
        if (action.meta && action.meta.batch) {
            //Batched actions
            events = action.payload.map(({ payload }: { payload: ContractEvent }) => payload);
        } else {
            //Single action
            events = [action.payload as ContractEvent];
        }
    }

    //Mutate events in place
    events.forEach((e) => {
        if (!e.returnValues && e.data) {
            //Undefined returnValues but data present
            //look to parse returnValues using contract event signature
            const networkId = e.networkId;
            const address = e.address;
            const state = store.getState();
            const contract = selectContract(state, { networkId, address });
            if (!contract?.eventAbiBySignature) return;
            const [eventSignature, ...topics] = e.topics ?? [];
            if (!eventSignature) return;
            const eventAbi = contract.eventAbiBySignature[eventSignature];
            if (!eventAbi.inputs) return;

            //https://web3js.readthedocs.io/en/v1.7.0/web3-eth-abi.html?#decodelog
            //Skip the first topic for non-anonymous logs
            const returnValues = coder.decodeLog(eventAbi.inputs, e.data, topics);

            //Mutate event in-place
            //TODO: Index values?
            //@ts-ignore
            e.returnValues = returnValues;
        }
    });

    next(action);
};

export default onUpdate;
