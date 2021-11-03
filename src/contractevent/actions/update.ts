import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { Interface, validate } from '../model/interface';

export const UPDATE = `${name}/UPDATE`;
export const update = createAction(UPDATE, (payload: Interface) => {
    return { payload: validate(payload) };
});

export type UpdateAction = ReturnType<typeof update>;
export const isUpdateAction = update.match;

export default update;
