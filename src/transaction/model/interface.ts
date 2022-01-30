import { TransactionReceipt } from 'web3-eth';
import { toChecksumAddress, toHex } from 'web3-utils';
import { getId as getBlockId } from '../../block/model/id';
import { ModelWithId } from '../../types/model';

/** Transaction id components */
export interface TransactionId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Transaction hash.
     *
     * Should be unique to blockchain if using proper replay protection but we still use `networkId` just in case.
     * This is also consistent with how other data in the store is indexed by network.  */
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
    /** Transaction receipt. */
    readonly receipt?: TransactionReceipt;
    /** Confirmed blocks */
    readonly confirmations?: number;

    /** ORM Relational */
    /** @hidden */
    //readonly network?: Network;
    /** @hidden Used to index the block this transaction is in. Computed as `${networkId}-${blockNumber}` */
    readonly blockId?: string | null;
    //readonly block?: Block
    /** @hidden */
    readonly fromId?: string;
    /** @hidden */
    //readonly fromContract?: string;
    /** @hidden */
    readonly toId?: string;
    /** @hidden */
    //readonly toContract?: string;
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

    const result = {
        ...item,
        id,
        to: toChecksum,
        from: fromCheckSum,
    };

    if (gasPriceHex) result.gasPrice = gasPriceHex;
    if (blockId) result.blockId = blockId;

    return result;
}

export default Transaction;
