import { put, call, select } from 'typed-redux-saga';
import { batchActions } from 'redux-batched-actions';
import { EventData } from 'web3-eth-contract';
import exists from './exists.js';
import { create as createEvent } from '../../contractevent/actions/index.js';
import networkExists from '../../network/sagas/exists.js';

import { getId } from '../model/index.js';
import { EventGetPastRawAction, EVENT_GET_PAST_RAW } from '../actions/eventGetPastRaw.js';
import takeEveryBuffered from '../../sagas/takeEveryBuffered.js';
import selectContractEvents from '../selectors/selectContractEventsById.js';

const EVENT_GET_PAST_RAW_ERROR = `${EVENT_GET_PAST_RAW}/ERROR`;

export function* eventGetPastRaw(action: EventGetPastRawAction) {
    try {
        const { payload } = action;
        const { networkId, address, eventName, filter, fromBlock, toBlock, max } = payload;
        const id = getId({ networkId, address });

        const network = yield* call(networkExists, networkId);
        if (!network.web3) throw new Error(`Network ${networkId} missing web3`);
        const contract = yield* call(exists, { networkId, address });

        //Contract
        const web3Contract = contract.web3Contract ?? contract.web3SenderContract;
        if (!web3Contract) throw new Error(`Contract ${id} has no web3 contract`);

        const existingEvents = (yield* select(selectContractEvents, { networkId, address }, eventName, filter)) ?? [];
        if (existingEvents.length < max) {
            //blocking call, choose batch size accordingly
            //@ts-ignore
            const events: EventData[] = yield* call([web3Contract, web3Contract.getPastEvents], eventName, {
                ...filter,
                fromBlock,
                toBlock,
            });

            if (events.length > 0) {
                const actions = events.map((event: any) => {
                    return createEvent({
                        ...event,
                        networkId,
                        address,
                        name: eventName,
                    });
                });
                const batch = batchActions(actions, `${createEvent.type}/${actions.length}`);
                yield* put(batch);
            }
        } else {
            throw new Error(`Max ${networkId}-${address} ${eventName} reached! existingEvents.length >= ${max}`);
        }
    } catch (error) {
        yield* put({
            id: action.meta.uuid,
            error: error as Error,
            errorMessage: (error as Error).message,
            type: EVENT_GET_PAST_RAW_ERROR,
        });
    }
}

export function* watchEventGetPastRaw() {
    yield takeEveryBuffered(EVENT_GET_PAST_RAW, eventGetPastRaw, {
        bufferSize: 1,
        bufferBatchTimeout: 200,
        bufferCompletionTimeout: 5000,
    });
}

export default watchEventGetPastRaw;
