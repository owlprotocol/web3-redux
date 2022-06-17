import { assert } from 'chai';
// eslint-disable-next-line import/no-unresolved
import { Connector } from 'indexeddb-orm';
import { name } from '../common.js';
import { BlockHeader, validate } from '../model/index.js';
import getDB from '../../db.js';
import { networkId } from '../../test/data.js';

describe(`${name}/model/ormDB.ts`, () => {
    const item: BlockHeader = validate({ networkId, number: 0 });

    // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
    const FDBFactory = require('fake-indexeddb/lib/FDBFactory');
    let db: Connector;

    beforeEach(async () => {
        indexedDB = new FDBFactory();
        db = await getDB();
    });

    it('insert', async () => {
        const models = await db.connect();
        const record = await models[name].create(item);
        assert.deepEqual(record, item);
    });
});
