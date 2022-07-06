export interface Http {
    /** ORM id */
    readonly id?: string;
    /** HTTP url */
    readonly url?: string;
    /** Response data */
    readonly data?: any;
    /** Used CORS Proxyy */
    readonly corsProxied?: boolean;
}

export const HttpIndex = 'id';

export default Http;
