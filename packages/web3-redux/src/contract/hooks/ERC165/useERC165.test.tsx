import { assert } from 'chai';
import { Provider } from 'react-redux';
import Web3 from 'web3';
import { renderHook } from '@testing-library/react-hooks';

import useERC165 from './useERC165.js';
import { getWeb3Provider, expectThrowsAsync } from '../../../test/index.js';

import { name } from '../../common.js';
import { networkId } from '../../../test/data.js';
import { createStore, StoreType } from '../../../store.js';

import NetworkCRUD from '../../../network/crud.js';
import ContractCRUD from '../../crud.js';

import { ERC165 } from '../../../typechain/ERC165.js';
import { ERC165Artifact } from '../../../abis/index.js';

describe(`${name}/hooks/useERC165.test.tsx`, () => {


    let store: StoreType;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let web3Contract: ERC165;
    let address: string;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);

        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        web3Contract = (await new web3.eth.Contract(ERC165Artifact.abi as any)
            .deploy({
                data: ERC165Artifact.bytecode,
            })
            .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' })) as unknown as ERC165;
        address = web3Contract.options.address;

        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        store.dispatch(
            ContractCRUD.actions.create({
                networkId,
                address,
                abi: ERC165Artifact.abi as any,
            }),
        );
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useERC165()', async () => {
        it('supportsInterface(): false', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useERC165(networkId, address, '0x00000000'), {
                wrapper,
            });

            assert.equal(result.all.length, 1, 'result.all.length');
            await waitForNextUpdate();

            const value = result.current;
            assert.isFalse(value, 'result.current');
            assert.deepEqual(result.all, [undefined, false], 'result.all');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it('supportsInterface(): true', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useERC165(networkId, address, '0x01ffc9a7'), {
                wrapper,
            });

            assert.equal(result.all.length, 1, 'result.all.length');
            await waitForNextUpdate();

            const value = result.current;
            assert.isTrue(value, 'result.current');
            assert.deepEqual(result.all, [undefined, true], 'result.all');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});
