import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import { useContract } from './useContract.js';
import { map } from '../../utils/lodash/index.js';

import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';
import { network1336 } from '../../network/data.js';
import expectThrowsAsync from '../../test/expectThrowsAsync.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/hooks/useContract.test.tsx`, () => {
    let store: StoreType;
    let address: string;

    let wrapper: any;
    before(async () => {
        const accounts = await web3.eth.getAccounts();
        address = accounts[0];
    });

    beforeEach(() => {
        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
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

        //No additional re-renders frm background tasks
        await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
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

        //No additional re-renders frm background tasks
        await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
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

        //No additional re-renders frm background tasks
        await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
    });
});
