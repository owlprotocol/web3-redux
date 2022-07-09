import { assert } from 'chai';
import Web3 from 'web3';
import { cloneDeep } from '../../utils/lodash/index.js';
import { AbiItem } from '../../utils/web3-utils/index.js';

import { getWeb3Provider } from '../../test/index.js';
import { sleep } from '../../utils/index.js';

import { BlockNumber as BlockNumberArtifact } from '../../abis/index.js';
import { networkId } from '../../test/data.js';
import { createStore, StoreType } from '../../store.js';

import { Contract } from '../model/interface.js';
import { name } from '../common.js';

import { getCode as getCodeAction } from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';

describe(`${name}.integration`, () => {
    let store: StoreType;
    let web3: Web3;

    let item: Contract;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        item = { networkId, address: accounts[0] };
    });

    beforeEach(() => {
        ({ store } = createStore());
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        store.dispatch(ContractCRUD.actions.create(item));
    });

    describe('getCode', () => {
        it('EOA - No-code', async () => {
            store.dispatch(getCodeAction(item));
            await sleep(100);

            const account = await ContractCRUD.db.get(item);
            assert.equal(account?.code, '0x', 'code should be empty 0x');
        });

        it('Smart Contract - Code', async () => {
            //Deploy contract
            const tx = new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as AbiItem[]).deploy({
                data: BlockNumberArtifact.bytecode,
            });
            const gas = await tx.estimateGas();
            const web3Contract = await tx.send({ from: item.address, gas, gasPrice: '875000000' });
            const address = web3Contract.options.address;

            await sleep(100);
            store.dispatch(getCodeAction({ networkId, address }));
            await sleep(100);

            const account = await ContractCRUD.db.get({ networkId, address });
            assert.equal(account?.code, '0x' + BlockNumberArtifact.deployedBytecode, 'smart contract code');
        });
    });
});
