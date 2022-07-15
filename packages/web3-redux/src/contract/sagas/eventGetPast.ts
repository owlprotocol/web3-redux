import { put, call, select } from 'typed-redux-saga';
import NetworkCRUD from '../../network/crud.js';
import { EventGetPastAction, EVENT_GET_PAST, eventGetPastRaw as eventGetPastRawAction } from '../actions/index.js';
import ContractCRUD from '../crud.js';

const EVENT_GET_PAST_ERROR = `${EVENT_GET_PAST}/ERROR`;

/** Generates batch ranges */
export function* batchGenerator(from: number, to: number, size: number) {
    const initialTo = to;
    const initialFrom = Math.max(to - (to % size), from);
    yield { from: initialFrom, to: initialTo };

    let currTo = initialFrom - 1;
    let currFrom = initialFrom - size;

    while (currFrom >= from - (from % size)) {
        yield { from: currFrom, to: currTo };
        currFrom = currFrom - size;
        currTo = currTo - size;
    }
}

/** Batches event requests into EventGetPastRaw actions */
export function* eventGetPast(action: EventGetPastAction) {
    try {
        const { payload } = action;
        const { networkId, address, eventName, filter, fromBlock, toBlock, blockBatch } = payload;

        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
        if (!network) throw new Error(`Network ${networkId} undefined`);

        const web3 = network.web3 ?? network.web3Sender;
        if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

        const contract = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
        if (!contract) throw new Error(`Contract ${ContractCRUD.validateId({ networkId, address })} undefined`);

        const web3Contract = contract.web3Contract ?? contract.web3SenderContract;
        if (!web3Contract)
            throw new Error(`Contract ${ContractCRUD.validateId({ networkId, address })} has no web3 contract`);

        //Ranged queries
        let toBlockInitial;
        if (!toBlock || toBlock === 'latest') {
            toBlockInitial = yield* call(web3.eth.getBlockNumber);
        } else {
            toBlockInitial = toBlock;
        }

        const gen = batchGenerator(fromBlock, toBlockInitial, blockBatch);
        for (const { from, to } of gen) {
            try {
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
            } catch (error) {
                yield* put({
                    id: action.meta.uuid,
                    stack: (error as Error).stack,
                    errorMessage: (error as Error).message,
                    type: EVENT_GET_PAST_ERROR,
                });
            }
        }
    } catch (error) {
        yield* put({
            id: action.meta.uuid,
            stack: (error as Error).stack,
            errorMessage: (error as Error).message,
            type: EVENT_GET_PAST_ERROR,
        });
    }
}

export default eventGetPast;
