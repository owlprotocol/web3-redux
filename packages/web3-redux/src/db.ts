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

if (!isClient()) {
    require('fake-indexeddb/auto');
    console.debug('Running in NodeJS Context. Setting up fake-indexeddb');
}

const settings = {
    name: REDUX_ROOT,
    version: 1, //version of database
    tables: [
        BlockSettings,
        ContractSettings,
        ContractEventSettings,
        EthCallSettings,
        HttpSettings,
        IPFSSettings,
        NetworkSettings,
    ],
};

export const db = new Connector(settings);

export default db;
