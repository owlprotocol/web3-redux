import { v4 as uuidv4 } from 'uuid';
import { BaseSync } from './BaseSync.js';

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
    uuid?: string,
): EventSync {
    return {
        id: uuid ?? uuidv4(),
        type: 'Event',
        networkId,
        actions,
        matchAddress,
        matchName,
        matchReturnValues,
    };
}

export default EventSync;
