export interface ReduxErrorId {
    readonly id: string;
}
/**
 * Store errors for dispatched actions
 */
export interface ReduxError extends ReduxErrorId {
    readonly error: Error;
    readonly errorMessage?: string;
    readonly type?: string;
}

//TODO: hydrate Error object

export const ReduxErrorIndex = 'id';

/** @internal */
export function validateId(item: Partial<ReduxErrorId>) {
    if (!item.id) throw new Error('id undefined');
    return item.id;
}

/** @internal */
export function validate(item: Partial<ReduxError>): ReduxError {
    return item as ReduxError;
}

export default ReduxError;
