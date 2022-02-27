import { assert } from 'chai';
import axios from 'axios';
import moxios from 'moxios';

import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create as createNetwork } from '../../network/actions';
import { selectByIdMany } from '../../transaction/selectors';
import { fetchTransactions } from '../actions';
import { sleep } from '../../utils';

describe('contract/sagas/fetchTransactions.test.ts', () => {
    let store: StoreType;
    const address = '0xddBd2B932c763bA5b1b7AE3B362eac3e8d40121A'; //Etherscan example
    const client = axios.create({ baseURL: 'https://api.etherscan.io/api' });

    before(async () => {
        //Moxios install
        moxios.install(client);
    });

    after(() => {
        moxios.uninstall(client);
    });

    beforeEach(async () => {
        ({ store } = createStore());
        store.dispatch(
            createNetwork({
                networkId,
                explorerApiClient: client,
            }),
        );
    });

    it('fetchTransactions()', async () => {
        store.dispatch(fetchTransactions({ networkId, address }));

        await moxios.wait(() => {
            const request = moxios.requests.mostRecent();

            assert.deepEqual(request.config.params, {
                module: 'account',
                action: 'txlist',
                address,
                startblock: 0,
                endblock: 99999999,
                page: 1,
                offset: 10,
                sort: 'desc',
            });
            request.respondWith({
                status: 200,
                response: {
                    result: [
                        {
                            blockNumber: '11616713',
                            timeStamp: '1610143998',
                            hash: '0xbd633ba440d70d9132f17c9e34a64f9c0cb1fea014d927ae2fdcb2199de01c70',
                            nonce: '23',
                            blockHash: '0x5c5b750db80cf35e8fdc063503c4856824da5be440314ce9c98332f8edde33b7',
                            transactionIndex: '236',
                            from: '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a',
                            to: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
                            value: '0',
                            gas: '52346',
                            gasPrice: '90000000000',
                            isError: '0',
                            txreceipt_status: '1',
                            input: '0xa9059cbb000000000000000000000000c88fe66bcc71cf840c6a9aae4892c07a38b9e6260000000000000000000000000000000000000000000000a69671228c57640000',
                            contractAddress: '',
                            cumulativeGasUsed: '10008235',
                            gasUsed: '52346',
                            confirmations: '2671802',
                        },
                    ],
                },
            });
        });

        await sleep(100);

        const transactions = selectByIdMany(store.getState());
        //https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken
        assert.equal(transactions.length, 1, 'missing transactions fetched by Etherscan');
    });
});
