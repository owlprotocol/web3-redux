import { Action } from 'redux';

/**
 * Ethereum Sync. Represents middleware that will trigger actions on certain events.
 *
 * @param id - Used to index in redux-orm.
 * @param type - Type of sync. Block, Transaction, or Event.
 * @param filter - Filter function that serves as trigger.
 * @param actions - Actions to dispatch when triggered.
 */
export default interface BaseSync<R extends any = any, T extends any = { [key: string]: string }> {
    id?: string;
    type: string;
    filter: (x: R, cache?: T | undefined) => boolean;
    updateCache?: (x: R, cache: T | undefined) => T;
    actions?: Action[] | ((x: R) => Action[]);
    cache?: T;
}
