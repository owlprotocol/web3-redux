/**
 * Store errors for dispatched actions
 */
export interface ReduxError {
    /* UUID */
    readonly id: string;
    readonly error: Error;
    readonly type?: string;
}

export default ReduxError;
