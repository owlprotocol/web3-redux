import { v4 as uuidv4 } from 'uuid';
import { createAction } from '../../utils/createAction.js';
import { name } from '../common.js';

/** @internal */
export const SUBSCRIBE = `${name}/SUBSCRIBE`;

/** Subscribe to new block headers. Uses web3.eth.subscribe(). */
/** @internal */
export interface SubscribeActionInput {
    networkId: string;
    /**
     * If specified true, the returned block will contain all transactions as objects. If false it will only contains the transaction hashes.
     * @defaultValue `true`
     */
    returnTransactionObjects?: boolean;
}
/** @category Actions */
export const subscribe = createAction(SUBSCRIBE, (payload: SubscribeActionInput | string, uuid?: string) => {
    return {
        payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

/** @internal */
export type SubscribeAction = ReturnType<typeof subscribe>;
/** @internal */
export const isSubscribeAction = subscribe.match;

export default subscribe;
