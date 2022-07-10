import { clearSQLite } from './sqliteHooks.js';
import getDB from '../db.js';

const beforeAll = async () => {
    await clearSQLite();
};

const beforeEach = async () => {
    const db = getDB();
    await db.clear();
};

const afterAll = async () => {
    await clearSQLite();
};

const afterEach = async () => {
    const db = getDB();
    await db.clear();
};

export const mochaHooks = {
    beforeAll,
    beforeEach,
    afterAll,
    afterEach,
};
