import { select, put, call } from 'typed-redux-saga';
import { AxiosResponse } from 'axios';
import { FetchTransactionsAction } from '../actions/index.js';
import TransactionCRUD from '../../transaction/crud.js';
import ContractCRUD from '../crud.js';
import loadNetwork from '../../network/sagas/loadNetwork.js';

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

    const network = yield* call(loadNetwork, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const apiClient = network?.explorerApiClient;
    if (!apiClient) throw new Error(`Network ${networkId} missing apiClient`);

    const contract = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
    if (!contract) yield* put(ContractCRUD.actions.upsert({ networkId, address }));

    const options = {
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

    const response = (yield* call(apiClient.get as any, '/', options)) as AxiosResponse;
    const transactions = response.data?.result as EtherscanTx[];
    if (transactions && transactions.length > 0) {
        const action = TransactionCRUD.actions.createBatched(
            transactions.map((t) => {
                return {
                    ...t,
                    networkId,
                    blockNumber: t.blockNumber ? parseInt(t.blockNumber) : undefined,
                    nonce: t.nonce ? parseInt(t.nonce) : undefined,
                    transactionIndex: t.transactionIndex ? parseInt(t.transactionIndex) : undefined,
                    gas: t.gas ? parseInt(t.gas) : undefined,
                    gasUsed: t.gasUsed ? parseInt(t.gasUsed) : undefined,
                    cumulativeGasUsed: t.cumulativeGasUsed ? parseInt(t.cumulativeGasUsed) : undefined,
                    confirmations: t.confirmations ? parseInt(t.confirmations) : undefined,
                    timeStamp: t.timeStamp ? parseInt(t.timeStamp) : undefined,
                };
            }),
        );

        yield* put(action);
    } else {
        throw new Error('Etherscan fetchTransactions response.data.result undefined');
    }
}

export default fetchTransactions;
