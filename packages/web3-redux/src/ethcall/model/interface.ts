const ADDRESS_0 = '0x0000000000000000000000000000000000000000';
/** EthCall id components */
export interface EthCallId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** `to` field of call */
    readonly to: string;
    /** `data` field for call */
    readonly data: string;
    /** Historical block height to execute call. Defaults to `latest` */
    readonly defaultBlock?: number | 'latest';
    /** `from` field of call. Some providers may default this to `null` or `ADDRESS_0`. */
    readonly from?: string;
    /** Maximum `gas` field for call. */
    readonly gas?: number;
}
export interface EthCall extends EthCallId {
    /** Contract Call indexing */
    readonly methodName?: string;
    readonly methodSignature?: string;
    readonly args?: any[];
    /** Return value of call. Can be raw bytes or decoded with a contract ABI. */
    readonly returnValue?: any;
    /** Last returnValue updated UTC timestamp */
    readonly lastUpdated?: number;
    /** Status */
    readonly status?: 'LOADING' | 'SUCCESS' | 'ERROR';
    /** Error Id */
    readonly errorId?: string;
}

export const EthCallIndex = '[networkId+to+data+defaultBlock+from+gas]'; //, [networkId+to+methodName+&args]';

/** @internal */
export function getOptionsId(from: EthCallId['from'], block: EthCallId['defaultBlock'], gas: EthCallId['gas']) {
    if ((!from || from == ADDRESS_0) && (block == undefined || block == 'latest') && gas == undefined) return undefined;

    const options: any = {};
    if (from) options.from = from.toLowerCase();
    if (block) options.block = block;
    if (gas) options.gas = gas;

    return JSON.stringify(block);
}

/** @internal */
export function getIdArgs(id: EthCallId): EthCallId {
    const { networkId, to, data, defaultBlock, from, gas } = id;
    const val: any = {
        networkId,
        to,
        data,
    };
    if (defaultBlock) val.defaultBlock = defaultBlock;
    if (from) val.from = from;
    if (gas) val.gas = gas;

    return val;
}

/** @internal */
export function validateId(item: Partial<EthCallId>) {
    return [
        item.networkId,
        item.to?.toLowerCase(),
        item.data,
        item.defaultBlock ?? 'latest',
        item.from?.toLowerCase() ?? ADDRESS_0,
        item.gas ?? 0,
    ] as [string, string, string, number | 'latest', string, number];
}

/** @internal */
export function validate(item: Partial<EthCall>): EthCall {
    const [networkId, to, data, defaultBlock, from, gas] = validateId(item);

    return {
        ...item,
        networkId,
        to,
        data,
        defaultBlock,
        from,
        gas,
    };
}

export default EthCall;
