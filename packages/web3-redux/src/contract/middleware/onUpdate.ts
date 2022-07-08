import { AnyAction, Store } from 'redux';

import { coder } from '../../utils/web3-eth-abi/index.js';
import { set as setEvent, SetAction as SetEventAction, SET as SET_EVENT } from '../../contractevent/actions/index.js';

import { selectEvents } from '../../contracteventindex/selectors/index.js';

import { CREATE, UPDATE } from '../actions/index.js';
import { Contract } from '../model/index.js';

/**
 * Middleware for whenever a contract created/updated.
 * Use cases:
 * - Decode events with undefined returnValues that are decodable with a contract abi
 */
export const onUpdate = (store: Store) => (next: (action: AnyAction) => any) => (action: AnyAction) => {
    let contracts: Contract[] = [];
    if (action.type.startsWith(CREATE) || action.type.startsWith(UPDATE)) {
        if (action.meta && action.meta.batch) {
            //Batched actions
            contracts = action.payload.map(({ payload }: { payload: Contract }) => payload);
        } else {
            //Single action
            contracts = [action.payload as Contract];
        }
    }

    //Update events
    const setActions: SetEventAction[] = [];
    const state = store.getState();
    contracts.forEach((c) => {
        const networkId = c.networkId;
        const address = c.address;
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
                setActions.push(
                    setEvent({
                        id: { networkId: e.networkId, blockHash: e.blockHash, logIndex: e.logIndex },
                        key: 'returnValues',
                        value: returnValues,
                    }),
                );
            }
        });
    });

    next(action);

    const actionsBatched =
        setActions.length > 0
            ? batchActions(setActions, `${SET_EVENT('returnValues')}/${setActions.length}`)
            : undefined;
    if (actionsBatched) store.dispatch(actionsBatched);
};

export default onUpdate;
