import { createAction } from '@reduxjs/toolkit';
import type { IPFS } from 'ipfs';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

interface Payload {
    path: Parameters<IPFS['get']>[0];
    options?: Parameters<IPFS['get']>[1];
}

/** @internal */
export const GET = `${name}/GET`;
/** @category Actions */
export const get = createAction(GET, (payload: Payload) => {
    return {
        payload,
        meta: {
            uuid: uuidv4(),
        },
    };
});
/** @internal */
export type GetAction = ReturnType<typeof get>;
/** @internal */
export const isGetAction = get.match;

export default get;
