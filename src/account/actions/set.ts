import { name } from '../common';
import { Account, AccountId } from '../model/interface';

/** @internal */
export const SET = (key: keyof Account) => `${name}/SET/${key.toUpperCase()}`;
/** @internal */
export interface SetActionInput {
    id: AccountId;
    key: keyof Account;
    value: any;
}
/** @category Actions */
export const set = (payload: SetActionInput) => {
    return { type: SET(payload.key), payload };
};
/** @internal */
export type SetAction = ReturnType<typeof set>;
/** @internal */
export const isSetAction = (action: { type: string; payload?: { key?: keyof Account } }) =>
    !!action.payload?.key && action.type === SET(action.payload.key);

export default set;
