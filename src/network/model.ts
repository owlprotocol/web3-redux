import { attr, Model as ORMModel } from 'redux-orm';
import Web3 from 'web3';
import { Contract as Web3Contract } from 'web3-eth-contract';

/**
 * EVM Network Id object.
 *
 * @param networkId - A network id.
 */
export interface NetworkId {
    networkId: string;
}

/**
 * EVM Network object.
 * @see {@link https://chainid.network//} for a list of popular EVM Networks.
 *
 * @param networkId - A network id.
 * @param web3 - A web3 object.
 * @param web3Sender - A web3 object used for send transactions.
 */
export interface Network {
    networkId: string;
    web3: Web3;
    web3Sender: Web3;
    multicallAddress?: string;
    multicallContract?: Web3Contract;
    gasLimit: number;
}

export interface NetworkPartial {
    networkId: string;
    web3: Web3;
    web3Sender?: Web3;
    multicallAddress?: string;
    gasLimit?: number;
}

class Model extends ORMModel {
    static options = {
        idAttribute: 'networkId',
    };

    static modelName = 'Network';

    static fields = {
        networkId: attr(),
        web3: attr(),
    };
}

export { Model };
