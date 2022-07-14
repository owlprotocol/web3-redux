import { assert } from 'chai';
import { Provider } from 'react-redux';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';
import sinon from 'sinon';

import { cloneDeep } from '../../utils/lodash/index.js';
import { expectThrowsAsync } from '../../test/index.js';
import { BlockNumberArtifact } from '../../abis/index.js';

import { network1336 } from '../../network/data.js';

import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';

import { useContractCall } from '../hooks/useContractCall.js';
import { createEventSync } from '../../sync/model/EventSync.js';
import { ZERO_ADDRESS } from '../../utils/index.js';
import ContractEventCRUD from '../../contractevent/crud.js';
import BlockCRUD from '../../block/crud.js';
import TransactionCRUD from '../../transaction/crud.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/hooks/useContractCall.test.tsx`, () => {
    let store: StoreType;
    let dispatchSpy: sinon.SinonSpy;
    const createActionSpy = sinon.spy(ContractCRUD.actions, 'create');
    let wrapper: any;

    let accounts: string[];
    let web3Contract: Web3Contract;
    let address: string;

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    after(() => {
        createActionSpy.restore();
    });

    beforeEach(async () => {
        store = createStore();
        dispatchSpy = sinon.spy(store, 'dispatch');
        createActionSpy.resetHistory();
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    afterEach(() => {
        dispatchSpy.restore();
    });

    describe('Errors', () => {
        it('networkId undefined', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(undefined, ZERO_ADDRESS, 'invalidFunction', [], { sync: 'once' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            const currentCall = result.current[0];
            const currentCallError = result.current[1].error;
            assert.isUndefined(currentCall, 'result.current');
            assert.isDefined(currentCallError, 'error');
            assert.equal(currentCallError?.message, 'networkId undefined', 'error.message');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it('address undefined', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, undefined, 'invalidFunction', [], { sync: 'once' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            const currentCall = result.current[0];
            const currentCallError = result.current[1].error;
            assert.isUndefined(currentCall, 'result.current');
            assert.isDefined(currentCallError, 'error');
            assert.equal(currentCallError?.message, 'address undefined', 'error.message');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it('method undefined', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, ZERO_ADDRESS, undefined, [], { sync: 'once' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            const currentCall = result.current[0];
            const currentCallError = result.current[1].error;
            assert.isUndefined(currentCall, 'result.current');
            assert.isDefined(currentCallError, 'error');
            assert.equal(currentCallError?.message, 'method undefined', 'error.message');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it('Network {id} undefined', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, ZERO_ADDRESS, 'invalidFunction', [], { sync: 'once' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            await waitForNextUpdate(); //load error
            const currentCall = result.current[0];
            const currentCallError = result.current[1].error;
            assert.isUndefined(currentCall, 'result.current');
            assert.isDefined(currentCallError, 'error');
            assert.equal(currentCallError?.message, `Network ${networkId} undefined`, 'error.message');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it('Contract {id} undefined', async () => {
            store.dispatch(NetworkCRUD.actions.create({ networkId }));

            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, ZERO_ADDRESS, 'invalidFunction', [], { sync: 'once' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            await waitForNextUpdate(); //load error
            const currentCall = result.current[0];
            const currentCallError = result.current[1].error;
            assert.isUndefined(currentCall, 'result.current');
            assert.isDefined(currentCallError, 'error');
            assert.equal(currentCallError?.message, `Contract ${networkId},${ZERO_ADDRESS} undefined`, 'error.message');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it('Contract {id} has no web3 contract', async () => {
            store.dispatch(NetworkCRUD.actions.create({ networkId }));
            store.dispatch(
                ContractCRUD.actions.create({
                    networkId,
                    address: ZERO_ADDRESS,
                    abi: cloneDeep(BlockNumberArtifact.abi) as any,
                }),
            );

            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, ZERO_ADDRESS, 'invalidFunction', [], { sync: 'once' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            await waitForNextUpdate(); //load error
            const currentCall = result.current[0];
            const currentCallError = result.current[1].error;
            assert.isUndefined(currentCall, 'result.current');
            assert.isDefined(currentCallError, 'error');
            assert.equal(
                currentCallError?.message,
                `Contract ${networkId},${ZERO_ADDRESS} has no web3 contract`,
                'error.message',
            );

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
        it('Contract {id} has no such method {method}', async () => {
            store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
            web3Contract = await new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as any)
                .deploy({
                    data: BlockNumberArtifact.bytecode,
                })
                .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            address = web3Contract.options.address;
            store.dispatch(
                ContractCRUD.actions.create({
                    networkId,
                    address,
                    abi: cloneDeep(BlockNumberArtifact.abi) as any,
                }),
            );

            const { result, waitForNextUpdate } = renderHook(
                () => useContractCall(networkId, address, 'invalidFunction', [], { sync: 'once' }),
                {
                    wrapper,
                },
            );

            await waitForNextUpdate();
            await waitForNextUpdate(); //load error
            const currentCall = result.current[0];
            const currentCallError = result.current[1].error;
            assert.isUndefined(currentCall, 'result.current');
            assert.isDefined(currentCallError, 'error');
            assert.equal(
                currentCallError?.message,
                `Contract ${networkId},${address.toLowerCase()} has no such method invalidFunction`,
                'error.message',
            );

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });

    describe('Network & Contract initialized', () => {
        beforeEach(async () => {
            store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));

            web3Contract = await new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as any)
                .deploy({
                    data: BlockNumberArtifact.bytecode,
                })
                .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            address = web3Contract.options.address;
            store.dispatch(
                ContractCRUD.actions.create({
                    networkId,
                    address,
                    abi: cloneDeep(BlockNumberArtifact.abi) as any,
                }),
            );
        });

        describe('useContractCall', () => {
            it('error contract revert', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useContractCall(networkId, address, 'revertTx', [], { sync: 'once' }),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall = result.current[0];
                const currentCallError = result.current[1].error;
                assert.isUndefined(currentCall, 'result.current');
                assert.isDefined(currentCallError, 'error');
                assert.equal(
                    currentCallError?.message,
                    'VM Exception while processing transaction: reverted with reason string \'Transaction reverted\'',
                    'error.message',
                );

                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });

            it('(networkId, address, method, [], { sync: once })', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useContractCall(networkId, address, 'getValue', [], { sync: 'once' }),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall = result.current[0];
                assert.equal(currentCall, '0', 'result.current');

                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });

            it('(networkId, address, method, [], { sync: ifnull })', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useContractCall(networkId, address, 'getValue', [], { sync: 'ifnull' }),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall = result.current[0];
                assert.equal(currentCall, '0', 'result.current');

                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });

            it('(networkId, address, method, [], { sync: false })', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useContractCall(networkId, address, 'getValue', [], { sync: false }),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall = result.current[0];
                const currentOptions = result.current[1];
                assert.isUndefined(currentCall, 'result.current');
                assert.isFalse(currentOptions.isLoading, 'isLoading');
                assert.isDefined(currentOptions.callAction);

                //Manual refresh
                currentOptions.dispatchCallAction();
                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall2 = result.current[0];
                assert.equal(currentCall2, '0', 'result.current');

                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });

            it('(networkId, address, method, [], { sync: Transaction })', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useContractCall(networkId, address, 'getValue', [], { sync: 'Transaction' }),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall = result.current[0];
                const currentOptions = result.current[1];
                assert.isUndefined(currentCall, 'result.current');
                assert.isFalse(currentOptions.isLoading, 'isLoading');
                assert.isDefined(currentOptions.callAction);

                await web3Contract.methods
                    .setValue(42)
                    .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
                //Create transaction, triggering a refresh
                store.dispatch(
                    TransactionCRUD.actions.create({
                        networkId,
                        hash: '0x1',
                        from: accounts[0],
                        to: address,
                    }),
                );
                await waitForNextUpdate();

                const currentCall2 = result.current[0];
                assert.equal(currentCall2, '42', 'result.current');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });

            it('(networkId, address, method, [], { sync: Block })', async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useContractCall(networkId, address, 'getValue', [], { sync: 'Block' }),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall = result.current[0];
                const currentOptions = result.current[1];
                assert.isUndefined(currentCall, 'result.current');
                assert.isFalse(currentOptions.isLoading, 'isLoading');
                assert.isDefined(currentOptions.callAction);

                await web3Contract.methods
                    .setValue(42)
                    .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
                //Create block, triggering a refresh
                store.dispatch(
                    BlockCRUD.actions.create({
                        networkId,
                        number: 1,
                    }),
                );
                await waitForNextUpdate();

                const currentCall2 = result.current[0];
                assert.equal(currentCall2, '42', 'result.current');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });

            it('(networkId, address, method, [], { sync: Event })', async () => {
                //Matches all NewValue updates
                const eventSync = createEventSync(networkId, [], address, 'NewValue', {});
                const { result, waitForNextUpdate } = renderHook(
                    () => useContractCall(networkId, address, 'getValue', [], { sync: eventSync }),
                    {
                        wrapper,
                    },
                );

                await waitForNextUpdate();
                await waitForNextUpdate();

                const currentCall = result.current[0];
                const currentOptions = result.current[1];
                assert.isUndefined(currentCall, 'result.current');
                assert.isFalse(currentOptions.isLoading, 'isLoading');
                assert.isDefined(currentOptions.callAction);

                await web3Contract.methods
                    .setValue(42)
                    .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
                //Create event, triggering a refresh
                store.dispatch(
                    ContractEventCRUD.actions.create({
                        networkId,
                        address,
                        blockNumber: 1,
                        blockHash: '0x1',
                        logIndex: 0,
                        name: 'NewValue',
                        returnValues: {},
                    }),
                );
                await waitForNextUpdate();

                const currentCall2 = result.current[0];
                assert.equal(currentCall2, '42', 'result.current');
                //No additional re-renders frm background tasks
                await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
            });
        });
    });
});
