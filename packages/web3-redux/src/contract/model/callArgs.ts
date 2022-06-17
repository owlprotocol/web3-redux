import { getId } from './interface.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';
export interface CallArgsHash<P extends any[] = any[]> {
    args?: P;
    defaultBlock?: number | 'latest';
    from?: string;
}
export function callArgsHash<P extends any[] = any[]>(callArgs?: CallArgsHash<P>): string {
    if (!callArgs) return '()';

    const { args, from, defaultBlock } = callArgs!;
    const fromCheckSum = from ? from.toLowerCase() : undefined;

    let id = '';

    if (!args || args.length === 0) id = '()';
    else id = `(${args.join(',')})`;

    const options: any = {};
    if (defaultBlock && defaultBlock != 'latest') options.defaultBlock = defaultBlock;
    if (fromCheckSum && fromCheckSum != ADDRESS_0) options.from = fromCheckSum;
    const optionsId = JSON.stringify(options);
    if (optionsId != '{}') id = `${id}-${optionsId}`;

    return id;
}

export function callHash(
    networkId: string | undefined,
    address: string | undefined,
    method: string | undefined,
    callArgs?: CallArgsHash,
): string {
    const contractHash = getId({ networkId, address });
    const callArgsId = callArgsHash(callArgs);

    const idArgs = [contractHash, method, callArgsId];
    const id = idArgs.join('-');
    return id;
}
