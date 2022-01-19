import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { SignatureId, validate } from '../model';

/** @internal */
export const FETCH_EVENT_SIGNATURE = `${name}/FETCH_Event_SIGNATURE`;
/** @category Actions */
export const fetchEventSignature = createAction(FETCH_EVENT_SIGNATURE, (payload: SignatureId) => {
    return {
        payload: validate(payload),
    };
});
/** @internal */
export type FetchEventSignatureAction = ReturnType<typeof fetchEventSignature>;
/** @internal */
export const isFetchEventSignatureAction = fetchEventSignature.match;

export default fetchEventSignature;
