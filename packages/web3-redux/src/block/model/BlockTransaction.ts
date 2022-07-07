import { BlockHeader } from './BlockHeader.js';
//import { Transaction } from '../../transaction/model/index.js';

/**
 * Block object with additional data. Typically returned by individual Web3 getBlock request.
 * @see {@link BlockHeader}.
 *
 */
interface BlockTransaction extends BlockHeader {
    /**  Integer the size of this block in bytes */
    readonly size?: number;
    /** Integer of the difficulty for this block */
    readonly difficulty?: number;
    /** Integer of the total difficulty of the chain until this block */
    readonly totalDifficulty?: number;
    /** Array of uncle hashes */
    readonly uncles?: string[];
    /** Transaction objects or ids */
    //readonly transactions?: Transaction[] | string[];
}

export type { BlockTransaction };
