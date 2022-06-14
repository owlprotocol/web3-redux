import { put, call, fork } from 'typed-redux-saga';
import { batchActions } from 'redux-batched-actions';
import { EventData } from 'web3-eth-contract';
import exists from './exists.js';
import { create as createEvent } from '../../contractevent/actions/index.js';
import { EventGetPastAction, EVENT_GET_PAST } from '../actions/index.js';
import networkExists from '../../network/sagas/exists.js';

import { getId } from '../model/index.js';

const EVENT_GET_PAST_ERROR = `${EVENT_GET_PAST}/ERROR`;

function* eventGetPastInRange(networkId: string, address: string, name: string, task: EventData[]) {
    //@ts-ignore
    const events: any[] = yield task;

    if (events.length > 0) {
        const actions = events.map((event: any) => {
            return createEvent({
                ...event,
                networkId,
                address,
                name,
            });
        });
        const batch = batchActions(actions, `${createEvent.type}/${actions.length}`);

        yield* put(batch);
    }
}

export function* eventGetPast(action: EventGetPastAction) {
    try {
        const { payload } = action;
        const { networkId, address, eventName, filter, fromBlock, toBlock, blockBatch, max } = payload;
        const id = getId({ networkId, address });

        const network = yield* call(networkExists, networkId);
        if (!network.web3) throw new Error(`Network ${networkId} missing web3`);
        const contract = yield* call(exists, { networkId, address });

        //Contract
        const web3Contract = contract.web3Contract ?? contract.web3SenderContract;
        if (!web3Contract) throw new Error(`Contract ${id} has no web3 contract`);

        //Ranged queries
        let eventCount = 0;
        let currToBlock;
        if (!toBlock || toBlock === 'latest') {
            currToBlock = yield* call(network.web3.eth.getBlockNumber);
        } else {
            currToBlock = toBlock;
        }

        let currFromBlock = Math.max(currToBlock - blockBatch - 1, fromBlock); //lower-bound fromBlock=0

        while (currFromBlock >= fromBlock && (eventCount < max || !max)) {
            console.debug(
                `${networkId}-${address}.${eventName} ${currFromBlock}-${currToBlock} ${JSON.stringify(filter)}`,
            );
            try {
                //blocking call, choose batch size accordingly
                //@ts-ignore
                const events: EventData[] = yield* call([web3Contract, web3Contract.getPastEvents], eventName, {
                    ...filter,
                    fromBlock: currFromBlock,
                    toBlock: currToBlock,
                });
                //create events
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

                //Update loop
                eventCount += events.length;
                currToBlock = Math.max(currToBlock - blockBatch, currFromBlock);
                currFromBlock = Math.max(currToBlock - blockBatch - 1, fromBlock);
                if (currToBlock === currFromBlock) break;
            } catch (error) {
                yield* put({
                    id: action.meta.uuid,
                    error: error as Error,
                    errorMessage: (error as Error).message,
                    type: EVENT_GET_PAST_ERROR,
                });
            }
        }

        /*
        //TODO: use a generator
        //Use a multiple calls to get incremental batches of updates, starting from latest
        const ranges = [];
        for (let i = rangeLastBlock; i > fromBlock; i -= blockBatch) {
            const range = { fromBlock: i - blockBatch + 1, toBlock: i };
            ranges.push(range);
        }

        //Override toBlock parameter to account for new blocks
        //@ts-expect-error
        if (!toBlock || toBlock === 'latest') ranges[0].toBlock = 'latest';
        //Override fromBlock to get correct range for last range
        ranges[ranges.length - 1].fromBlock = fromBlock;

        const eventsPromises = ranges.map((r) => {
            const options: any = { ...r };
            if (filter) options.filter = filter;

            //We use [context, fn] so that this keyword is not null
            return call([web3Contract, web3Contract.getPastEvents], eventName, options);
        });

        for (const task of eventsPromises) {
            //@ts-ignore
            yield* fork(eventGetPastInRange, networkId, address, eventName, task);
        }
        */
    } catch (error) {
        yield* put({
            id: action.meta.uuid,
            error: error as Error,
            errorMessage: (error as Error).message,
            type: EVENT_GET_PAST_ERROR,
        });
    }
}

export default eventGetPast;
