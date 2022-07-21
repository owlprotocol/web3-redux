import { AnyAction } from 'redux';

export interface BaseSyncId {
    id: string;
}
/**
 * Ethereum Sync. Represents middleware that will trigger actions on certain events.
 *
 */
export interface BaseSync extends BaseSyncId {
    /** Type of sync. Block, Transaction, or Event */
    type: string;
    /** Network Id to filter on */
    networkId: string;
    /** Actions to dispatch when triggered */
    actions: AnyAction[];
}

/** @internal */
export function validateId(item: Partial<BaseSyncId>) {
    return item.id;
}

export default BaseSync;
