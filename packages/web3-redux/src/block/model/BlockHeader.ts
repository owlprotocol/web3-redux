import { BlockId } from './id';

/**
 * Block header object. Typically returned by Web3 websocket subscriptions.
 * Extends the web3 interface.
 * See [web3.eth.getBlock](https://web3js.readthedocs.io/en/v1.5.2/web3-eth.html#getblock)
 *
 */
interface BlockHeader extends BlockId {
    /** Used to index in redux-orm. Computed as `${networkId}-${number}` */
    readonly id?: string;
    /** 32 bytes. Hash of the block. null if a pending block */
    readonly hash?: string;
    /** 32 bytes. Hash of the parent block */
    readonly parentHash?: string;
    /** 8 bytes. Hash of the generated proof-of-work. null if a pending block */
    readonly nonce?: string;
    /** 32 bytes. SHA3 of the uncles data in the block */
    readonly sha3Uncles?: string;
    /** 256 bytes. The bloom filter for the logs of the block. null if a pending block */
    readonly logsBloom?: string;
    /** 32 bytes. The root of the transaction trie of the block */
    readonly transactionRoot?: string;
    /** 32 bytes. The root of the final state trie of the block */
    readonly stateRoot?: string;
    /** 32 bytes. The root of the final receipt trie of the block */
    readonly receiptRoot?: string;
    /** The address of the beneficiary to whom the mining rewards were given */
    readonly miner?: string;
    /** The “extra data” field of this block */
    readonly extraData?: string;
    /** The maximum gas allowed in this block */
    readonly gasLimit?: number;
    /** The total used gas by all transactions in this block */
    readonly gasUsed?: number;
    /** The unix timestamp for when the block was collated */
    readonly timestamp?: number | string;
}

export type { BlockHeader };
