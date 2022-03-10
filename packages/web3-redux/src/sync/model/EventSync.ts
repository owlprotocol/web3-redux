import { BaseSync } from './BaseSync';

/**
 * Sync middleware to handle [ContractEvent](./ContractEvent.ContractEvent-1) CREATE/UPDATE actions.
 */
export interface EventSync extends BaseSync {
    type: 'Event';
    matchAddress: string;
    matchName: string;
    matchReturnValues?: { [k: string]: any } | { [k: string]: any }[];
}

export function createEventSync(
    networkId: string,
    actions: EventSync['actions'],
    matchAddress: string,
    matchName: string,
    matchReturnValues: EventSync['matchReturnValues'],
): EventSync {
    return {
        type: 'Event',
        networkId,
        actions,
        matchAddress,
        matchName,
        matchReturnValues,
    };
}

export default EventSync;
