import { put, call } from 'typed-redux-saga';
import { EventData } from 'web3-eth-contract';
import loadContract from './loadContract.js';
import { splitBucket } from './eventGetPast.js';
import { create as createError } from '../../error/actions/index.js';
import eventGetPastRawAction, { EventGetPastRawAction, EVENT_GET_PAST_RAW } from '../actions/eventGetPastRaw.js';
import takeEveryBuffered from '../../sagas/takeEveryBuffered.js';
import ContractCRUD from '../crud.js';
import ContractEventCRUD from '../../contractevent/crud.js';
import ContractEventQueryCRUD from '../../contracteventquery/crud.js';

const EVENT_GET_PAST_RAW_ERROR = `${EVENT_GET_PAST_RAW}/ERROR`;

export function* eventGetPastRaw(action: EventGetPastRawAction) {
    const { payload } = action;
    const { networkId, address, eventName, filter, fromBlock, toBlock } = payload;

    try {
        const contract = yield* call(loadContract, { networkId, address });
        if (!contract) throw new Error(`Contract ${ContractCRUD.validateId({ networkId, address })} undefined`);

        const web3Contract = contract.web3Contract ?? contract.web3SenderContract;
        if (!web3Contract)
            throw new Error(`Contract ${ContractCRUD.validateId({ networkId, address })} has no web3 contract`);

        const eventQuery = ContractEventQueryCRUD.validate({
            networkId,
            address,
            name: eventName,
            fromBlock,
            toBlock,
            filterHash: filter ? JSON.stringify(filter) : '',
        });

        const existingEventQuery = yield* call(ContractEventQueryCRUD.db.get, eventQuery);
        if (!existingEventQuery) {
            //No cached query
            let events: EventData[];
            if (filter) {
                events = yield* call([web3Contract, web3Contract.getPastEvents], eventName, {
                    filter,
                    fromBlock,
                    toBlock,
                });
            } else {
                events = yield* call([web3Contract, web3Contract.getPastEvents], eventName, {
                    fromBlock,
                    toBlock,
                });
            }

            const eventIds = events.map((e) => {
                return { networkId, blockNumber: e.blockNumber, logIndex: e.logIndex };
            });
            const updateQuery = ContractEventQueryCRUD.actions.upsert(
                {
                    ...eventQuery,
                    events: eventIds,
                },
                action.meta.uuid,
            );
            yield* put(updateQuery);

            if (events.length > 0) {
                const batch = ContractEventCRUD.actions.putBatched(
                    events.map((event: any) => {
                        return {
                            ...event,
                            networkId,
                            address,
                            name: eventName,
                        };
                    }),
                    action.meta.uuid,
                );
                yield* put(batch);
            }
        }
    } catch (error) {
        const err = error as Error;
        yield* put(
            createError(
                {
                    id: action.meta.uuid,
                    errorMessage: err.message,
                    stack: err.stack,
                    type: EVENT_GET_PAST_RAW_ERROR,
                },
                action.meta.uuid,
            ),
        );

        const eventQuery = ContractEventQueryCRUD.validate({
            networkId,
            address,
            name: eventName,
            fromBlock,
            toBlock,
            filterHash: JSON.stringify(filter),
        });

        //Update query cache
        const updateQuery = ContractEventQueryCRUD.actions.upsert(
            {
                ...eventQuery,
                errorId: action.meta.uuid,
            },
            action.meta.uuid,
        );
        yield* put(updateQuery);

        //Returned error: query returned more than 10000 results
        if (err.message === 'Returned error: query returned more than 10000 results') {
            //Dispatch split block query
            const gen = splitBucket(fromBlock, toBlock);
            for (const { from, to } of gen) {
                yield* put(
                    eventGetPastRawAction(
                        {
                            networkId,
                            address,
                            eventName,
                            filter,
                            fromBlock: from,
                            toBlock: to,
                        },
                        action.meta.uuid,
                    ),
                );
            }
        }
    }
}

export function* watchEventGetPastRaw() {
    yield takeEveryBuffered(EVENT_GET_PAST_RAW, eventGetPastRaw, {
        bufferSize: 5,
        bufferBatchTimeout: 200,
        bufferCompletionTimeout: 5000,
    });
}

export default watchEventGetPastRaw;
