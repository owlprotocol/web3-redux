import { createAction } from '@reduxjs/toolkit';
import { name } from './common';
import { accountId } from '../model';

export const SET = `${name}/SET`;
export interface SetActionInput {
    networkId: string;
    address: string;
    key: string;
    value: any;
}
export const set = createAction(SET, (payload: SetActionInput) => {
    const id = accountId(payload);
    return { payload: { ...payload, id } };
});

export type SetAction = ReturnType<typeof set>;
export const isSetAction = set.match;
