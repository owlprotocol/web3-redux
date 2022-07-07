import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import Web3 from 'web3';
import jsdom from 'mocha-jsdom';
import { useContract } from './useContract.js';
import { map } from '../../utils/lodash/index.js';
import { getWeb3Provider } from '../../test/index.js';

import { createAction as createNetwork } from '../../network/actions/index.js';

import { name } from '../common.js';
import { networkId } from '../../test/data.js';
import { createStore, StoreType } from '../../store.js';


describe(`${name}/hooks/useContract.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let web3: Web3;
    let address: string;

    let wrapper: any;
    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        address = accounts[0];
    });

    beforeEach(() => {
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(ContractCRUD.actions.create({ networkId, address }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    it('getBalance', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useContract(networkId, address, undefined, { getBalance: 'once' }),
            {
                wrapper,
            },
        );

        await waitForNextUpdate();
        const expected = await web3.eth.getBalance(address);
        assert.equal(result.current?.balance, expected, 'result.current.balance');
        assert.deepEqual(map(result.all, 'balance'), [undefined, expected], 'result.all');
    });

    it('getNonce', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useContract(networkId, address, undefined, { getNonce: 'once' }),
            {
                wrapper,
            },
        );

        await waitForNextUpdate();
        const expected = await web3.eth.getTransactionCount(address);
        assert.equal(result.current?.nonce, expected, 'result.current.nonce');
        assert.deepEqual(map(result.all, 'nonce'), [undefined, expected], 'result.all');
    });

    it('getCode', async () => {
        const { result, waitForNextUpdate } = renderHook(
            () => useContract(networkId, address, undefined, { getCode: true }),
            {
                wrapper,
            },
        );

        await waitForNextUpdate();
        assert.equal(result.current?.code, '0x', 'result.current.nonce');
        assert.deepEqual(map(result.all, 'code'), [undefined, '0x'], 'result.all');
    });
});
