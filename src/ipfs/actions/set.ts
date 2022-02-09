import { name } from '../common';
import { Ipfs } from '../model/interface';

/** @internal */
export const SET = (key: keyof Ipfs) => `${name}/SET/${key.toUpperCase()}`;
/** @internal */
export interface SetActionInput {
    contentId: string;
    key: keyof Ipfs;
    value: any;
}
/** @category Actions */
export const set = (payload: SetActionInput) => {
    return {
        type: SET(payload.key),
        payload: {
            contentId: payload.contentId,
            key: payload.key,
            value: payload.value,
        },
    };
};

/** @internal */
export type SetAction = ReturnType<typeof set>;
/** @internal */
export const isSetAction = (action: { type: string; payload?: { key: keyof Ipfs } }) =>
    !!action.payload?.key && action.type === SET(action.payload.key);

export default set;
