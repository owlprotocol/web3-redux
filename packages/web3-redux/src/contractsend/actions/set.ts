import { name } from '../common.js';
import { ContractSend } from '../model/interface.js';

/** @internal */
export const SET = (key: keyof ContractSend) => `${name}/SET/${key.toUpperCase()}`;
/** @internal */
export interface SetActionInput {
    id: string;
    key: keyof ContractSend;
    value: any;
}
/** @category Actions */
export const set = (payload: SetActionInput) => {
    const id = payload.id;
    const key = payload.key;
    const value = payload.value;
    return { type: SET(key), payload: { id, key, value } };
};

/** @internal */
export type SetAction = ReturnType<typeof set>;
/** @internal */
export const isSetAction = (action: { type: string; payload?: { key?: keyof ContractSend } }) =>
    !!action.payload?.key && action.type === SET(action.payload.key);

export default set;
