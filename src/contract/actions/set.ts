import { name } from '../common';
import { Contract, getId, IdArgs } from '../model/interface';

/** @internal */
export const SET = (key: keyof Contract) => `${name}/SET/${key.toUpperCase()}`;
/** @internal */
export interface SetActionInput {
    id: IdArgs;
    key: keyof Contract;
    value: any;
}
/** @category Actions */
export const set = (payload: SetActionInput) => {
    const id = getId(payload.id);
    const key = payload.key;
    const value = payload.value;
    return { type: SET(key), payload: { id, key, value } };
};
/** @internal */
export type SetAction = ReturnType<typeof set>;
/** @internal */
export const isSetAction = (action: { type: string; payload?: { key?: keyof Contract } }) =>
    !!action.payload?.key && action.type === SET(action.payload.key);

export default set;
