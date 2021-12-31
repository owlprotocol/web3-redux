import { TransactionReceipt } from 'web3-eth';
import { toChecksumAddress, toHex } from 'web3-utils';
import { getId as getBlockId } from '../../block/model/id';
import { ModelWithId } from '../../types/model';

/** @internal */
export interface TransactionId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Transaction hash. */
    readonly hash: string;
}

/**
 * Transaction object.
 * Extends the web3 interface.
 *
 */
export interface Transaction extends TransactionId {
    /** Used to index transactions in redux-orm. Computed as `${networkId}-${hash}`. */
    readonly id?: string;
    /** The number of transactions made by the sender prior to this one. */
    readonly nonce?: number;
    /** 32 bytes. Hash of the block where this transaction was in. `null` if pending */
    readonly blockHash?: string | null;
    /** Block number where this transaction was in. `null` if pending */
    readonly blockNumber?: number | null;
    /** Integer of the transactions index position in the block. `null` if pending */
    readonly transactionIndex?: number | null;
    /** Address of the sender */
    readonly from?: string;
    /** Address of the receiver. `null` if it’s a contract creation transaction */
    readonly to?: string | null;
    /** Value transferred in wei */
    readonly value?: string;
    /**  Gas price provided by the sender in wei */
    readonly gasPrice?: string;
    /** Gas provided by the sender */
    readonly gas?: number;
    /** The data sent along with the transaction */
    readonly input?: string;
    /** Used to index the block this transaction is in. Computed as `${networkId}-${blockNumber}` */
    readonly blockId?: string | null;
    /** Transaction receipt. */
    readonly receipt?: TransactionReceipt;
    /** Confirmed blocks */
    readonly confirmations?: number;
}

const SEPARATOR = '-';
/** @internal */
export function getId(id: TransactionId): string {
    return [id.networkId, id.hash].join(SEPARATOR);
}

/** @internal */
export function validate(item: Transaction): ModelWithId<Transaction> {
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

export default Transaction;
