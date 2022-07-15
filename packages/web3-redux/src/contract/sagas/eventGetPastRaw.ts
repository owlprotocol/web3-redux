import { put, call, select } from 'typed-redux-saga';
import { EventData } from 'web3-eth-contract';
import { create as createError } from '../../error/actions/index.js';
import eventGetPastRawAction, { EventGetPastRawAction, EVENT_GET_PAST_RAW } from '../actions/eventGetPastRaw.js';
import takeEveryBuffered from '../../sagas/takeEveryBuffered.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';
import ContractEventCRUD from '../../contractevent/crud.js';
import ContractEventQueryCRUD from '../../contracteventquery/crud.js';

const EVENT_GET_PAST_RAW_ERROR = `${EVENT_GET_PAST_RAW}/ERROR`;

export function* eventGetPastRaw(action: EventGetPastRawAction) {
    const { payload } = action;
    const { networkId, address, eventName, filter, fromBlock, toBlock } = payload;

    try {
        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
        if (!network) throw new Error(`Network ${networkId} undefined`);

        const web3 = network.web3 ?? network.web3Sender;
        if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

        const contract = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
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
            filterHash: JSON.stringify(filter),
        });

        const existingEventQuery = yield* call(ContractEventQueryCRUD.db.get, eventQuery);
        if (!existingEventQuery) {
            //No cached query
            let events: EventData[];
            if (filter) {
                //@ts-expect-error
                events = yield* call([web3Contract, web3Contract.getPastEvents], eventName, {
                    filter,
                    fromBlock,
                    toBlock,
                });
            } else {
                //@ts-expect-error
                events = yield* call([web3Contract, web3Contract.getPastEvents], eventName, {
                    fromBlock,
                    toBlock,
                });
            }

            const eventIds = events.map((e) => {
                return { networkId, blockNumber: e.blockNumber, logIndex: e.logIndex };
            });
            const updateQuery = ContractEventQueryCRUD.actions.create(
                {
                    ...eventQuery,
                    events: eventIds,
                },
                action.meta.uuid,
            );
            yield* put(updateQuery);

            if (events.length > 0) {
                const batch = ContractEventCRUD.actions.createBatched(
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
        const updateQuery = ContractEventQueryCRUD.actions.create(
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
            const blockRange = toBlock - fromBlock;
            let midpoint = Math.floor(fromBlock + blockRange / 2);
            for (const x of [10000000, 1000000, 100000, 10000, 1000, 100, 10]) {
                if (midpoint - (midpoint % x) > fromBlock) {
                    midpoint = midpoint - (midpoint % x);
                    break;
                }
            }
            let endpoint = toBlock;
            for (const x of [10000000, 1000000, 100000, 10000, 1000, 100, 10]) {
                if (endpoint - (endpoint % x) > midpoint) {
                    endpoint = endpoint - (endpoint % x);
                    break;
                }
            }

            if (blockRange > 2) {
                const action1 = eventGetPastRawAction({
                    networkId,
                    address,
                    eventName,
                    fromBlock,
                    toBlock: midpoint,
                    filter,
                });
                const action2 = eventGetPastRawAction({
                    networkId,
                    address,
                    eventName,
                    fromBlock: midpoint,
                    toBlock: endpoint,
                    filter,
                });

                if (toBlock != endpoint) {
                    const action3 = eventGetPastRawAction({
                        networkId,
                        address,
                        eventName,
                        fromBlock: endpoint,
                        toBlock: toBlock,
                        filter,
                    });
                    yield* put(action3);
                }

                yield* put(action2);
                yield* put(action1);
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
