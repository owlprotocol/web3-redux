import type { TransactionReceipt } from 'web3-core';
import { isHexStrict, hexToNumberString } from '../../utils/web3-utils/index.js';

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
    /** The number of transactions made by the sender prior to this one. */
    readonly nonce?: number;
    /** 32 bytes. Hash of the block where this transaction was in. `null` if pending */
    readonly blockHash?: string | null;
    /** Block number where this transaction was in. `null` if pending */
    readonly blockNumber?: number | null;
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
}

export type TransactionIndexInput =
    | TransactionId
    | { networkId: string }
    | { blockNumber: number }
    | { blockHash: string }
    | { networkId: string; from: string; to: string }
    | { networkId: string; from: string }
    | { networkId: string; to: string };
export const TransactionIndex =
    '[networkId+hash], [networkId+blockNumber], [networkId+blockHash], [networkId+from+to], [networkId+to]';

/** @internal */
export function validateId(item: TransactionId) {
    return [item.networkId, item.hash];
}

/** @internal */
export function validate(item: Transaction): Transaction {
    const to = item.to ? item.to.toLowerCase() : undefined;
    const from = item.from ? item.from.toLowerCase() : undefined;
    const contractAddress = item.contractAddress ? item.contractAddress.toLowerCase() : undefined;
    const gasPriceNumber = item.gasPrice
        ? isHexStrict(item.gasPrice)
            ? hexToNumberString(item.gasPrice)
            : item.gasPrice
        : undefined;

    const result = {
        ...item,
    };

    if (to) result.to = to;
    if (from) result.from = from;
    if (contractAddress) result.contractAddress = contractAddress;
    if (gasPriceNumber) result.gasPrice = gasPriceNumber;

    return result;
}

export default Transaction;
