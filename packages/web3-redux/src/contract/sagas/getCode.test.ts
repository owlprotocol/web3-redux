import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';

import getCode from './getCode.js';
import { cloneDeep } from '../../utils/lodash/index.js';
import { AbiItem } from '../../utils/web3-utils/index.js';

import { sleep } from '../../utils/index.js';

import { BlockNumberArtifact } from '../../abis/index.js';
import { createStore, StoreType } from '../../store.js';

import { name } from '../common.js';

import { getCode as getCodeAction } from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';
import loadNetwork from '../../network/sagas/loadNetwork.js';
import { ADDRESS_0 } from '../../data.js';
import { network1336 } from '../../network/data.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;
const address = ADDRESS_0;
const action = getCodeAction({ networkId, address }, '');

describe(`${name}.integration`, () => {
    describe('unit', () => {
        it('getCode', () => {
            testSaga(getCode, action)
                .next()
                .call(loadNetwork, networkId)
                .next({ networkId, web3 })
                .call(web3.eth.getCode, address)
                .next('0x')
                .put(ContractCRUD.actions.upsert({ networkId, address, code: '0x' }, ''));
        });
    });

    describe('store', () => {
        let store: StoreType;

        beforeEach(() => {
            store = createStore();
            store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        });

        describe('getCode', () => {
            it('EOA - No-code', async () => {
                store.dispatch(getCodeAction({ networkId, address }));
                await sleep(1000);

                const account = await ContractCRUD.db.get({ networkId, address });
                assert.equal(account?.code, '0x', 'code should be empty 0x');
            });

            it('Smart Contract - Code', async () => {
                const accounts = await web3.eth.getAccounts();
                //Deploy contract
                const tx = new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as AbiItem[]).deploy({
                    data: BlockNumberArtifact.bytecode,
                });
                const gas = await tx.estimateGas();
                const web3Contract = await tx.send({ from: accounts[0], gas, gasPrice: '875000000' });
                const address = web3Contract.options.address.toLowerCase();

                await sleep(100);
                store.dispatch(getCodeAction({ networkId, address }));
                await sleep(1000);

                const account = await ContractCRUD.db.get({ networkId, address });
                assert.equal(account?.code, BlockNumberArtifact.deployedBytecode, 'smart contract code');
            });
        });
    });
});
