import { attr, fk, Model as ORMModel } from 'redux-orm';
import { NetworkId } from '../network/model';
import { Transaction, validatedTransaction } from '../transaction/model';
import { isStrings } from '../utils';

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
export interface BlockHeader extends NetworkId {
    /** Block id. Used to index blocks in redux-orm. Computed as `${networkId}-${number}`. */
    id?: string;
    number: number;
    hash?: string;
    parentHash?: string;
    nonce?: string;
    sha3Uncles?: string;
    logsBloom?: string;
    transactionRoot?: string;
    stateRoot?: string;
    receiptRoot?: string;
    miner?: string;
    extraData?: string;
    gasLimit?: number;
    gasUsed?: number;
    timestamp?: number | string;
}

/**
 * Block object with additional data. Typically returned by individual Web3 getBlock request.
 * @see {@link BlockHeader} for additional params.
 *
 * @param size - Number: Integer the size of this block in bytes.
 * @param difficulty - String: Integer of the difficulty for this block.
 * @param totalDifficulty - String: Integer of the total difficulty of the chain until this block.
 * @param uncles - Array: Array of uncle hashes.
 */
export interface BlockTransactionBase extends BlockHeader {
    size?: number;
    difficulty?: number;
    totalDifficulty?: number;
    uncles?: string[];
}

/**
 * Block object with transaction hash data.
 * @see {@link BlockTransactionBase} for additional params.
 *
 * @param transactions - Array of 32 Bytes transaction hashes
 */
export interface BlockTransactionString extends BlockTransactionBase {
    transactions: string[];
}

/**
 * Block object with full transaction data.
 * @see {@link BlockHeader} for additional params.
 *
 * @param transactions - Array: Array of {@link Transaction} objects
 */
export interface BlockTransactionObject extends BlockTransactionBase {
    transactions: Transaction[];
}
export type BlockTransaction = BlockTransactionString | BlockTransactionObject;

/**
 * Block Id object.
 *
 * @param networkId - A network id.
 * @param number - Number: The block number. null if a pending block.
 */
export interface BlockId extends NetworkId {
    number: number;
}
export type Block = BlockHeader | BlockTransaction;

export function isBlockTransaction(block: Block): block is BlockTransaction {
    return !!(block as BlockTransaction).transactions;
}
export function isBlockTransactionString(block: Block): block is BlockTransactionString {
    return isBlockTransaction(block) && isStrings(block.transactions);
}
export function isBlockTransactionObject(block: Block): block is BlockTransactionObject {
    return isBlockTransaction(block) && !isStrings(block.transactions);
}

export class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'Block';

    static fields = {
        number: attr(),
        networkId: fk({ to: 'Network', as: 'network', relatedName: 'blocks' }),
    };
}

export function blockId({ number, networkId }: BlockId) {
    return `${networkId}-${number}`;
}

export function validatedBlock(block: Block): Block {
    if (isBlockTransactionObject(block)) {
        return {
            ...block,
            transactions: block.transactions.map((t) => validatedTransaction({ ...t, networkId: block.networkId })),
            id: blockId(block),
        };
    } else {
        return {
            ...block,
            id: blockId(block),
        };
    }
}
