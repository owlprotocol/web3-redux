import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { AbiCoder } from 'web3-eth-abi';
import { getWeb3Provider } from '../../test';
import { name } from '../common';
import { ADDRESS_0, networkId } from '../../test/data';

import * as ERC20 from '../../abis/token/ERC20/presets/ERC20PresetMinterPauser.sol/ERC20PresetMinterPauser.json';
import * as IERC20 from '../../abis/token/ERC20/IERC20.sol/IERC20.json';
import { sleep } from '../../utils';

import { createStore, StoreType } from '../../store';
import { create as createNetwork } from '../../network';
import { create as createContract } from '../../contract';

import { selectByIdMany } from '../selectors';
import { getPastLogs as getPastLogsAction } from '../actions';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const coder: AbiCoder = require('web3-eth-abi');
describe(`${name}/sagas/getPastLogs.test.ts`, () => {
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

        await web3Contract.methods
            .mint(accounts[0], 1)
            .send({ from: accounts[0], gas: 2000000, gasPrice: '875000000' });

        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3 }));
    });

    describe('getPastLogs', () => {
        it('(networkId, address) - All events', async () => {
            store.dispatch(
                getPastLogsAction({
                    networkId,
                    address,
                }),
            );

            await sleep(1000);

            const events1 = selectByIdMany(store.getState());
            //[DefaultRoleGranted, MinterRoleGranted, PauserRoleGranted, Transfer(accounts[0])]
            assert.equal(events1.length, 4, 'events.length');
        });

        describe('(networkId, address, [Transfer, from, to])', () => {
            let topics: string[];
            before(() => {
                //Filter by address, Transfer event, from, address
                const Transfer = ERC20.abi.find((a) => a.name === 'Transfer');
                const eventTopic = coder.encodeEventSignature(Transfer as any);
                const fromTopic = coder.encodeParameter('address', ADDRESS_0);
                const toTopic = coder.encodeParameter('address', accounts[0]);
                topics = [eventTopic, fromTopic, toTopic]; //[Transfer, from, to]
            });

            it('raw data', async () => {
                //Trigger event.onUpdate which populates returnValues
                store.dispatch(
                    getPastLogsAction({
                        networkId,
                        address,
                        topics,
                    }),
                );

                await sleep(1000);

                const events1 = selectByIdMany(store.getState());
                //[Transfer(zero, accounts[0])]
                assert.equal(events1.length, 1, 'events.length');
            });

            it('event.onUpdate middleware', async () => {
                //Create contract before events are fetched
                store.dispatch(createContract({ networkId, address, abi: IERC20.abi as any }));

                //Trigger event.onUpdate which populates returnValues
                store.dispatch(
                    getPastLogsAction({
                        networkId,
                        address,
                        topics,
                    }),
                );

                await sleep(1000);

                //Proper decoding using middleware
                const events1 = selectByIdMany(store.getState());
                const event = events1[0];
                assert.equal(event?.returnValues?.from, ADDRESS_0, 'returnValues.from');
                assert.equal(event?.returnValues?.to, accounts[0], 'returnValues.to');
                assert.equal(event?.returnValues?.value, 1, 'returnValues.value');
            });

            it('contract.onUpdate middleware', async () => {
                store.dispatch(
                    getPastLogsAction({
                        networkId,
                        address,
                        topics,
                    }),
                );

                await sleep(1000);

                //Create contract after events are fetched
                //Trigger contract.onUpdate which populates returnValues
                store.dispatch(createContract({ networkId, address, abi: IERC20.abi as any }));

                //Proper decoding using middleware
                const events1 = selectByIdMany(store.getState());
                const event = events1[0];
                assert.equal(event?.returnValues?.from, ADDRESS_0, 'returnValues.from');
                assert.equal(event?.returnValues?.to, accounts[0], 'returnValues.to');
                assert.equal(event?.returnValues?.value, 1, 'returnValues.value');
            });
        });
    });
});
