import { name } from '../common';
import { Transaction, getId, TransactionId } from '../model/interface';

/** @internal */
export const SET = (key: keyof Transaction) => `${name}/SET/${key.toUpperCase()}`;
/** @internal */
export interface SetActionInput {
    id: TransactionId;
    key: keyof Transaction;
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
export const isSetAction = (action: { type: string; payload?: { key?: keyof Transaction } }) =>
    !!action.payload?.key && action.type === SET(action.payload.key);

export default set;
