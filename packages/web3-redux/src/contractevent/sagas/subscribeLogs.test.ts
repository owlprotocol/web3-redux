import { assert } from 'chai';
import Web3 from 'web3';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { getWeb3Provider } from '../../test/index.js';
import { name } from '../common.js';
import { ADDRESS_0, networkId } from '../../test/data.js';

import { ERC20PresetMinterPauser } from '../../abis/index.js';
import { sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';

import { subscribeLogs as subscribeLogsAction } from '../actions/index.js';
import { coder } from '../../utils/web3-eth-abi/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractEventCRUD from '../crud.js';

describe(`${name}/sagas/subscribeLogs.test.ts`, () => {
    let web3: Web3; //Web3 loaded from store
    let accounts: string[];
    let store: StoreType;
    let web3Contract: Web3Contract;

    let address: string;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        web3Contract = await new web3.eth.Contract(ERC20PresetMinterPauser.abi as any)
            .deploy({
                arguments: ['Test Token', 'TEST'],
                data: ERC20PresetMinterPauser.bytecode,
            })
            .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
        address = web3Contract.options.address;

        ({ store } = createStore());
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
    });

    describe('subscribeLogs', () => {
        it('(networkId, address) - All events', async () => {
            store.dispatch(
                subscribeLogsAction({
                    networkId,
                    address,
                }),
            );

            await web3Contract.methods
                .mint(accounts[0], 1)
                .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });

            await sleep(1000);

            const events1 = NetworkCRUD.selectors.selectByIdMany(store.getState());
            //[Transfer(accounts[0])]
            assert.equal(events1.length, 1, 'events.length');
        });

        it('(networkId, address, [Transfer, from, to]) - All events', async () => {
            //Filter by address, Transfer event, from, address
            const Transfer = ERC20PresetMinterPauser.abi.find((a: any) => a.name === 'Transfer');
            const eventTopic = coder.encodeEventSignature(Transfer as any);
            const fromTopic = coder.encodeParameter('address', ADDRESS_0);
            const toTopic = coder.encodeParameter('address', accounts[0]);
            const topics = [eventTopic, fromTopic, toTopic]; //[Transfer, from, to]

            store.dispatch(
                subscribeLogsAction({
                    networkId,
                    address,
                    topics,
                }),
            );

            await web3Contract.methods
                .mint(accounts[0], 1)
                .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
            await sleep(1000);

            const events1 = await ContractEventCRUD.db.all();
            //[Transfer(zero, accounts[0])]
            assert.equal(events1.length, 1, 'events.length');
        });
    });
});
