import { put, all, call, fork } from 'typed-redux-saga/macro';
import { EventData } from 'web3-eth-contract';
import { create as createEvent } from '../../contractevent/actions';
import { EventGetPastAction, EVENT_GET_PAST } from '../actions';
import networkExists from '../../network/sagas/exists';

import { getId } from '../model';
import exists from './exists';

const EVENT_GET_PAST_ERROR = `${EVENT_GET_PAST}/ERROR`;

function* eventGetPastInRange(networkId: string, address: string, name: string, task: EventData[]) {
    //@ts-ignore
    const events = yield task;
    const putActions = events.map((event: any) => {
        return put(
            createEvent({
                ...event,
                networkId,
                address,
                name,
            }),
        );
    });

    yield* all(putActions);
}

function* eventGetPast(action: EventGetPastAction) {
    try {
        const { payload } = action;
        const { networkId, address, eventName, filter, fromBlock, toBlock, blockBatch } = payload;
        const id = getId({ networkId, address });

        const network = yield* call(networkExists, networkId);
        if (!network.web3) throw new Error(`Network ${networkId} missing web3`);
        const contract = yield* call(exists, id);

        //Ranged queries
        let rangeLastBlock;
        if (!toBlock || toBlock === 'latest') {
            rangeLastBlock = yield* call(network.web3.eth.getBlockNumber);
        } else {
            rangeLastBlock = toBlock;
        }

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

        const web3Contract = contract.web3Contract!;
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
    } catch (error) {
        console.error(error);
        yield* put({
            type: EVENT_GET_PAST_ERROR,
            error,
            action,
        });
    }
}

export default eventGetPast;
