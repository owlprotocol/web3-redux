import BaseSync from './BaseSync';

/**
 * Sync middleware to handle [ContractEvent](./ContractEvent.ContractEvent-1) CREATE/UPDATE actions.
 */
export interface EventSync extends BaseSync {
    type: 'Event';
    matchName: string;
    matchReturnValues?: { [k: string]: any } | { [k: string]: any }[];
}

export function createEventSync(
    networkId: string,
    actions: EventSync['actions'],
    matchName: string,
    matchReturnValues: EventSync['matchReturnValues'],
): EventSync {
    return {
        type: 'Event',
        networkId,
        actions,
        matchName,
        matchReturnValues,
    };
}

export default EventSync;
