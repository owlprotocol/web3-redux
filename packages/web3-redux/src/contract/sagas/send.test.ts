import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { cloneDeep } from 'lodash';

import { getWeb3Provider } from '../../test/index.js';
import { name } from '../common.js';
import { networkId } from '../../test/data.js';

import * as BlockNumberArtifact from '../../abis/BlockNumber.json';
import { sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import { create as createNetwork } from '../../network/index.js';

import { create as createAction, send as sendAction } from '../actions/index.js';

describe(`${name}.sagas.send`, () => {
    let web3: Web3; //Web3 loaded from store
    let web3Sender: Web3;
    let accounts: string[];
    let store: StoreType;
    let web3Contract: Web3Contract;

    let address: string;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        //@ts-ignore
        web3Sender = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3, web3Sender }));

        const tx = new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as AbiItem[]).deploy({
            data: BlockNumberArtifact.bytecode,
        });
        const gas = await tx.estimateGas();
        web3Contract = await tx.send({ from: accounts[0], gas, gasPrice: '875000000' });
        address = web3Contract.options.address;

        store.dispatch(
            createAction({
                networkId,
                address,
                abi: cloneDeep(BlockNumberArtifact.abi) as AbiItem[],
            }),
        );
    });

    describe('send', () => {
        it('send()', async () => {
            store.dispatch(
                sendAction({
                    networkId,
                    from: accounts[0],
                    address,
                    method: 'setValue',
                    args: [42],
                }),
            );

            await sleep(300);

            const value = await web3Contract.methods.getValue().call();
            assert.equal(value, 42, 'setValue() did not work!');
        });
    });
});
