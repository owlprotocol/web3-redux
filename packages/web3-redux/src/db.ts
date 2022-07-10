// db.ts
import Dexie, { Table } from 'dexie';
import { REDUX_ROOT } from './common.js';

import { _4ByteSignature, _4ByteIndex } from './4byte/model/index.js';
import { BlockTransaction, BlockIndex } from './block/model/index.js';
import { Config, ConfigIndex } from './config/model/index.js';
import { Contract, ContractIndex } from './contract/model/index.js';
import { ContractEvent, ContractEventIndex } from './contractevent/model/index.js';
import { ContractSend, ContractSendIndex } from './contractsend/model/index.js';
import { ReduxError, ReduxErrorIndex } from './error/model/index.js';
import { EthCall, EthCallIndex } from './ethcall/model/index.js';
import { Http, HttpIndex } from './http/model/index.js';
import { Ipfs, IpfsIndex } from './ipfs/model/index.js';
import { Network, NetworkIndex } from './network/model/index.js';
import { Sync, SyncIndex } from './sync/model/index.js';
import { Transaction, TransactionIndex } from './transaction/model/index.js';

import isClient from './utils/isClient.js';

export class Web3ReduxDexie extends Dexie {
    _4Byte!: Table<_4ByteSignature>;
    Block!: Table<BlockTransaction>;
    Config!: Table<Config>;
    Contract!: Table<Contract>;
    ContractEvent!: Table<ContractEvent>;
    ContractSend!: Table<ContractSend>;
    ReduxError!: Table<ReduxError>;
    EthCall!: Table<EthCall>;
    HTTPCache!: Table<Http>;
    IPFSCache!: Table<Ipfs>;
    Network!: Table<Network>;
    Sync!: Table<Sync>;
    EthTransaction!: Table<Transaction>;

    constructor() {
        super(REDUX_ROOT);
        this.version(1).stores({
            _4Byte: _4ByteIndex,
            Block: BlockIndex,
            Config: ConfigIndex,
            Contract: ContractIndex,
            ContractEvent: ContractEventIndex,
            ContractSend: ContractSendIndex,
            ReduxError: ReduxErrorIndex,
            EthCall: EthCallIndex,
            HTTPCache: HttpIndex,
            IPFSCache: IpfsIndex,
            Network: NetworkIndex,
            Sync: SyncIndex,
            EthTransaction: TransactionIndex,
        });
    }

    async clear() {
        const promises = [
            this._4Byte.clear(),
            this.Block.clear(),
            this.Config.clear(),
            this.Contract.clear(),
            this.ContractEvent.clear(),
            this.ContractSend.clear(),
            this.ReduxError.clear(),
            this.EthCall.clear(),
            this.HTTPCache.clear(),
            this.IPFSCache.clear(),
            this.Network.clear(),
            this.Sync.clear(),
            this.EthTransaction.clear(),
        ];
        return Promise.all(promises);
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
    } else {
        console.debug('Creating Dexie with real indexeddb');
    }
    return new Web3ReduxDexie();
}

export default getDB;
