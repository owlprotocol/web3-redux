// db.ts
import Dexie, { Table } from 'dexie';
//@ts-ignore
import setGlobalVars from 'indexeddbshim';
import { BlockTransaction, BlockIndex } from './block/model/index.js';
import { Contract, ContractIndex } from './contract/model/index.js';
import { ContractEvent, ContractEventIndex } from './contractevent/model/index.js';
import { ContractSend, ContractSendIndex } from './contractsend/model/index.js';
import { ReduxError, ReduxErrorIndex } from './error/model/index.js';
import { EthCall, EthCallIndex } from './ethcall/model/index.js';
import { Http, HttpIndex } from './http/model/index.js';
import { Ipfs, IpfsIndex } from './ipfs/model/index.js';
import { Network, NetworkIndex } from './network/model/index.js';
import { Transaction, TransactionIndex } from './transaction/model/index.js';

import isClient from './utils/isClient.js';

export class Web3ReduxDexie extends Dexie {
    blocks!: Table<BlockTransaction>;
    contracts!: Table<Contract>;
    contractEvents!: Table<ContractEvent>;
    contractSends!: Table<ContractSend>;
    errors!: Table<ReduxError>;
    ethCalls!: Table<EthCall>;
    httpCache!: Table<Http>;
    ipfsCache!: Table<Ipfs>;
    networks!: Table<Network>;
    transactions!: Table<Transaction>;

    constructor() {
        super('Web3Redux');
        this.version(1).stores({
            blocks: BlockIndex,
            contracts: ContractIndex,
            contractEvents: ContractEventIndex,
            contractSends: ContractSendIndex,
            errors: ReduxErrorIndex,
            ethCalls: EthCallIndex,
            httpCache: HttpIndex,
            ipfsCache: IpfsIndex,
            networks: NetworkIndex,
            transactions: TransactionIndex,
        });
    }
}

let db: Web3ReduxDexie;
interface GetDBOptions {
    fake: boolean;
}

export function setDB(newDb: Web3ReduxDexie) {
    db = newDb;
}

export function getDB(options?: GetDBOptions) {
    if (db) return db;
    db = createDB(options);
    return db;
}

export function createDB(options?: GetDBOptions) {
    if (!isClient() || options?.fake) {
        console.debug('Creating Dexie with fake-indexeddb');
        const shim: any = {};
        //@ts-ignore
        //global.window = global; // We'll allow ourselves to use `window.indexedDB` or `indexedDB` as a global
        setGlobalVars(shim, { checkOrigin: false }); // See signature below
        const { indexedDB, IDBKeyRange } = shim;
        Dexie.dependencies.indexedDB = indexedDB;
        Dexie.dependencies.IDBKeyRange = IDBKeyRange;
    } else {
        console.debug('Creating Dexie with real indexeddb');
    }
    return new Web3ReduxDexie();
}

export default getDB;
