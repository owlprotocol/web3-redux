import { assert } from 'chai';
import Web3 from 'web3';
import BlockNumber from '../../abis/BlockNumber.json';
import { getWeb3Provider } from '../../test';
import { networkId } from '../../test/data';

import { createStore, StoreType } from '../../store';
import { Network, EthCall } from '../../index';
import { sleep } from '../../utils';
import { getIdArgs } from '../model/interface';

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
        ({ store } = createStore());
        store.dispatch(Network.create({ networkId, web3 }));
    });

    it('store.dispatch(EthCall.fetch())', async () => {
        //Deploy contract
        const tx1 = new web3.eth.Contract(BlockNumber.abi as any[]).deploy({
            data: BlockNumber.bytecode,
        });
        const gas1 = await tx1.estimateGas();
        const contract = await tx1.send({ from: accounts[0], gas: gas1, gasPrice: '875000000' });
        const tx2 = await contract.methods.setValue(42);
        await tx2.send({ from: accounts[0], gas: await tx2.estimateGas() });

        const ethCall1 = EthCall.validate({
            networkId,
            from: accounts[0],
            to: contract.options.address,
            data: '0x20965255',
        });
        store.dispatch(
            EthCall.fetch(ethCall1), //getValue() 4byte selector
        );

        await sleep(150);

        const tx3 = await contract.methods.getValue();
        const expected = await tx3.call({ from: accounts[0], gas: await tx3.estimateGas() });

        assert.equal(EthCall.selectByIdMany(store.getState()).length, 1, 'EthCallSelector.selectMany');
        assert.equal(
            Web3.utils.hexToNumber(EthCall.selectByIdSingle(store.getState(), getIdArgs(ethCall1))!.returnValue!),
            expected,
            'EthCall.selectSingle',
        );
    });
});
