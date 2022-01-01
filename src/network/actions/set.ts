import { name } from '../common';
import { Network, Id } from '../model/interface';

/** @internal */
export const SET = (key: keyof Network) => `${name}/SET/${key.toUpperCase()}`;
/** @internal */
export interface SetActionInput {
    id: Id;
    key: keyof Network;
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
export function isSetAction(action: { type: string; payload?: { key?: keyof Network } }): action is SetAction {
    return !!action.payload?.key && action.type === SET(action.payload.key);
}

export default set;
