import { assert } from 'chai';
import Web3 from 'web3';
import { getWeb3Provider } from '../../test/index.js';
import { name } from '../common.js';
import { networkId } from '../../test/data.js';
import { sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import { getAssets as getAssetsAction } from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../../contract/crud.js';

import { ERC20PresetMinterPauser } from '../../typechain/ERC20PresetMinterPauser.js';
import { ERC721PresetMinterPauserAutoId } from '../../typechain/ERC721PresetMinterPauserAutoId.js';
import { ERC1155PresetMinterPauser } from '../../typechain/ERC1155PresetMinterPauser.js';
import {
    ERC20PresetMinterPauserArtifact,
    ERC721PresetMinterPauserAutoIdArtifact,
    ERC1155PresetMinterPauserArtifact,
} from '../../abis/index.js';

describe(`${name}/sagas/getAssets.test.ts`, () => {
    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let store: StoreType;
    let ERC20Contract: ERC20PresetMinterPauser;
    let ERC721Contract: ERC721PresetMinterPauserAutoId;
    let ERC1155Contract: ERC1155PresetMinterPauser;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        ERC20Contract = (await new web3.eth.Contract(ERC20PresetMinterPauserArtifact.abi as any)
            .deploy({
                arguments: ['Test Token', 'TEST'],
                data: ERC20PresetMinterPauserArtifact.bytecode,
            })
            .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' })) as unknown as ERC20PresetMinterPauser;
        ERC721Contract = (await new web3.eth.Contract(ERC721PresetMinterPauserAutoIdArtifact.abi as any)
            .deploy({
                arguments: ['Test NFT', 'TEST', 'https://api.example.com/'],
                data: ERC721PresetMinterPauserAutoIdArtifact.bytecode,
            })
            .send({
                from: accounts[0],
                gas: 3000000,
                gasPrice: '875000000',
            })) as unknown as ERC721PresetMinterPauserAutoId;
        ERC1155Contract = (await new web3.eth.Contract(ERC1155PresetMinterPauserArtifact.abi as any)
            .deploy({
                arguments: ['http://example.com/{id}'],
                data: ERC1155PresetMinterPauserArtifact.bytecode,
            })
            .send({ from: accounts[0], gas: 4000000, gasPrice: '875000000' })) as unknown as ERC1155PresetMinterPauser;

        await ERC20Contract.methods
            .mint(accounts[0], 1)
            .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
        await ERC721Contract.methods.mint(accounts[0]).send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
        await ERC1155Contract.methods
            .mint(accounts[0], '0', 1, '0x')
            .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });

        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
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
            const contracts = ContractCRUD.selectors.selectByIdMany(store.getState());
            assert.equal(contracts.length, 3, 'contracts.length');
        });
    });
});
