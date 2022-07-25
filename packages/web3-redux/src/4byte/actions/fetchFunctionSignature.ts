import { v4 as uuidv4 } from 'uuid';
import { createAction } from '../../utils/createAction.js';
import { name } from '../common.js';
import { _4ByteSignatureId } from '../model/index.js';

/** @internal */
export const FETCH_FUNCTION_SIGNATURE = `${name}/FETCH_FUNCTION_SIGNATURE`;
/** @category Actions */
export const fetchFunctionSignatureAction = createAction(
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
export type FetchFunctionSignatureAction = ReturnType<typeof fetchFunctionSignatureAction>;
/** @internal */
export const isFetchFunctionSignatureAction = fetchFunctionSignatureAction.match;
