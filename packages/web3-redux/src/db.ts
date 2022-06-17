// eslint-disable-next-line import/no-unresolved
import { Connector } from 'indexeddb-orm';
import { REDUX_ROOT } from './common.js';
import isClient from './utils/isClient.js';
import { settings as BlockSettings } from './block/model/ormDB.js';
import { settings as ContractSettings } from './contract/model/ormDB.js';
import { settings as ContractEventSettings } from './contractevent/model/ormDB.js';
import { settings as EthCallSettings } from './ethcall/model/ormDB.js';
import { settings as HttpSettings } from './http/model/ormDB.js';
import { settings as IPFSSettings } from './ipfs/model/ormDB.js';
import { settings as NetworkSettings } from './network/model/ormDB.js';
import { settings as TransactionSettings } from './transaction/model/ormDB.js';

if (!isClient()) {
    require('fake-indexeddb/auto');
    console.debug('Running in NodeJS Context. Setting up fake-indexeddb');
}

const settings = {
    name: REDUX_ROOT,
    version: 1,
    tables: [
        BlockSettings,
        ContractSettings,
        ContractEventSettings,
        EthCallSettings,
        HttpSettings,
        IPFSSettings,
        NetworkSettings,
        TransactionSettings,
    ],
};

let db: Connector;
export async function getDB() {
    if (db) return db;

    if (!isClient()) {
        require('fake-indexeddb/auto');
        console.debug('Running in NodeJS Context. Setting up fake-indexeddb');
    }

    db = new Connector(settings);
    return db;
}

export default getDB;
