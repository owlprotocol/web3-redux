import { assert } from 'chai';
import Web3 from 'web3';
import { cloneDeep } from '../../utils/lodash/index.js';

import { BlockNumber as BlockNumberArtifact } from '../../abis/index.js';
import { getWeb3Provider } from '../../test/index.js';
import { networkId } from '../../test/data.js';

import { createStore, StoreType } from '../../store.js';
import { sleep } from '../../utils/index.js';
import { getIdArgs } from '../model/interface.js';
import NetworkCRUD from '../../network/crud.js';
import EthCallCRUD from '../crud.js';
import { fetch } from '../actions/index.js';

describe('ethcall.sagas', () => {
    let web3: Web3;
    let accounts: string[];
    let store: StoreType;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
    });

    it('store.dispatch(EthCall.fetch())', async () => {
        //Deploy contract
        const tx1 = new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as any[]).deploy({
            data: BlockNumberArtifact.bytecode,
        });
        const gas1 = await tx1.estimateGas();
        const contract = await tx1.send({ from: accounts[0], gas: gas1, gasPrice: '875000000' });
        const tx2 = await contract.methods.setValue(42);
        await tx2.send({ from: accounts[0], gas: await tx2.estimateGas() });

        const ethCall1 = EthCallCRUD.validate({
            networkId,
            from: accounts[0],
            to: contract.options.address,
            data: '0x20965255',
        });
        store.dispatch(
            fetch(ethCall1), //getValue() 4byte selector
        );

        await sleep(150);

        const tx3 = await contract.methods.getValue();
        const expected = await tx3.call({ from: accounts[0], gas: await tx3.estimateGas() });

        assert.equal(EthCallCRUD.selectors.selectByIdMany(store.getState()).length, 1, 'EthCallSelector.selectMany');
        assert.equal(
            Web3.utils.hexToNumber(
                EthCallCRUD.selectors.selectByIdSingle(store.getState(), getIdArgs(ethCall1))!.returnValue!,
            ),
            expected,
            'EthCall.selectSingle',
        );
    });
});
