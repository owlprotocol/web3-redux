import { assert } from 'chai';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import ganache from 'ganache-core';
import { name } from '../common';
import { networkId } from '../../test/data';

import BlockNumber from '../../abis/BlockNumber.json';
import { sleep } from '../../utils';

import { createStore, StoreType } from '../../store';
import { create as createNetwork } from '../../network';
import { validate as validatedContractEvent } from '../../contractevent/model';

import { ContractId } from '../model';
import { selectContractEvents } from '../selectors';
import { create as createAction, eventGetPast as eventGetPastAction } from '../actions';

describe(`${name}.sagas.eventGetPast`, () => {
    let web3: Web3; //Web3 loaded from store
    let web3Sender: Web3;
    let accounts: string[];
    let store: StoreType;
    let web3Contract: Web3Contract;

    let address: string;
    let id: ContractId;

    before(async () => {
        const networkIdInt = parseInt(networkId);

        const provider = ganache.provider({
            networkId: networkIdInt,
        });
        //@ts-ignore
        web3 = new Web3(provider);
        //@ts-ignore
        web3Sender = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    beforeEach(async () => {
        ({ store } = createStore());
        store.dispatch(createNetwork({ networkId, web3, web3Sender }));

        const tx = new web3.eth.Contract(BlockNumber.abi as AbiItem[]).deploy({
            data: BlockNumber.bytecode,
        });
        const gas = await tx.estimateGas();
        web3Contract = await tx.send({ from: accounts[0], gas, gasPrice: '10000' });
        address = web3Contract.options.address;
        id = { networkId, address };

        store.dispatch(
            createAction({
                networkId,
                address,
                abi: BlockNumber.abi as AbiItem[],
            }),
        );
    });

    describe('eventGetPast', () => {
        it('(networkId,address,eventName)', async (): Promise<void> => {
            const expectedEvents: any[] = [];
            web3Contract.events['NewValue']().on('data', (event: any) => {
                expectedEvents.push(validatedContractEvent({ networkId, address, name: 'NewValue', ...event }));
            });

            const tx2 = await web3Contract.methods.setValue(42);
            const gas2 = await tx2.estimateGas();
            await tx2.send({ from: accounts[0], gas: gas2, gasPrice: '10000' });

            await sleep(2000);

            store.dispatch(
                eventGetPastAction({
                    networkId,
                    address,
                    eventName: 'NewValue',
                }),
            );

            await sleep(300);

            const events1 = selectContractEvents(store.getState(), id, 'NewValue');
            assert.deepEqual(events1, expectedEvents);
        });
    });
});
