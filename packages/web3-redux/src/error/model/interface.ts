/**
 * Store errors for dispatched actions
 */
export interface ReduxError {
    /* UUID */
    readonly id: string;
    readonly error: Error;
    readonly errorMessage?: string;
    readonly type?: string;
}

export default ReduxError;
