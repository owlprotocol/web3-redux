import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../../common.js';
import { Http } from '../../model/index.js';

/** @internal */
export const UPDATE = `${name}/UPDATE`;
/** @category Actions */
export const updateAction = createAction(UPDATE, (payload: Http, uuid?: string) => {
    return {
        payload: payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type UpdateAction = ReturnType<typeof updateAction>;
/** @internal */
export const isUpdateAction = updateAction.match;

export default updateAction;
