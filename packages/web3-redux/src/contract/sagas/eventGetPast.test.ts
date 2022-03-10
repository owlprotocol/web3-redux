import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { cloneDeep } from 'lodash';

import { getWeb3Provider } from '../../test/index.js';
import { name } from '../common.js';
import { networkId } from '../../test/data.js';

import * as BlockNumberArtifact from '../../abis/BlockNumber.json';
import { sleep } from '../../utils/index.js';

import { createStore, StoreType } from '../../store.js';
import { create as createNetwork } from '../../network/index.js';
import { validate as validatedContractEvent } from '../../contractevent/model/index.js';

import { selectContractEvents } from '../selectors/index.js';
import { create as createAction, eventGetPast as eventGetPastAction } from '../actions/index.js';

describe(`${name}/sagas/eventGetPast.test.ts`, () => {
    let web3: Web3; //Web3 loaded from store
    let web3Sender: Web3;
    let accounts: string[];
    let store: StoreType;
    let web3Contract: Web3Contract;

    let address: string;

    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        //@ts-ignore
        web3Sender = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3, web3Sender }));

        web3Contract = await new web3.eth.Contract(cloneDeep(BlockNumberArtifact.abi) as AbiItem[])
            .deploy({
                data: BlockNumberArtifact.bytecode,
            })
            .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
        address = web3Contract.options.address;

        store.dispatch(
            createAction({
                networkId,
                address,
                abi: cloneDeep(BlockNumberArtifact.abi) as AbiItem[],
            }),
        );
    });

    describe('eventGetPast', () => {
        it('(networkId,address,eventName)', async () => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });

            await web3Contract.methods.setValue(42).send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });

            store.dispatch(
                eventGetPastAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                }),
            );

            await sleep(1000);

            const events1 = selectContractEvents(store.getState(), { networkId, address }, 'NewValue');
            assert.deepEqual(events1, expectedEvents);
        });
    });
});
