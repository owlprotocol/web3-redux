import { AnyAction, Store } from 'redux';
import { batchActions } from 'redux-batched-actions';
import { AbiCoder } from 'web3-eth-abi';

import { selectByIdSingle as selectContract } from '../../contract/selectors/index.js';

import { CREATE, UPDATE, set as setEvent, SetAction as SetEventAction, SET as SET_EVENT } from '../actions/index.js';
import { ContractEvent } from '../model/interface.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const coder: AbiCoder = require('web3-eth-abi');
/**
 * Middleware for whenever an event log created/updated.
 * Use cases:
 * - Decode events with undefined returnValues that are decodable with a contract abi
 */
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

    //Update events
    const setActions: SetEventAction[] = [];
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
            setActions.push(
                setEvent({
                    id: { networkId: e.networkId, blockHash: e.blockHash, logIndex: e.logIndex },
                    key: 'returnValues',
                    value: returnValues,
                }),
            );
        }
    });

    next(action);

    const actionsBatched =
        setActions.length > 0
            ? batchActions(setActions, `${SET_EVENT('returnValues')}/${setActions.length}`)
            : undefined;
    if (actionsBatched) store.dispatch(actionsBatched);
};

export default onUpdate;
