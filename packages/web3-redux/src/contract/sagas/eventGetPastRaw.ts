import { put, call, select } from 'typed-redux-saga';
import { EventData } from 'web3-eth-contract';
import { EventGetPastRawAction, EVENT_GET_PAST_RAW } from '../actions/eventGetPastRaw.js';
import takeEveryBuffered from '../../sagas/takeEveryBuffered.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';
import ContractEventCRUD from '../../contractevent/crud.js';

const EVENT_GET_PAST_RAW_ERROR = `${EVENT_GET_PAST_RAW}/ERROR`;

export function* eventGetPastRaw(action: EventGetPastRawAction) {
    try {
        const { payload } = action;
        const { networkId, address, eventName, filter, fromBlock, toBlock, max } = payload;

        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
        if (!network) throw new Error(`Network ${networkId} undefined`);

        const web3 = network.web3 ?? network.web3Sender;
        if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

        const contract = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
        if (!contract) throw new Error(`Contract ${ContractCRUD.validateId({ networkId, address })} undefined`);

        const web3Contract = contract.web3Contract ?? contract.web3SenderContract;
        if (!web3Contract)
            throw new Error(`Contract ${ContractCRUD.validateId({ networkId, address })} has no web3 contract`);

        /**TODO */
        //const indexedEvents = (yield* select(selectEventsByIndex, id)) ?? [];
        //TODO: filter
        const existingEvents = yield* call(ContractEventCRUD.db.where, { networkId, address, name: eventName });
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
                const action = ContractEventCRUD.actions.createBatched(
                    events.map((event: any) => {
                        return {
                            ...event,
                            networkId,
                            address,
                            name: eventName,
                        };
                    }),
                );
                yield* put(action);
            }
        }
    } catch (error) {
        yield* put({
            id: action.meta.uuid,
            stack: (error as Error).stack,
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
