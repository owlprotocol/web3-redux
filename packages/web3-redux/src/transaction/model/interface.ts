import type { TransactionReceipt } from 'web3-core';
import { toChecksumAddress, isHexStrict, hexToNumberString } from '../../utils/web3-utils/index.js';
import { getId as getBlockId } from '../../block/model/id.js';
import { ModelWithId } from '../../types/model.js';

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

    /** Gas price provided by the sender in wei */
    readonly gasPrice?: string;
    /** Gas provided by the sender */
    readonly gas?: number;
    /** Gas used */
    readonly gasUsed?: number;
    /** Total gas used */
    readonly cumulativeGasUsed?: number;
    /**
     * The actual value per gas deducted from the senders account.
     * Before EIP-1559, this is equal to the transaction’s gas price.
     * After, it is equal to
     * baseFeePerGas + min(maxFeePerGas - baseFeePerGas, maxPriorityFeePerGas). */
    readonly effectiveGasPrice?: number;

    /** The data sent along with the transaction */
    readonly input?: string;
    /** Transaction receipt. */
    readonly receipt?: TransactionReceipt;
    /** Confirmed blocks */
    readonly confirmations?: number;
    /** Etherscan contract genesis tx */
    readonly contractAddress?: string;
    /** Ethersan timestamp */
    readonly timeStamp?: number;

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
    const to = item.to ? toChecksumAddress(item.to.slice()) : undefined;
    const from = item.from ? toChecksumAddress(item.from.slice()) : undefined;
    const contractAddress = item.contractAddress ? toChecksumAddress(item.contractAddress.slice()) : undefined;
    const gasPriceNumber = item.gasPrice
        ? isHexStrict(item.gasPrice)
            ? hexToNumberString(item.gasPrice)
            : item.gasPrice
        : undefined;
    const blockId = item.blockNumber ? getBlockId({ networkId: item.networkId, number: item.blockNumber }) : undefined;

    const result = {
        ...item,
        id,
    };

    if (to) result.to = to;
    if (from) result.from = from;
    if (contractAddress) result.contractAddress = contractAddress;
    if (gasPriceNumber) result.gasPrice = gasPriceNumber;
    if (blockId) result.blockId = blockId;

    return result;
}

export default Transaction;
