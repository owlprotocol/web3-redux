import { createAction } from '../../utils/createAction.js';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

/** @internal */
export const FETCH = `${name}/FETCH`;
/** Block fetch action.  Uses web3.eth.getBlock(). */
/** @internal */
export interface FetchActionInput {
    networkId: string;
    /** The block number or block hash. Or the string "earliest", "latest" or "pending" */
    blockHashOrBlockNumber: string | number;
    /**
     * If specified true, the returned block will contain all transactions as objects. If false it will only contains the transaction hashes.
     * @defaultValue `true`
     */
    returnTransactionObjects?: boolean;
}
/** @category Actions */
export const fetchAction = createAction(FETCH, (payload: FetchActionInput, uuid?: string) => {
    return {
        payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

/** @internal */
export type FetchAction = ReturnType<typeof fetchAction>;
/** @internal */
export const isFetchAction = fetchAction.match;

export default fetchAction;
