import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';
import { Http } from '../model/index.js';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Action */
export const create = createAction(CREATE, (payload: Http, uuid?: string) => {
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
