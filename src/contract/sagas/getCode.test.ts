import { assert } from 'chai';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import Ganache from 'ganache-core';
import BlockNumber from '../../abis/BlockNumber.json';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create as createNetwork } from '../../network/actions';
import { Contract } from '../model/interface';
import { name } from '../common';
import { selectByIdSingle } from '../selectors';
import { create as createAction, getCode as getCodeAction } from '../actions';
import { sleep } from '../../utils';

describe(`${name}.integration`, () => {
    let store: StoreType;
    let web3: Web3;

    let item: Contract;

    before(async () => {
        const provider = Ganache.provider({
            networkId: parseInt(networkId),
        });
        //@ts-ignore
        web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        item = { networkId, address: accounts[0] };
    });

    beforeEach(() => {
        store = createStore();
        store.dispatch(createNetwork({ networkId, web3 }));
        store.dispatch(createAction(item));
    });

    describe('getCode', () => {
        it('EOA - No-code', async () => {
            store.dispatch(getCodeAction(item));
            await sleep(100);

            const account = selectByIdSingle(store.getState(), item);
            assert.equal(account?.code, '0x', 'code should be empty 0x');
        });

        it('Smart Contract - Code', async () => {
            //Deploy contract
            const tx = new web3.eth.Contract(BlockNumber.abi as AbiItem[]).deploy({
                data: BlockNumber.bytecode,
            });
            const gas = await tx.estimateGas();
            const web3Contract = await tx.send({ from: item.address, gas, gasPrice: '10000' });
            const address = web3Contract.options.address;

            await sleep(100);
            store.dispatch(getCodeAction({ networkId, address }));
            await sleep(100);

            const account = selectByIdSingle(store.getState(), { networkId, address });
            assert.equal(account?.code, '0x' + BlockNumber.deployedBytecode, 'smart contract code');
        });
    });
});