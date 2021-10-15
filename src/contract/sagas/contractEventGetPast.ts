import { put, all, call, fork, CallEffect } from 'redux-saga/effects';
import { EventData } from 'web3-eth-contract';
import { create as createEvent } from '../../contractevent/actions';
import { Contract } from '../model';
import { EventGetPastAction, EVENT_GET_PAST } from '../actions';
import contractExists from './contractExists';
import networkExists from '../../network/sagas/networkExists';

const EVENT_GET_PAST_ERROR = `${EVENT_GET_PAST}/ERROR`;

function* eventGetPastInRange(networkId: string, address: string, name: string, task: CallEffect<EventData[]>) {
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

    yield all(putActions);
}

function* eventGetPast(action: EventGetPastAction) {
    try {
        const { payload } = action;
        const networkId = payload.networkId;
        const address = payload.address;

        //@ts-ignore
        const network: Network = yield call(networkExists, networkId);
        //@ts-ignore
        const contract: Contract = yield call(contractExists, networkId, address);

        const web3Contract = contract.web3Contract!;
        const eventName = payload.eventName;
        const filter = payload.filter;
        let fromBlock: number;
        if (!payload.fromBlock || payload.fromBlock == 'earliest') {
            fromBlock = 0;
        } else if (typeof payload.fromBlock === 'string') {
            fromBlock = parseInt(payload.fromBlock);
        } else {
            fromBlock = payload.fromBlock;
        }

        let toBlock: number | string;
        if (!payload.toBlock || payload.toBlock === 'latest') {
            toBlock = 'latest';
        } else if (typeof payload.toBlock === 'string') {
            toBlock = parseInt(payload.toBlock);
        } else {
            toBlock = payload.toBlock;
        }

        const blockBatch = payload.blockBatch ?? 100;
        let blockNo;
        if (toBlock === 'latest') {
            //@ts-ignore
            blockNo = yield call(network.web3.eth.getBlockNumber);
        }

        //Use a multiple calls to get incremental batches of updates, starting from latest
        const rangeLastBlock = toBlock === 'latest' ? blockNo : toBlock;
        const ranges = [];
        for (let i = rangeLastBlock; i > fromBlock; i -= blockBatch) {
            const range = { fromBlock: i - blockBatch + 1, toBlock: i };
            ranges.push(range);
        }

        //Override toBlock parameter to account for new blocks
        if (toBlock === 'latest') ranges[0].toBlock = 'latest';
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
            yield fork(eventGetPastInRange, networkId, address, eventName, task);
        }
    } catch (error) {
        console.error(error);
        yield put({
            type: EVENT_GET_PAST_ERROR,
            error,
            action,
        });
    }
}

export default eventGetPast;
