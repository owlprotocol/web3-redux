import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';
import { _4ByteSignatureId } from '../model/index.js';

/** @internal */
export const FETCH_EVENT_SIGNATURE = `${name}/FETCH_EVENT_SIGNATURE`;
/** @category Actions */
export const fetchEventSignature = createAction(FETCH_EVENT_SIGNATURE, (payload: _4ByteSignatureId, uuid?: string) => {
    return {
        payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type FetchEventSignatureAction = ReturnType<typeof fetchEventSignature>;
/** @internal */
export const isFetchEventSignatureAction = fetchEventSignature.match;

export default fetchEventSignature;
