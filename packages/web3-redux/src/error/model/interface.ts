import { omit } from '../../utils/lodash';

export interface ReduxErrorId {
    readonly id: string;
}
/**
 * Store errors for dispatched actions
 */
export interface ReduxError extends ReduxErrorId {
    readonly errorMessage?: string;
    readonly stack?: string;
    readonly type?: string;
}

export interface ReduxErrorWithObjects extends ReduxError {
    readonly error?: Error;
}

//Hack
export const ReduxErrorIndex = '++id2, id';

/** @internal */
export function validateId({ id }: ReduxErrorId) {
    return { id };
}

/** @internal */
export function validate(item: ReduxError): ReduxError {
    return item as ReduxError;
}

/**
 * Hydrate error with objects.
 * @param error
 */
export function hydrate(error: ReduxError): ReduxErrorWithObjects {
    return {
        ...error,
        error: new Error(error.errorMessage),
    };
}

/**
 * Encode error
 * @param error
 */
export function encode(error: ReduxErrorWithObjects): ReduxError {
    return omit(error, ['error']);
}

export default ReduxError;
