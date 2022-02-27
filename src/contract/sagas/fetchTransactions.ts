import { select, put, call } from 'typed-redux-saga/macro';
import { batchActions } from 'redux-batched-actions';
import { AxiosResponse } from 'axios';

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
    const apiClient = network.explorerApiClient;
    if (!apiClient) throw new Error(`Network ${networkId} missing apiClient`);

    const request = {
        params: {
            module: 'account',
            action: 'txlist',
            address,
            startblock: startblock ?? 0,
            endblock: endblock ?? 99999999,
            page: page ?? 1,
            offset: offset ?? 10,
            sort: sort ?? 'desc', //Default fetches latest tx
        },
    };

    const response = (yield* call(apiClient.get as any, request)) as AxiosResponse;
    const transactions = response.data?.result as EtherscanTx[];
    if (transactions) {
        const transactionsCreate = transactions.map((t) =>
            createTransaction({
                ...t,
                networkId,
                blockNumber: parseInt(t.blockNumber),
                nonce: parseInt(t.nonce),
                transactionIndex: parseInt(t.transactionIndex),
                gas: parseInt(t.gas),
                gasUsed: parseInt(t.gasUsed),
                cumulativeGasUsed: parseInt(t.cumulativeGasUsed),
                confirmations: parseInt(t.confirmations),
                timeStamp: parseInt(t.timeStamp),
            }),
        );

        const transactionsCreateBatch = batchActions(
            transactionsCreate,
            `${createTransaction.type}/${transactions.length}`,
        );

        yield* put(transactionsCreateBatch);
    } else {
        throw new Error('Etherscan fetchTransactions response.data.result undefined');
    }
}

export default fetchTransactions;
