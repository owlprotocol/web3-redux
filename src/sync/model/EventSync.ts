import { ContractEvent as Event } from '../../contractevent/model';
import BaseSync from './BaseSync';

export default interface EventSync extends BaseSync {
    type: 'Event';
    filter: (x: Event) => boolean;
}
