import { assert } from 'chai';
import selectERC721TokenIds from './selectERC721TokenIds.js';
import { ADDRESS_0, ADDRESS_1 } from '../../test/data.js';
import { REDUX_ROOT } from '../../common.js';
import { getOrm } from '../../orm.js';

import { Contract, validate } from '../model/interface.js';

import { StateRoot } from '../../state.js';
import { ModelWithId } from '../../types/model.js';
import { validateContractEvent } from '../../contractevent/index.js';

describe('contracts/selectors/selectERC721TokenIds.test.ts', () => {
    const networkId = '1337';
    //Contract
    const address = ADDRESS_1;
    const contract: ModelWithId<Contract> = validate({
        networkId,
        address,
    });

    //ContractEvent
    const event0 = validateContractEvent({
        networkId,
        address: ADDRESS_1,
        name: 'Transfer',
        blockHash: '0x0',
        logIndex: 0,
        returnValues: { from: ADDRESS_0, to: ADDRESS_1, tokenId: '0' },
        returnValuesIndexKeys: ['from'],
    });

    //State
    const state: StateRoot = {
        [REDUX_ROOT]: getOrm().getEmptyState(),
    };

    before(() => {
        state[REDUX_ROOT]['Contract'].items.push(contract.id);
        state[REDUX_ROOT]['Contract'].itemsById[contract.id] = contract;

        //Set Event
        state[REDUX_ROOT]['ContractEvent'].items.push(event0.id);
        state[REDUX_ROOT]['ContractEvent'].itemsById[event0.id!] = event0;

        //Set Event Index
        event0.indexIds?.map((eventIndex, i) => {
            state[REDUX_ROOT]['ContractEventIndex'].items.push(eventIndex);
            state[REDUX_ROOT]['ContractEventIndex'].itemsById[eventIndex] = {
                id: eventIndex,
            };

            state[REDUX_ROOT]['ContractEventIndexIds'].items.push(`${i}`);
            state[REDUX_ROOT]['ContractEventIndexIds'].itemsById[i] = {
                toContractEventIndexId: eventIndex,
                fromContractEventId: event0.id,
                id: i,
            };
            if (!state[REDUX_ROOT]['ContractEventIndexIds'].indexes.fromContractEventId[event0.id!])
                state[REDUX_ROOT]['ContractEventIndexIds'].indexes.fromContractEventId[event0.id!] = [];
            state[REDUX_ROOT]['ContractEventIndexIds'].indexes.fromContractEventId[event0.id!].push(i);
            if (!state[REDUX_ROOT]['ContractEventIndexIds'].indexes.toContractEventIndexId[eventIndex])
                state[REDUX_ROOT]['ContractEventIndexIds'].indexes.toContractEventIndexId[eventIndex] = [];
            state[REDUX_ROOT]['ContractEventIndexIds'].indexes.toContractEventIndexId[eventIndex].push(i);
        });
    });

    describe('selectERC721TokenIds', () => {
        it('(state,networkId,address)', () => {
            const selected = selectERC721TokenIds(state, networkId, address);
            const tokenIds = selected ? selected[0] : undefined;
            assert.deepEqual(tokenIds, ['0']);
        });
    });
});
