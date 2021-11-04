import { IdDeconstructed, Id } from './id';

/**
 * Block header object. Typically returned by Web3 websocket subscriptions.
 * Extends the web3 interface.
 *
 * @param id - Block id.
 * @param networkId - A network id.
 * @param number - Number: The block number. null if a pending block.
 * @param hash - 32 Bytes - String: Hash of the block. null if a pending block.
 * @param parentHash - 32 Bytes - String: Hash of the parent block.
 * @param nonce - 8 Bytes - String: Hash of the generated proof-of-work. null if a pending block.
 * @param sha3Uncles - 32 Bytes - String: SHA3 of the uncles data in the block.
 * @param logsBloom - 256 Bytes - String: The bloom filter for the logs of the block. null if a pending block.
 * @param transactionRoot - 32 Bytes - String: The root of the transaction trie of the block.
 * @param stateRoot - 32 Bytes - String: The root of the final state trie of the block.
 * @param receiptRoot - 32 Bytes - String: The root of the final receipt trie of the block.
 * @param miner - String: The address of the beneficiary to whom the mining rewards were given.
 * @param extraData- String: The “extra data” field of this block.
 * @param gasLimit - Number: The maximum gas allowed in this block.
 * @param gasUsed- Number: The total used gas by all transactions in this block.
 * @param timestamp - Number: The unix timestamp for when the block was collated.
 */
//Id args cannot be optional
export interface BlockHeader extends IdDeconstructed {
    readonly id?: Id;
    readonly hash?: string;
    readonly parentHash?: string;
    readonly nonce?: string;
    readonly sha3Uncles?: string;
    readonly logsBloom?: string;
    readonly transactionRoot?: string;
    readonly stateRoot?: string;
    readonly receiptRoot?: string;
    readonly miner?: string;
    readonly extraData?: string;
    readonly gasLimit?: number;
    readonly gasUsed?: number;
    readonly timestamp?: number | string;
}

export default BlockHeader;
