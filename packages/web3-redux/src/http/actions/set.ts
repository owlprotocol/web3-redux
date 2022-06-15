import { Http } from '../model/index.js';
import { name } from '../common.js';

/** @internal */
export const SET = (key: keyof Http) => `${name}/SET/${key.toUpperCase()}`;
/** @internal */
export interface SetActionInput {
    id: string;
    key: keyof Http;
    value: any;
}

/** @category Actions */
export const set = (payload: SetActionInput) => {
    return {
        type: SET(payload.key),
        payload: {
            id: payload.id,
            key: payload.key,
            value: payload.value,
        },
    };
};

/** @internal */
export type SetAction = ReturnType<typeof set>;
/** @internal */
export const isSetAction = (action: { type: string; payload?: { key?: keyof Http } }) =>
    !!action.payload?.key && action.type === SET(action.payload.key);

export default set;
