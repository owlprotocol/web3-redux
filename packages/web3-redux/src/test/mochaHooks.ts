import { clearSQLite } from './sqliteHooks.js';

const beforeAll = () => {
    clearSQLite();
};

const afterAll = () => {
    clearSQLite();
};

export const mochaHooks = {
    beforeAll,
    afterAll,
};
