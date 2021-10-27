import { ContractEvent as Event } from '../../contractevent/model';
import BaseSync from './BaseSync';

export default interface EventSync<T extends any = { [key: string]: string }> extends BaseSync<Event, T> {
    type: 'Event';
}

export function defaultEventSync(actions: EventSync['actions']) {
    return {
        type: 'Event',
        filter: () => false,
        actions,
    } as EventSync;
}
