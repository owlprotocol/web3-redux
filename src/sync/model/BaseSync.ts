import { AnyAction } from 'redux';

/**
 * Ethereum Sync. Represents middleware that will trigger actions on certain events.
 *
 */
export default interface BaseSync<R extends any = any, T extends any = { [key: string]: string }> {
    /** Used to index in redux-orm. */
    id?: string;
    /** Type of sync. Block, Transaction, or Event */
    type: string;
    /** Filter function that serves as trigger */
    filter: (x: R, cache?: T | undefined) => boolean;
    /** Update function for the cache */
    updateCache?: (x: R, cache: T | undefined) => T;
    /** Actions to dispatch when triggered */
    actions?: AnyAction[] | ((x: R) => AnyAction[]);
    /** Local cache to add statefulness to the filter function. */
    cache?: T;
}
