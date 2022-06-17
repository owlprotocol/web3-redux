import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';
import { Contract, validate } from '../model/interface.js';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction(CREATE, (payload: Contract, uuid?: string) => {
    return {
        payload: validate(payload),
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
