import { Model as ORMModel } from 'redux-orm';
import Web3 from 'web3';
import { NetworkId } from '../network/model';
import { ZERO_ADDRESS } from '../utils';

/**
 * EthCall object. Used to index web3.eth.call().
 * {@link https://web3js.readthedocs.io/en/v1.3.4/web3-eth.html#call}
 *
 * @param id - Call id. Computed as `${networkId}-${from}-${to}-${data}-${gas}`.
 */
export interface EthCall extends NetworkId {
    id: string;
    from: string; //defaults to ZERO_ADDRESS
    to: string;
    defaultBlock: string;
    data: string;
    gas?: string;
    returnValue?: any; //returned value from smart contract
}

export interface PartialEthCall extends NetworkId {
    from?: string;
    to: string;
    defaultBlock?: string | number;
    data: string;
    gas?: string | number;
    returnValue?: any; //returned value from smart contract
}

export type EthCallId = string | EthCall;

class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'EthCall';

    static fields = {};
}

export function validatedEthCall(ethCall: PartialEthCall): EthCall {
    const { networkId, from, to, defaultBlock, data, gas } = ethCall;
    const block = defaultBlock ? `${defaultBlock}` : 'latest';
    const fromCheckSum = Web3.utils.toChecksumAddress(from ?? ZERO_ADDRESS);
    const toCheckSum = Web3.utils.toChecksumAddress(to);
    const gasHex = gas ? Web3.utils.toHex(gas) : undefined;
    const id = `${networkId}-${fromCheckSum}-${toCheckSum}-${block}-${data}-${gasHex}`;

    return {
        ...ethCall,
        id,
        from: fromCheckSum,
        to: toCheckSum,
        defaultBlock: block,
        gas: gasHex,
    };
}

export { Model };
