import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';
import { SignatureId } from '../model/index.js';

/** @internal */
export const FETCH_FUNCTION_SIGNATURE = `${name}/FETCH_FUNCTION_SIGNATURE`;
/** @category Actions */
export const fetchFunctionSignature = createAction(FETCH_FUNCTION_SIGNATURE, (payload: SignatureId) => {
    return {
        payload,
    };
});
/** @internal */
export type FetchFunctionSignatureAction = ReturnType<typeof fetchFunctionSignature>;
/** @internal */
export const isFetchFunctionSignatureAction = fetchFunctionSignature.match;

export default fetchFunctionSignature;