import { put, call, select } from 'typed-redux-saga';
import { EventData } from 'web3-eth-contract';
import { createBatchedAction as createEventBatched } from '../../contractevent/actions/index.js';

import { selectByIdSingle as selectNetwork } from '../../network/selectors/index.js';
import { getId } from '../model/index.js';
import { EventGetPastRawAction, EVENT_GET_PAST_RAW } from '../actions/eventGetPastRaw.js';
import takeEveryBuffered from '../../sagas/takeEveryBuffered.js';
import selectContractEvents from '../selectors/selectContractEventsById.js';
import selectEventsByIndex from '../../contracteventindex/selectors/selectEvents.js';
import { selectByIdSingle } from '../selectors/index.js';

const EVENT_GET_PAST_RAW_ERROR = `${EVENT_GET_PAST_RAW}/ERROR`;

export function* eventGetPastRaw(action: EventGetPastRawAction) {
    try {
        const { payload } = action;
        const { id, networkId, address, eventName, filter, fromBlock, toBlock, max } = payload;
        const contractId = getId({ networkId, address });

        const network = yield* select(selectNetwork, networkId);
        if (!network) throw new Error(`Network ${networkId} undefined`);

        const contract = yield* select(selectByIdSingle, { networkId, address });
        if (!contract) throw new Error(`Contract ${contractId} undefined`);

        const web3Contract = contract.web3Contract ?? contract.web3SenderContract;
        if (!web3Contract) throw new Error(`Contract ${contractId} has no web3 contract`);

        //const indexedEvents = (yield* select(selectEventsByIndex, id)) ?? [];
        const existingEvents = (yield* select(selectContractEvents, { networkId, address }, eventName, filter)) ?? [];
        /*
        if (indexedEvents.length > 0) {
            throw new Error(`Cached ${id} reached! indexedEvents.length >= 0`);
        } else
        */
        if (max && existingEvents.length >= max) {
            throw new Error(
                `Max ${networkId}-${address} ${eventName} ${JSON.stringify(
                    filter,
                )} reached! existingEvents.length >= ${max}`,
            );
        } else {
            //blocking call, choose batch size accordingly
            //@ts-ignore
            const events: EventData[] = yield* call([web3Contract, web3Contract.getPastEvents], eventName, {
                ...filter,
                fromBlock,
                toBlock,
            });

            if (events.length > 0) {
                const action = createEventBatched(
                    events.map((event: any) => {
                        return {
                            ...event,
                            networkId,
                            address,
                            name: eventName,
                            indexIds: [id],
                        };
                    }),
                );
                yield* put(action);
            }
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
