import { Action } from 'redux';
import { ContractEvent as Event } from '../../contractevent/model';
import BaseSync from './BaseSync';

export default interface EventSync extends BaseSync {
    type: 'Event';
    filter: (x: Event) => boolean;
    actions: Action[] | ((x: Event) => Action[]);
}

export function defaultEventSync(actions: EventSync['actions']) {
    return {
        type: 'Event',
        filter: () => false,
        actions,
    } as EventSync;
}
