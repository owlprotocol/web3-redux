import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { AbiCoder } from 'web3-eth-abi';
import { getWeb3Provider } from '../../test/index.js';
import { name } from '../common.js';
import { ADDRESS_0, networkId } from '../../test/data.js';

import * as ERC20 from '../../abis/token/ERC20/presets/ERC20PresetMinterPauser.sol/ERC20PresetMinterPauser.json';
import { sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import { create as createNetwork } from '../../network/index.js';

import { selectByIdMany } from '../selectors/index.js';
import { subscribeLogs as subscribeLogsAction } from '../actions/index.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const coder: AbiCoder = require('web3-eth-abi');
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
        web3Contract = await new web3.eth.Contract(ERC20.abi as any)
            .deploy({
                arguments: ['Test Token', 'TEST'],
                data: ERC20.bytecode,
            })
            .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });
        address = web3Contract.options.address;

        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
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

            const events1 = selectByIdMany(store.getState());
            //[Transfer(accounts[0])]
            assert.equal(events1.length, 1, 'events.length');
        });

        it('(networkId, address, [Transfer, from, to]) - All events', async () => {
            //Filter by address, Transfer event, from, address
            const Transfer = ERC20.abi.find((a) => a.name === 'Transfer');
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

            const events1 = selectByIdMany(store.getState());
            //[Transfer(zero, accounts[0])]
            assert.equal(events1.length, 1, 'events.length');
        });
    });
});
