import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { InterfacePartial, validate } from '../model/interface';

export const CREATE = `${name}/CREATE`;
export const create = createAction(CREATE, (payload: InterfacePartial) => {
    return { payload: validate(payload) };
});

export type CreateAction = ReturnType<typeof create>;
export const isCreateAction = create.match;

export default create;
