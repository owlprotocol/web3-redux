import { toChecksumAddress } from 'web3-utils';
import { getId as getContractId } from '../../contract/model/interface';
import { getTransactionId } from '../../transaction/model';
import { ZERO_ADDRESS } from '../../utils';

export interface IdDeconstructed {
    readonly networkId: string;
    readonly address: string;
    readonly methodName: string;
    readonly args?: any[];
    readonly from: string;
    readonly value?: any;
}
export type Id = string;

export enum ContractSendStatus {
    PENDING_SIGNATURE = 'PENDING_SIGNATURE', //Pending wallet signature
    ERROR = 'ERROR',
    PENDING_CONFIRMATION = 'PENDING_CONFIRMATION', //Pending blockchain confirmation
    CONFIRMED = 'CONFIRMED',
}
export interface Interface extends IdDeconstructed {
    readonly id?: Id;
    readonly contractId?: string;
    readonly transactionHash?: string;
    readonly transactionId?: string;
    readonly status: ContractSendStatus;
    readonly error?: any;
    readonly receipt?: any;
    readonly confirmations?: number;
    readonly blockNumber?: number;
    readonly blockHash?: string;
}

export function getArgsId(args?: any[]) {
    if (!args || args.length == 0) return '()';

    const argsStr = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : a)).join(',');
    return `(${argsStr})`;
}

export function getOptionsId(from: string | undefined, value: string | undefined) {
    if ((!from || from == ZERO_ADDRESS) && (!value || value == '0')) return undefined;

    const options: any = {};
    if (from) options.from = toChecksumAddress(from);
    if (value) options.value = value;

    return JSON.stringify(value);
}

export type IdArgs = IdDeconstructed | Id;
const SEPARATOR = '-';
export function getId(id: IdArgs): Id {
    if (typeof id === 'string') return id;

    const contractId = getContractId({ networkId: id.networkId, address: id.address });
    const argsId = getArgsId(id.args);
    const optionsId = getOptionsId(id.from, id.value);

    let idStr = [contractId, id.methodName, argsId].join(SEPARATOR);
    if (optionsId) idStr = [idStr, optionsId].join(SEPARATOR);

    return idStr;
}

export function validate(item: Interface): Interface {
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

export default Interface;
