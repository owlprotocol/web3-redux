import { JSDOM } from 'jsdom';
// db.ts
import Dexie from 'dexie';
//@ts-ignore
import setGlobalVars from 'indexeddbshim';
import getDB from '../db.js';

const beforeAll = async () => {
    const { window } = new JSDOM('', { url: 'http://localhost:8080' });
    //@ts-ignore
    //global.window = global; // We'll allow ourselves to use `window.indexedDB` or `indexedDB` as a global
    setGlobalVars(window, { checkOrigin: false, memoryDatabase: '' }); // See signature below
    const { indexedDB, IDBKeyRange } = window;
    //@ts-expect-error
    global.window = window;
    global.document = window.document;
    Dexie.dependencies.indexedDB = indexedDB;
    Dexie.dependencies.IDBKeyRange = IDBKeyRange;
};

const beforeEach = async () => {
    const db = getDB();
    await db.clear();
};

const afterAll = async () => {
    console.debug('Tests finishsed.');
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
