/** EthCall id components */
export interface EthCallId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** `to` field of call */
    readonly to: string;
    /** `data` field for call */
    readonly data: string;
}

//Valid indexes
export type EthCallIndexInput =
    | EthCallId
    | { networkId: string }
    | { networkId: string; to: string }
    | { networkId: string; to: string; methodName: string }
    | { networkId: string; methodName: string }
    | { methodName: string };

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
    /** `from` field of call. Some providers may default this to `null` or `ADDRESS_0`. */
    readonly from?: string;
    /** Historical block height to execute call. Defaults to `latest` */
    readonly defaultBlock?: number | 'latest';
    /** Maximum `gas` field for call. */
    readonly gas?: number;
}

export const EthCallIndex = '[networkId+to+data], [networkId+to+methodName], [networkId+methodName], methodName';

/** @internal */
export function validateId(item: Partial<EthCallId>) {
    return [item.networkId, item.to?.toLowerCase(), item.data] as [string, string, string];
}

/** @internal */
export function validate(item: Partial<EthCall>): EthCall {
    const [networkId, to, data] = validateId(item);

    return {
        ...item,
        networkId,
        to,
        data,
    };
}

export default EthCall;
