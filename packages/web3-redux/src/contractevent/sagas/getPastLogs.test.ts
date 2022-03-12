import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import Coder, { AbiCoder } from 'web3-eth-abi';
import { getWeb3Provider } from '../../test/index.js';
import { name } from '../common.js';
import { ADDRESS_0, networkId } from '../../test/data.js';

import { ERC20PresetMinterPauser, IERC20 } from '../../abis/index.js';
import { sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import { create as createNetwork } from '../../network/index.js';
import { create as createContract } from '../../contract/index.js';

import { selectByIdMany } from '../selectors/index.js';
import { getPastLogs as getPastLogsAction } from '../actions/index.js';

const coder = Coder as unknown as AbiCoder;
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
        web3Contract = await new web3.eth.Contract(ERC20PresetMinterPauser.abi as any)
            .deploy({
                arguments: ['Test Token', 'TEST'],
                data: ERC20PresetMinterPauser.bytecode,
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
                const Transfer = ERC20PresetMinterPauser.abi.find((a: any) => a.name === 'Transfer');
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
