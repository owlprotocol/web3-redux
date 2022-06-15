import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';
import { Http } from '../model/index.js';

/** @internal */
export const CREATE = `${name}/CREATE`;
/** @category Action */
export const create = createAction(CREATE, (payload: Http) => {
    return { payload };
});
/** @internal */
export type CreateAction = ReturnType<typeof create>;
/** @internal */
export const isCreateAction = create.match;

export default create;
