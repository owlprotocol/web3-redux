import { assert } from 'chai';
import { REDUX_ROOT } from '../../common.js';
import { getOrm } from '../../orm.js';

import { ContractIndex } from '../model/index.js';
import { name } from '../common.js';
import { networkId, contract1 } from '../../test/data.js';
import { selectContracts } from './index.js';

describe(`${name}.selectors`, () => {
    //Indexes
    const index1: ContractIndex = { id: JSON.stringify({ networkId }) };

    const state = {
        [REDUX_ROOT]: getOrm().getEmptyState(),
    };

    before(() => {
        //Set Indexes
        state[REDUX_ROOT][name].items.push(index1.id!);
        state[REDUX_ROOT][name].itemsById[index1.id!] = index1;

        //Set Event
        state[REDUX_ROOT]['Contract'].items.push(contract1.id);
        state[REDUX_ROOT]['Contract'].itemsById[contract1.id!] = contract1;

        //Set Join Table
        state[REDUX_ROOT]['ContractIndexIds'].items.push(0);
        state[REDUX_ROOT]['ContractIndexIds'].itemsById[0] = {
            toContractIndexId: index1.id,
            fromContractId: contract1.id,
            id: 0,
        };
        state[REDUX_ROOT]['ContractIndexIds'].indexes.fromContractId[contract1.id!] = [index1.id];
        state[REDUX_ROOT]['ContractIndexIds'].indexes.toContractIndexId[index1.id!] = [contract1.id];
    });

    describe('selectContracts', () => {
        it.skip('({networkId})', () => {
            //TODO: Test fails. Redux ORM bug?
            const selected = selectContracts(state, index1.id!);
            assert.deepEqual(selected, [contract1]);
        });
    });
});
