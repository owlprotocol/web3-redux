import { AnyAction } from 'redux';

/**
 * Ethereum Sync. Represents middleware that will trigger actions on certain events.
 *
 */
export interface BaseSync {
    /** Used to index in redux-orm. */
    id?: string;
    /** Type of sync. Block, Transaction, or Event */
    type: string;
    /** Network Id to filter on */
    networkId: string;
    /** Actions to dispatch when triggered */
    actions: AnyAction[];
}

export default BaseSync;
