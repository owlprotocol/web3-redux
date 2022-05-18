/**
 * Store errors for dispatched actions
 */
export interface Error {
    /* UUID */
    readonly id: string;
    readonly error: Error;
}

export default Error;
