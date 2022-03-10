import { name } from '../common.js';
import { EthCall, getId, EthCallId } from '../model/interface.js';

/** @internal */
export const SET = (key: keyof EthCall) => `${name}/SET/${key.toUpperCase()}`;
/** @internal */
export interface SetActionInput {
    id: EthCallId;
    key: keyof EthCall;
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
export const isSetAction = (action: { type: string; payload?: { key?: keyof EthCall } }) =>
    !!action.payload?.key && action.type === SET(action.payload.key);

export default set;
