import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';

// eslint-disable-next-line import/no-unresolved
import { BlockNumber } from '../../types/web3/BlockNumber';

import { name } from '../common';
import { networkId } from '../../test/data';
import { StoreType } from '../../store';
import { useContractCall, contractCallHookFactory } from '../../contract/hooks';
// eslint-disable-next-line import/no-unresolved
import { beforeFn, beforeEachFn, deployBlockNoContract } from './index.test';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}.hooks.useContractCall`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let web3Contract: Web3Contract;
    let address: string;

    before(async () => {
        ({ web3, accounts } = await beforeFn());
    });

    beforeEach(async () => {
        ({ store, wrapper } = beforeEachFn({ web3 }));
        ({ address, web3Contract } = await deployBlockNoContract({ web3, store, from: accounts[0] }));
    });

    describe('useContractCall', () => {
        it('(networkId, address, method)', async () => {
            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, address, 'getValue', [], { sync: 'once' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();

            const currentCall = result.current[0];
            const allCalls = result.all.map((x) => (x as any[])[0]);
            assert.equal(currentCall, '42', 'result.current');
            assert.deepEqual(allCalls, [undefined, '42'], 'result.all');
        });
    });

    describe('contractCallHookFactory(method)', () => {
        it('(networkId, address)', async () => {
            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            const useGetValue = contractCallHookFactory<BlockNumber, 'getValue'>('getValue');

            const { result, waitForNextUpdate } = renderHook(
                () => useGetValue(networkId, web3Contract.options.address, [], { sync: 'once' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();

            const currentCall = result.current[0];
            const allCalls = result.all.map((x) => (x as any[])[0]);
            assert.equal(currentCall, '42', 'result.current');
            assert.deepEqual(allCalls, [undefined, '42'], 'result.all');
        });
    });
});
