import { expect } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import exists from './exists.js';

import { name } from '../common.js';
import { networkId } from '../../test/data.js';
import { selectByIdSingle } from '../selectors/index.js';

//Actions

//Sagas
import { BlockId, BlockHeader } from '../model/index.js';

describe('Block/sagas/exists.ts', () => {
    const item: BlockHeader = { networkId, number: 0 };
    const id: BlockId = { ...item };
    const itemWithId = { id, ...item };

    describe('exists()', () => {
        it(`error: ${name} undefined`, () => {
            expect(testSaga(exists, id).next().select(selectByIdSingle, id).next).to.throw(`${name} ${id} undefined`);
        });
        it('exists', () => {
            const gen = testSaga(exists, id).next().select(selectByIdSingle, id).next(itemWithId);
            gen.returns(itemWithId);
            gen.isDone();
        });
    });
});
