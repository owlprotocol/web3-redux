import { toChecksumAddress } from 'web3-utils';
import { getId } from '../contract/model';

/**
 * EthCall object. Used to index web3.eth.call().
 * {@link https://web3js.readthedocs.io/en/v1.3.4/web3-eth.html#call}
 *
 * @param id - Call id. Computed as `${networkId}-${from}-${to}-${data}-${gas}`.
 */
export interface EthCall {
    id?: string;
    networkId: string;
    to: string;
    data: string;
    defaultBlock?: number | 'latest';
    from?: string;
    gas?: number;
    returnValue?: any; //returned value from smart contract
}

export type EthCallId = string | EthCall;

export function validatedEthCall(ethCall: EthCall): EthCall {
    const { networkId, from, to, defaultBlock, data, gas } = ethCall;
    const fromCheckSum = from ? toChecksumAddress(from) : undefined;
    const toCheckSum = toChecksumAddress(to);

    let id = '';
    const contractHash = getId({ networkId, address: toCheckSum });
    id = `${contractHash}`;
    id = `${id}.(${data})`;

    const options: any = {};
    if (fromCheckSum) options.from = fromCheckSum;
    if (defaultBlock && defaultBlock != 'latest') options.block = defaultBlock;
    if (gas) options.gas = gas;

    const optionsId = JSON.stringify(options);
    if (optionsId != '{}') id = `${id}-${optionsId}`;

    return {
        ...ethCall,
        id,
        from: fromCheckSum,
        to: toCheckSum,
    };
}
