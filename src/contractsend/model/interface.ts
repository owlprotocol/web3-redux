import { toChecksumAddress } from 'web3-utils';
import { getId as getContractId } from '../../contract/model/interface';
import { getTransactionId } from '../../transaction/model';
import { ZERO_ADDRESS } from '../../utils';
import { ModelWithId } from '../../types/model';

/** @internal */
export interface ContractSendId {
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
}

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
export interface ContractSend extends ContractSendId {
    /** Used to index send data in redux-orm. Computed as `${networkId}-${address}-{methodName}-{[args]}-{options}` */
    readonly id?: string;
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
    if ((!from || from == ZERO_ADDRESS) && (!value || value == '0')) return undefined;

    const options: any = {};
    if (from) options.from = toChecksumAddress(from);
    if (value) options.value = value;

    return JSON.stringify(value);
}

/** @internal */
const SEPARATOR = '-';
/** @internal */
export function getId(id: ContractSendId): string {
    if (typeof id === 'string') return id;

    const contractId = getContractId({ networkId: id.networkId, address: id.address });
    const argsId = getArgsId(id.args);
    const optionsId = getOptionsId(id.from, id.value);

    let idStr = [contractId, id.methodName, argsId].join(SEPARATOR);
    if (optionsId) idStr = [idStr, optionsId].join(SEPARATOR);

    return idStr;
}

/** @internal */
export function validate(item: ContractSend): ModelWithId<ContractSend> {
    const id = getId(item);
    const addressChecksum = toChecksumAddress(item.address);
    const fromCheckSum = toChecksumAddress(item.from);
    const contractId = getContractId(item);
    const transactionId = item.transactionHash
        ? getTransactionId({ hash: item.transactionHash, networkId: item.networkId })
        : undefined;
    return {
        ...item,
        id,
        address: addressChecksum,
        from: fromCheckSum,
        contractId,
        transactionId,
    };
}

export default ContractSend;
