import { select, put, call } from 'typed-redux-saga/macro';
import axios from 'axios';
import networkExists from '../../network/sagas/exists';
import { create, FetchTransactionsAction } from '../actions';
import { selectByIdSingle } from '../selectors';

/** @category Sagas */
export function* fetchTransactions(action: FetchTransactionsAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const account = yield* select(selectByIdSingle, { networkId, address });
    if (!account) yield* put(create({ networkId, address }));

    const network = yield* call(networkExists, networkId);
    const apiUrl = network.explorerApiUrl;
    const apiKey = network.explorerApiKey;
    if (!apiUrl) throw new Error(`Network ${networkId} missing apiUrl`);

    const request = {
        method: 'url',
        url: apiUrl,
        params: {
            module: 'account',
            action: 'txlist',
            address,
            startblock: 0,
            endblock: 99999999,
            page: 1,
            offset: 10,
            sort: 'asc',
            apikey: apiKey,
        },
    };

    //@ts-expect-error
    const response = yield* call(axios, request);
    const transactions: any = response.data?.result;

    //TODO: Create transactions
    console.debug(transactions);
}

export default fetchTransactions;
