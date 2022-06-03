import { createAction } from '@reduxjs/toolkit';
import type { IPFS } from 'ipfs';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

interface Payload {
    path: Parameters<IPFS['ls']>[0];
    options: Parameters<IPFS['ls']>[1];
}

/** @internal */
export const LS = `${name}/LS`;
/** @category Actions */
export const ls = createAction(LS, (payload: Payload) => {
    return {
        payload,
        meta: {
            uuid: uuidv4(),
        },
    };
});
/** @internal */
export type LsAction = ReturnType<typeof ls>;
/** @internal */
export const isLsAction = ls.match;

export default ls;
