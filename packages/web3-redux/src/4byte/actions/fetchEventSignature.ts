import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';
import { SignatureId } from '../model/index.js';

/** @internal */
export const FETCH_EVENT_SIGNATURE = `${name}/FETCH_EVENT_SIGNATURE`;
/** @category Actions */
export const fetchEventSignature = createAction(FETCH_EVENT_SIGNATURE, (payload: SignatureId) => {
    return {
        payload,
    };
});
/** @internal */
export type FetchEventSignatureAction = ReturnType<typeof fetchEventSignature>;
/** @internal */
export const isFetchEventSignatureAction = fetchEventSignature.match;

export default fetchEventSignature;
