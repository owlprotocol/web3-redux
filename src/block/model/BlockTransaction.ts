import Transaction from '../../transaction/model/interface';
import BlockHeader from './BlockHeader';

/**
 * Block object with additional data. Typically returned by individual Web3 getBlock request.
 * @see {@link BlockHeader} for additional params.
 *
 * @param size - Number: Integer the size of this block in bytes.
 * @param difficulty - String: Integer of the difficulty for this block.
 * @param totalDifficulty - String: Integer of the total difficulty of the chain until this block.
 * @param uncles - Array: Array of uncle hashes.
 */
export interface BlockTransaction extends BlockHeader {
    readonly size?: number;
    readonly difficulty?: number;
    readonly totalDifficulty?: number;
    readonly uncles?: string[];
    readonly transactions?: Transaction[] | string[];
}

export default BlockTransaction;
