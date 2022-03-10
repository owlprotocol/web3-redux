import { _4ByteSignature, SignatureId } from '../model/index.js';
import { name } from '../common.js';

/** @internal */
export const SET = (key: keyof _4ByteSignature) => `${name}/SET/${key.toUpperCase()}`;
/** @internal */
export interface SetActionInput {
    id: SignatureId;
    key: keyof _4ByteSignature;
    value: any;
}

/** @category Actions */
export const set = (payload: SetActionInput) => {
    return {
        type: SET(payload.key),
        payload: {
            id: { signatureHash: payload.id.signatureHash },
            key: payload.key,
            value: payload.value,
        },
    };
};

/** @internal */
export type SetAction = ReturnType<typeof set>;
/** @internal */
export const isSetAction = (action: { type: string; payload?: { key?: keyof _4ByteSignature } }) =>
    !!action.payload?.key && action.type === SET(action.payload.key);

export default set;
