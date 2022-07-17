export interface HTTPCacheId {
    readonly id: string;
}
export interface Http extends HTTPCacheId {
    /** HTTP url */
    readonly url?: string;
    /** Response data */
    readonly data?: any;
    /** Used CORS Proxyy */
    readonly corsProxied?: boolean;
}

export const HttpIndex = 'id';

/** @internal */
export function validateId(item: HTTPCacheId) {
    return item;
}

/** @internal */
export function validate(item: Http): Http {
    return item;
}

export default Http;
