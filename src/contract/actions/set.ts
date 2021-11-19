import { name } from '../common';
import { Interface, getId, IdArgs } from '../model/interface';

export const SET = (key: keyof Interface) => `${name}/SET/${key.toUpperCase()}`;
export interface SetActionInput {
    id: IdArgs;
    key: keyof Interface;
    value: any;
}
export const set = (payload: SetActionInput) => {
    const id = getId(payload.id);
    const key = payload.key;
    const value = payload.value;
    return { type: SET(key), payload: { id, key, value } };
};

export type SetAction = ReturnType<typeof set>;
export const isSetAction = (action: { type: string; payload?: { key?: keyof Interface } }) =>
    !!action.payload?.key && action.type === SET(action.payload.key);

export default set;
