import { createAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';
import { _4ByteSignatureId } from '../model/index.js';

/** @internal */
export const FETCH_FUNCTION_SIGNATURE = `${name}/FETCH_FUNCTION_SIGNATURE`;
/** @category Actions */
export const fetchFunctionSignature = createAction(
    FETCH_FUNCTION_SIGNATURE,
    (payload: _4ByteSignatureId, uuid?: string) => {
        return {
            payload,
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    },
);
/** @internal */
export type FetchFunctionSignatureAction = ReturnType<typeof fetchFunctionSignature>;
/** @internal */
export const isFetchFunctionSignatureAction = fetchFunctionSignature.match;

export default fetchFunctionSignature;
