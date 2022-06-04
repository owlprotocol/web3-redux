import { createAction } from '@reduxjs/toolkit';
import type { IPFS } from 'ipfs';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

interface Payload {
    file: Parameters<IPFS['add']>[0];
    options?: Parameters<IPFS['add']>[1];
}

/** @internal */
export const ADD = `${name}/ADD`;
/** @category Actions */
export const add = createAction(ADD, (payload: Payload) => {
    return {
        payload,
        meta: {
            uuid: uuidv4(),
        },
    };
});
/** @internal */
export type AddAction = ReturnType<typeof add>;
/** @internal */
export const isAddAction = add.match;

export default add;
