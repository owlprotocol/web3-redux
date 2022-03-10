import { createAction } from '@reduxjs/toolkit';
import Web3 from 'web3';
import { name } from '../common.js';
import { Network, validate } from '../model/index.js';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction(CREATE, (payload: Network) => {
    const copy = { ...payload };
    if (payload.web3Rpc && !payload.web3) copy.web3 = new Web3(payload.web3Rpc); //Overwrite web3

    return { payload: validate(copy) };
});

/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;
