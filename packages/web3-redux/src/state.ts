import { Network } from './network/model/index.js';
import { BlockHeader } from './block/model/index.js';
import { Transaction } from './transaction/model/interface.js';
import { Contract } from './contract/model/interface.js';
import { ContractEvent } from './contractevent/model/interface.js';
import { ContractEventIndex } from './contracteventindex/model/interface.js';
import { ContractSend } from './contractsend/model/interface.js';
import { EthCall } from './ethcall/model/interface.js';
import { Config } from './config/model/interface.js';
import { Ipfs } from './ipfs/model/interface.js';
import { Sync } from './sync/model/index.js';
import { _4ByteSignature } from './4byte/model/interface.js';
import { ReduxError } from './error/model/interface.js';
import { ModelWithId } from './types/model.js';

export interface StateRoot {
    web3Redux: State;
}

/**
 * Redux State Interface for the `web3Redux` slice.
 */
export interface State {
    /** Redux ORM */
    ['@@_______REDUX_ORM_STATE_FLAG']: boolean;
    /** Redux Persist */
    ['_persist']: { version: number; rehydrated: boolean };
    /** Networks indexed by id */
    Network: {
        items: string[];
        itemsById: { [networkId: string]: Network };
    };
    /** Blocks indexed by id */
    Block: {
        items: string[];
        itemsById: { [id: string]: ModelWithId<BlockHeader> };
        indexes: {
            networkId: {
                [networkId: string]: string[];
            };
        };
    };
    /** Transactions indexed by id */
    Transaction: {
        items: string[];
        itemsById: { [id: string]: ModelWithId<Transaction> };
        indexes: {
            networkId: {
                [networkId: string]: string[];
            };
            blockId: {
                [blockId: string]: string[]; //Map blockId to list of related transactions
            };
            toId: {
                [toId: string]: string[]; //Map contractId to list of related transactions sent to
            };
            fromId: {
                [fromId: string]: string[]; //Map contractId to list of related transactions sent from
            };
        };
    };
    /** Contracts indexed by id */
    Contract: {
        items: string[];
        itemsById: { [id: string]: ModelWithId<Contract> };
        indexes: {
            networkId: {
                [networkId: string]: string[];
            };
        };
    };
    /** Contract Events indexed by id */
    ContractEvent: {
        items: string[];
        itemsById: { [id: string]: ModelWithId<ContractEvent> };
        indexes: {
            networkId: {
                [networkId: string]: string[];
            };
            contractId: {
                [contractId: string]: string[];
            };
        };
    };
    /** Custom index to efficiently filter events */
    ContractEventIndex: {
        items: string[];
        itemsById: { [id: string]: ModelWithId<ContractEventIndex> };
    };
    /** ContractSend  indexed by id */
    ContractSend: {
        items: string[];
        itemsById: { [id: string]: ModelWithId<ContractSend> };
        indexes: {
            transactionId: {
                [transactionId: string]: string[];
            };
        };
    };
    /** EthCalls indexed by id */
    EthCall: {
        items: string[];
        itemsById: { [id: string]: ModelWithId<EthCall> };
    };
    /** Singleton global config */
    Config: {
        items: [0];
        itemsById: { [0]: ModelWithId<Config> };
    };
    /** 4Byte elements indexed by id */
    _4Byte: {
        items: string[];
        itemsById: { [id: string]: ModelWithId<_4ByteSignature> };
    };
    //** Sync dynamic middleware */
    Sync: {
        items: string[];
        itemsById: { [id: string]: ModelWithId<Sync> };
    };
    Ipfs: {
        items: string[];
        itemsById: { [id: string]: Ipfs };
    };
    /** Join table for events and indices */
    ContractEventIndexIds: {
        items: string[];
        itemsById: { [id: string]: any };
        indexes: {
            fromContractEventId: {
                [contractEventId: string]: number[];
            };
            toContractEventIndexId: {
                [contractEventIndexId: string]: number[];
            };
        };
    };
    /** Errors for redux actions */
    Error: {
        items: string[];
        itemsById: { [id: string]: ReduxError };
    };
}

export default State;
