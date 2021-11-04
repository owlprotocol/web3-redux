import { TransactionReceipt } from 'web3-eth';
import { toChecksumAddress, toHex } from 'web3-utils';
import { getId as getBlockId } from '../../block/model/id';

export interface IdDeconstructed {
    readonly networkId: string;
    readonly hash: string;
}
export type Id = string;

/**
 * Transaction object.
 * Extends the web3 interface.
 *
 * @param id - Tx id. Used to index transactions in redux-orm. Computed as `${networkId}-${hash}`.
 * @param networkId - A network id.
 * @param blockId - Tx id. Used to index the block this transaction is in. Computed as `${networkId}-${blockNumber}`.
 * @param receipt - Tx receipt. Applicable when this is a pending sent transaction.
 * @param confirmations - Tx confirmations. Applicable when this is a pending sent transaction.
 * @param hash - 32 Bytes - String: Hash of the transaction.
 * @param nonce - Number: The number of transactions made by the sender prior to this one.
 * @param blockHash - 32 Bytes - String: Hash of the block where this transaction was in. null if pending.
 * @param blockNumber - Number: Block number where this transaction was in. null if pending.
 * @param transactionIndex - Number: Integer of the transactions index position in the block. null if pending.
 * @param from - String: Address of the sender.
 * @param to - String: Address of the receiver. null if it’s a contract creation transaction.
 * @param value - String: Value transferred in wei.
 * @param gasPrice  - String: Gas price provided by the sender in wei.
 * @param gas - Number: Gas provided by the sender.
 * @param input - String: The data sent along with the transaction.
 */
export interface Interface extends IdDeconstructed {
    readonly id?: Id;
    //Web3
    readonly nonce?: number;
    readonly blockHash?: string | null;
    readonly blockNumber?: number | null;
    readonly transactionIndex?: number | null;
    readonly from?: string;
    readonly to?: string | null;
    readonly value?: string;
    readonly gasPrice?: string;
    readonly gas?: number;
    readonly input?: string;
    //Other
    readonly blockId?: string | null;
    readonly receipt?: TransactionReceipt;
    readonly confirmations?: number;
}

export type IdArgs = IdDeconstructed | Id;
const SEPARATOR = '-';
export function getId(id: IdArgs): Id {
    if (typeof id === 'string') return id;

    return [id.networkId, id.hash].join(SEPARATOR);
}

export function validate(item: Interface): Interface {
    const id = getId(item);
    const toChecksum = item.to ? toChecksumAddress(item.to) : undefined;
    const fromCheckSum = item.from ? toChecksumAddress(item.from) : undefined;
    const gasPriceHex = item.gasPrice ? toHex(item.gasPrice) : undefined;
    const blockId = item.blockNumber ? getBlockId({ networkId: item.networkId, number: item.blockNumber }) : undefined;

    return {
        ...item,
        id,
        to: toChecksum,
        from: fromCheckSum,
        gasPrice: gasPriceHex,
        blockId,
    };
}

export default Interface;
