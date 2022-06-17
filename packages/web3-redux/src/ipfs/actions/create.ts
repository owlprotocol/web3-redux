import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { isCIDGuard } from '../../utils/index.js';
import { name } from '../common.js';
import { Ipfs } from '../model/interface.js';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Actions */
export const create = createAction(CREATE, (payload: Ipfs, uuid?: string) => {
    isCIDGuard(payload.contentId);
    return {
        payload,
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
