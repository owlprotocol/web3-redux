import { assert } from 'chai';
import { name } from '../common';
import WETH from '../../abis/WETH.json';

import { sleep } from '../../utils';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create as createNetwork } from '../../network';
import { selectByIdSingle as selectContract } from '../selectors';
import { fetchAbi as fetchAbiAction } from '../actions';
import { ETHERSCAN_API_KEY } from '../../environment';

describe(`${name}.sagas.fetchAbi`, () => {
    let store: StoreType;
    const address = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; //WETH contract

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

    describe('fetchAbi', () => {
        it('()', async () => {
            store.dispatch(
                fetchAbiAction({
                    networkId,
                    address,
                }),
            );
            await sleep(2000);
            //Selector
            const contract = selectContract(store.getState(), { networkId, address });
            assert.deepEqual(contract?.abi, WETH.abi as any, 'contract.abi != WETH.abi');
        });
    });
});
