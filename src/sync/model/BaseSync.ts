import { Action } from 'redux';

/**
 * Ethereum Sync. Represents middleware that will trigger actions on certain events.
 *
 * @param id - Used to index in redux-orm.
 * @param type - Type of sync. Block, Transaction, or Event.
 * @param filter - Filter function that serves as trigger.
 * @param actions - Actions to dispatch when triggered.
 */
export default interface BaseSync {
    id?: string;
    type: string;
    filter: (x: any) => boolean;
    actions: Action[];
}
