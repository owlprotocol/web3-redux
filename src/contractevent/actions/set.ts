import { name } from '../common';
import { ContractEvent, getId, IdArgs } from '../model/interface';

/** @internal */
export const SET = (key: keyof ContractEvent) => `${name}/SET/${key.toUpperCase()}`;
/** @internal */
export interface SetActionInput {
    id: IdArgs;
    key: keyof ContractEvent;
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
export const isSetAction = (action: { type: string; payload?: { key?: keyof ContractEvent } }) =>
    !!action.payload?.key && action.type === SET(action.payload.key);

export default set;
