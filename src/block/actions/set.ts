import { name } from '../common';
import BlockHeader from '../model/BlockHeader';
import { getId, BlockId } from '../model/id';

/** @internal */
export const SET = (key: keyof BlockHeader) => `${name}/SET/${key.toUpperCase()}`;
/** @internal */
export interface SetActionInput {
    id: BlockId;
    key: keyof BlockHeader;
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
export const isSetAction = (action: { type: string; payload?: { key?: keyof BlockHeader } }) =>
    !!action.payload?.key && action.type === SET(action.payload.key);

export default set;
