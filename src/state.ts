import Network from './network/model/interface';
import Block from './block/model/interface';
import Transaction from './transaction/model/interface';
import Contract from './contract/model/interface';
import ContractEvent from './contractevent/model/interface';
import ContractEventIndex from './contracteventindex/model/interface';
import ContractSend from './contractsend/model/interface';
import EthCall from './ethcall/model/interface';
import Config from './config/model/interface';
import Account from './account/model/interface';

/**
 * Redux State Interface for the `web3Redux` slice.
 */
export interface State {
    /** Networks indexed by id */
    Network: {
        items: string[];
        itemsById: { [id: string]: Network };
    };
    /** Blocks indexed by id */
    Block: {
        items: string[];
        itemsById: { [id: string]: Block };
        indexes: {
            networkId: {
                [networkId: string]: string[];
            };
        };
    };
    /** Transactions indexed by id */
    Transaction: {
        items: string[];
        itemsById: { [id: string]: Transaction };
        indexes: {
            networkId: {
                [networkId: string]: string[];
            };
            blockId: {
                [blockId: string]: string[];
            };
        };
    };
    /** Contracts indexed by id */
    Contract: {
        items: string[];
        itemsById: { [id: string]: Contract };
        indexes: {
            networkId: {
                [networkId: string]: string[];
            };
        };
    };
    /** Contract Events indexed by id */
    ContractEvent: {
        items: string[];
        itemsById: { [id: string]: ContractEvent };
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
        itemsById: { [id: string]: ContractEventIndex };
    };
    /** ContractSend  indexed by id */
    ContractSend: {
        items: string[];
        itemsById: { [id: string]: ContractSend };
        indexes: {
            transactionId: {
                [transactionId: string]: string[];
            };
        };
    };
    /** EthCalls indexed by id */
    EthCall: {
        items: string[];
        itemsById: { [id: string]: EthCall };
    };
    /** Singleton global config */
    Config: {
        items: [0];
        itemsById: { [0]: Config };
    };
    /** Accounts indexed by id */
    Account: {
        items: string[];
        itemsById: { [id: string]: Account };
    };
    /** Join table for events and indices */
    ContractEventIndexIds: {
        items: string[];
        itemsById: { [id: string]: any };
        indexes: {
            fromContractEventId: {
                [contractEventId: string]: string[];
            };
            toContractEventIndexId: {
                [contractEventIndexId: string]: string[];
            };
        };
    };
}
