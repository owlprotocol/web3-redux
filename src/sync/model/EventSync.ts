import { ContractEvent } from '../../contractevent/model';
import BaseSync from './BaseSync';

/**
 * Sync middleware to handle [ContractEvent](./ContractEvent.ContractEvent-1) CREATE/UPDATE actions.
 */
export default interface EventSync<T extends any = { [key: string]: string }> extends BaseSync<ContractEvent, T> {
    type: 'Event';
}

export function defaultEventSync(actions: EventSync['actions']) {
    return {
        type: 'Event',
        filter: () => false,
        actions,
    } as EventSync;
}
