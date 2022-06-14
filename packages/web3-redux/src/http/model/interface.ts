export interface Http {
    /** ORM id */
    readonly id?: string;
    /** HTTP url */
    readonly url?: string;
    /** Response data */
    readonly data?: any;
}

export default Http;
