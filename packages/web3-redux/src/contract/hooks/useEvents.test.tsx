import { assert } from 'chai';
import { Provider } from 'react-redux';
import type { Contract as Web3Contract } from 'web3-eth-contract';
import { renderHook } from '@testing-library/react-hooks';

import { cloneDeep } from '../../utils/lodash/index.js';

import { BlockNumberArtifact } from '../../abis/index.js';

import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';

import { useEvents } from '../hooks/useEvents.js';
import ContractCRUD from '../crud.js';
import NetworkCRUD from '../../network/crud.js';
import ContractEventCRUD from '../../contractevent/crud.js';
import { network1336 } from '../../network/data.js';
import expectThrowsAsync from '../../test/expectThrowsAsync.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${name}/hooks/useEvents.tsx`, () => {
    let store: StoreType;
    let wrapper: any;

    let accounts: string[];
    let web3Contract: Web3Contract;
    let address: string;

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        web3Contract = await new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as any)
            .deploy({
                data: BlockNumberArtifact.bytecode,
            })
            .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
        address = web3Contract.options.address;

        store = createStore();
        store.dispatch(NetworkCRUD.actions.create({ networkId, web3 }));
        store.dispatch(
            ContractCRUD.actions.create({
                networkId,
                address,
                abi: cloneDeep(BlockNumberArtifact.abi) as any,
            }),
        );
        //eslint-disable-next-line react/display-name
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useEvents', () => {
        it('(networkId, address, eventName)', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(ContractEventCRUD.validate({ networkId, address, name: 'NewValue', ...event }));
            });

            const { result, waitForNextUpdate } = renderHook(
                () => useEvents(networkId, address, 'NewValue', undefined, { sync: true }),
                {
                    wrapper,
                },
            );

            web3Contract.methods.setValue(42).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            await waitForNextUpdate();
            await waitForNextUpdate();

            const currentEvents = result.current[0];
            assert.deepEqual(currentEvents, expectedEvents, 'result.current');

            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });

        it.skip('(...,filter)', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']({ filter: { value: 42 } }).on('data', (event: any) => {
                expectedEvents.push(ContractEventCRUD.validate({ networkId, address, name: 'NewValue', ...event }));
            });

            const { result, waitForNextUpdate } = renderHook(
                () => useEvents(networkId, address, 'NewValue', { value: '42' }, { sync: true }),
                {
                    wrapper,
                },
            );

            web3Contract.methods.setValue(42).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
            await waitForNextUpdate();

            //This is ignored by the hook
            await web3Contract.methods.setValue(43).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });

            const currentEvents = result.current[0];
            assert.deepEqual(currentEvents, expectedEvents, 'result.current');
        });
    });
});
