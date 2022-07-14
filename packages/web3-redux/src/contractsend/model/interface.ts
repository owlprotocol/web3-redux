import { v4 as uuidv4 } from 'uuid';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';

/**
 * @enum
 */
export enum ContractSendStatus {
    /** Pending wallet signature. No transaction hash. */
    PENDING_SIGNATURE = 'PENDING_SIGNATURE',
    /** Errored. Wallet rejection or network error. */
    ERROR = 'ERROR',
    /** Pending blockchain confirmation. Hash created but 0 confirmations. */
    PENDING_CONFIRMATION = 'PENDING_CONFIRMATION',
    /** Transaction confirmations > 0. */
    CONFIRMED = 'CONFIRMED',
}

export interface ContractSendId {
    /** unique uuid identifying send action */
    readonly uuid: string;
}
export interface ContractSend extends ContractSendId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Contract ethereum address */
    readonly address: string;
    /** Contract method name */
    readonly methodName: string;
    /** Contract method parameters */
    readonly args?: any[];
    /** Send address */
    readonly from: string;
    /** Value sent in wei */
    readonly value?: any;
    /** Transaction hash. Generated once data is signed.` */
    readonly transactionHash?: string;
    /** Track status of send transaction */
    readonly status: ContractSendStatus;
    /** Error */
    readonly error?: any;
    /** Receipt generated once data sent to node */
    readonly receipt?: any;
    /** Confirmation blocks */
    readonly confirmations?: number;
    /** First confirmed block number */
    readonly blockNumber?: number;
    /** First confirmed block hash */
    readonly blockHash?: string;
}

export const ContractSendIndex = 'uuid, [networkId+address+from]';

/** @internal */
export function getArgsId(args?: any[]) {
    if (!args || args.length == 0) return '()';

    const argsStr = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : a)).join(',');
    return `(${argsStr})`;
}

/** @internal */
export function getOptionsId(from: string | undefined, value: string | undefined) {
    if ((!from || from == ADDRESS_0) && (!value || value == '0')) return undefined;

    const options: any = {};
    if (from) options.from = from.toLowerCase();
    if (value) options.value = value;

    return JSON.stringify(value);
}

/** @internal */
export function validateId({ uuid }: ContractSendId) {
    return {
        uuid,
    };
}

/** @internal */
export function validate(item: ContractSend): ContractSend {
    const uuid = item.uuid ?? uuidv4();
    const addressChecksum = item.address.toLowerCase();
    const fromCheckSum = item.from.toLowerCase();
    return {
        ...item,
        uuid,
        address: addressChecksum,
        from: fromCheckSum,
    };
}

export default ContractSend;
