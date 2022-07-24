export interface HTTPCacheId {
    readonly id: string;
}
export interface HTTPCache extends HTTPCacheId {
    /** HTTP url */
    readonly url?: string;
    /** Response data */
    readonly data?: any;
    /** Used CORS Proxyy */
    readonly corsProxied?: boolean;
}

export const HTTPCacheIndex = 'id';
