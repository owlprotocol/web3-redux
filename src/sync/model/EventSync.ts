import { isMatch } from 'lodash';
import { ContractEvent } from '../../contractevent/model';
import BaseSync from './BaseSync';

/**
 * Sync middleware to handle [ContractEvent](./ContractEvent.ContractEvent-1) CREATE/UPDATE actions.
 */
export default interface EventSync<T extends any = { [key: string]: string }> extends BaseSync<ContractEvent, T> {
    type: 'Event';
}

//TODO: Test filter
export function createEventSync(
    networkId: string,
    eventName: string,
    returnValuesFilter: { [k: string]: any },
    actions?: EventSync['actions'],
) {
    return {
        type: 'Event',
        filter: (event) =>
            event.networkId === networkId &&
            event.name === eventName &&
            isMatch(event.returnValues, returnValuesFilter),
        actions,
    } as EventSync;
}
