import { v4 as uuidv4 } from 'uuid';
import { toChecksumAddress } from '../../utils/web3-utils/index.js';
import { getId as getContractId } from '../../contract/model/interface.js';
import { getTransactionId } from '../../transaction/model/index.js';

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
export interface ContractSend {
    /** unique uuid identifying send action */
    readonly uuid: string;
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
    /** redux-orm id of contract send `${networkId}-{address}` */
    readonly contractId?: string;
    /** Transaction hash. Generated once data is signed.` */
    readonly transactionHash?: string;
    /** redux-orm id of transaction `${networkId}-{transactionHash}` */
    readonly transactionId?: string;
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
    if (from) options.from = toChecksumAddress(from.slice());
    if (value) options.value = value;

    return JSON.stringify(value);
}

/** @internal */
export function validate(item: ContractSend): ContractSend {
    const uuid = item.uuid ?? uuidv4();
    const addressChecksum = toChecksumAddress(item.address.slice());
    const fromCheckSum = toChecksumAddress(item.from.slice());
    const contractId = getContractId(item);
    const transactionId = item.transactionHash
        ? getTransactionId({ hash: item.transactionHash, networkId: item.networkId })
        : undefined;
    return {
        ...item,
        uuid,
        address: addressChecksum,
        from: fromCheckSum,
        contractId,
        transactionId,
    };
}

export default ContractSend;
