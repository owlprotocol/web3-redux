import { select, put, call } from 'typed-redux-saga/macro';
import { batchActions } from 'redux-batched-actions';
import axios from 'axios';
import networkExists from '../../network/sagas/exists';
import { create as createTransaction } from '../../transaction/actions';
import { create, FetchTransactionsAction } from '../actions';
import { selectByIdSingle } from '../selectors';

interface EtherscanTx {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    transactionIndex: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    isError: 0 | 1;
    txreceipt_status: string;
    input: string;
    contractAddress: string;
    cumulativeGasUsed: string;
    gasUsed: string;
    confirmations: string;
}

/** @category Sagas */
export function* fetchTransactions(action: FetchTransactionsAction) {
    const { payload } = action;
    const { networkId, address, startblock, endblock, page, offset, sort } = payload;

    const account = yield* select(selectByIdSingle, { networkId, address });
    if (!account) yield* put(create({ networkId, address }));

    const network = yield* call(networkExists, networkId);
    const apiUrl = network.explorerApiUrl;
    const apiKey = network.explorerApiKey;
    if (!apiUrl) throw new Error(`Network ${networkId} missing apiUrl`);

    const request = {
        method: 'get',
        url: apiUrl,
        params: {
            module: 'account',
            action: 'txlist',
            address,
            startblock: startblock ?? 0,
            endblock: endblock ?? 99999999,
            page: page ?? 1,
            offset: offset ?? 10,
            sort: sort ?? 'asc',
            apikey: apiKey,
        },
    };

    //@ts-expect-error
    const response = yield* call(axios, request);
    const transactions = response.data?.result as EtherscanTx[];
    const transactionsCreate = transactions.map((t) =>
        createTransaction({
            ...t,
            networkId,
            blockNumber: parseInt(t.blockNumber),
            nonce: parseInt(t.nonce),
            transactionIndex: parseInt(t.transactionIndex),
            gas: parseInt(t.gas),
            confirmations: parseInt(t.confirmations),
        }),
    );

    const transactionsCreateBatch = batchActions(
        transactionsCreate,
        `${createTransaction.type}/${transactions.length}`,
    );

    yield* put(transactionsCreateBatch);
}

export default fetchTransactions;
