import { createAction } from '@reduxjs/toolkit';
import Web3 from 'web3';
import { name } from '../common.js';
import { Network, validate } from '../model/index.js';

/** @internal */
export const UPDATE = `${name}/UPDATE`;
/** @category Actions */
export const update = createAction(UPDATE, (payload: Network) => {
    const copy = { ...payload };
    if (payload.web3Rpc && !payload.web3) copy.web3 = new Web3(payload.web3Rpc); //Overwrite web3

    return { payload: validate(copy) };
});

/** @internal */
export type UpdateAction = ReturnType<typeof update>;
/** @internal */
export const isUpdateAction = update.match;

export default update;
