import {
    FETCH_EVENT_SIGNATURE,
    fetchEventSignature,
    FetchEventSignatureAction,
    isFetchEventSignatureAction,
} from './fetchEventSignature.js';

import {
    FETCH_FUNCTION_SIGNATURE,
    fetchFunctionSignature,
    FetchFunctionSignatureAction,
    isFetchFunctionSignatureAction,
} from './fetchFunctionSignature.js';

/** @internal */
export type SagaAction = FetchEventSignatureAction | FetchFunctionSignatureAction;

/** @internal */
export function isSagaAction(action: { type: string }): action is SagaAction {
    return isFetchEventSignatureAction(action) || isFetchFunctionSignatureAction(action);
}

export type { FetchEventSignatureAction, FetchFunctionSignatureAction };

export {
    FETCH_EVENT_SIGNATURE,
    fetchEventSignature,
    isFetchEventSignatureAction,
    FETCH_FUNCTION_SIGNATURE,
    fetchFunctionSignature,
    isFetchFunctionSignatureAction,
};
