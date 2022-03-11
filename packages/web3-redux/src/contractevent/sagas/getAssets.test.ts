import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { getWeb3Provider } from '../../test/index.js';
import { name } from '../common.js';
import { networkId } from '../../test/data.js';

import {
    ERC20PresetMinterPauser,
    ERC721PresetMinterPauserAutoId,
    ERC1155PresetMinterPauser,
} from '../../abis/index.js';

import { sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import { create as createNetwork } from '../../network/index.js';
import { selectByIdMany as selectContracts } from '../../contract/selectors/index.js';

import { getAssets as getAssetsAction } from '../actions/index.js';

describe(`${name}/sagas/getAssets.test.ts`, () => {
    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let store: StoreType;
    let ERC20Contract: Web3Contract;
    let ERC721Contract: Web3Contract;
    let ERC1155Contract: Web3Contract;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        ERC20Contract = await new web3.eth.Contract(ERC20PresetMinterPauser.abi as any)
            .deploy({
                arguments: ['Test Token', 'TEST'],
                data: ERC20PresetMinterPauser.bytecode,
            })
            .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
        ERC721Contract = await new web3.eth.Contract(ERC721PresetMinterPauserAutoId.abi as any)
            .deploy({
                arguments: ['Test NFT', 'TEST', 'https://api.example.com/'],
                data: ERC721PresetMinterPauserAutoId.bytecode,
            })
            .send({ from: accounts[0], gas: 3000000, gasPrice: '875000000' });
        ERC1155Contract = await new web3.eth.Contract(ERC1155PresetMinterPauser.abi as any)
            .deploy({
                arguments: ['http://example.com/{id}'],
                data: ERC1155PresetMinterPauser.bytecode,
            })
            .send({ from: accounts[0], gas: 4000000, gasPrice: '875000000' });

        await ERC20Contract.methods
            .mint(accounts[0], 1)
            .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
        await ERC721Contract.methods.mint(accounts[0]).send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
        await ERC1155Contract.methods
            .mint(accounts[0], '0', 1, '0x')
            .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });

        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
    });

    describe('getAssets', () => {
        it('(networkId, address)', async () => {
            store.dispatch(
                getAssetsAction({
                    networkId,
                    address: accounts[0],
                }),
            );

            await sleep(1000);

            //Create 3 contracts for ERC20, ERC721, ERC1155
            const contracts = selectContracts(store.getState());
            assert.equal(contracts.length, 3, 'contracts.length');
        });
    });
});
