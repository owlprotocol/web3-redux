import { toChecksumAddress } from 'web3-utils';
import { ZERO_ADDRESS } from '../../utils';
import { getId } from './interface';

export interface CallArgsHash<P extends any[] = any[]> {
    args?: P;
    defaultBlock?: number | 'latest';
    from?: string;
}
export function callArgsHash<P extends any[] = any[]>(callArgs?: CallArgsHash<P>): string {
    if (!callArgs) return '()';

    const { args, from, defaultBlock } = callArgs!;
    const fromCheckSum = from ? toChecksumAddress(from) : undefined;

    let id = '';

    if (!args || args.length === 0) id = '()';
    else id = `(${args.join(',')})`;

    const options: any = {};
    if (defaultBlock && defaultBlock != 'latest') options.defaultBlock = defaultBlock;
    if (fromCheckSum && fromCheckSum != ZERO_ADDRESS) options.from = fromCheckSum;
    const optionsId = JSON.stringify(options);
    if (optionsId != '{}') id = `${id}-${optionsId}`;

    return id;
}

export function callHash(networkId: string, address: string, method: string, callArgs?: CallArgsHash): string {
    const contractHash = getId({ networkId, address });
    const callArgsId = callArgsHash(callArgs);

    const idArgs = [contractHash, method, callArgsId];
    const id = idArgs.join('-');
    return id;
}
