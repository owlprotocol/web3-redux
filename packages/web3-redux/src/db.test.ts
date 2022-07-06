import Dexie from 'dexie';
//@ts-ignore
//import { indexedDB, IDBKeyRange } from 'fake-indexeddb';
//@ts-ignore
import setGlobalVars from 'indexeddbshim';
import { PetIndex, Pet } from './interface.js';

describe('pet/hooks/useByIdSingle.test.tsx', () => {
    const item: Pet = { id: 1, name: 'Flocon', age: 10, type: 'dog' };

    it('empty', async () => {
        const shim: any = {};
        //@ts-ignore
        global.window = global; // We'll allow ourselves to use `window.indexedDB` or `indexedDB` as a global
        setGlobalVars(shim, { checkOrigin: false }); // See signature below
        const { indexedDB, IDBKeyRange } = shim;
        Dexie.dependencies.indexedDB = indexedDB;
        Dexie.dependencies.IDBKeyRange = IDBKeyRange;

        const db = new Dexie('MyDatabase', { indexedDB, IDBKeyRange });
        db.version(1).stores({
            pets: PetIndex, // Primary key and indexed props
        });
        //@ts-ignore
        await db.pets.add(item);
    });
});
