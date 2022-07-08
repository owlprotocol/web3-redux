import { Config } from './config/model/interface.js';
import { Contract } from './contract/model/interface.js';
import { Network } from './network/model/index.js';

export interface StateRoot {
    web3Redux: State;
}

/**
 * Redux State Interface for the `web3Redux` slice.
 */
export interface State {
    /** Redux ORM */
    ['@@_______REDUX_ORM_STATE_FLAG']: boolean;
    /** Singleton global config */
    Config: {
        items: [0];
        itemsById: { [0]: Config };
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
    /** Networks indexed by id */
    Network: {
        items: string[];
        itemsById: { [networkId: string]: Network };
    };
}

export default State;
