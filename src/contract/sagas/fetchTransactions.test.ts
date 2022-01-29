import { assert } from 'chai';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create as createNetwork } from '../../network/actions';
import { selectByIdMany } from '../../transaction/selectors';
import { name } from '../common';
import { fetchTransactions } from '../actions';
import { sleep } from '../../utils';
import { ETHERSCAN_API_KEY } from '../../environment';

describe(`${name}.sagas.fetchTransactions`, () => {
    let store: StoreType;
    const address = '0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a'; //Etherscan example

    beforeEach(async () => {
        store = createStore();
        store.dispatch(
            createNetwork({
                networkId,
                explorerApiUrl: 'https://api.etherscan.io/api',
                explorerApiKey: ETHERSCAN_API_KEY,
            }),
        );
    });

    it('fetchTransactions()', async () => {
        store.dispatch(fetchTransactions({ networkId, address, startblock: 1 })); //skip GENESIS
        await sleep(2000);

        const transactions = selectByIdMany(store.getState());
        //https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken
        assert.equal(transactions.length, 10, 'missing 10 transactions fetched by Etherscan');
    });
});
