import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { fromRpc } from '../../utils/web3/index.js';
import { name } from '../common.js';
import { Network, validate } from '../model/index.js';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction(CREATE, (payload: Network, uuid?: string) => {
    const copy = { ...payload };
    if (payload.web3Rpc && !payload.web3) copy.web3 = fromRpc(payload.web3Rpc); //Overwrite web3

    return {
        payload: validate(copy),
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});

/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;
