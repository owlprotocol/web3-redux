import BlockSync from './BlockSync';
import EventSync from './EventSync';
import TransactionSync from './TransactionSync';

export type Sync = BlockSync | TransactionSync | EventSync;

export { BlockSync, EventSync, TransactionSync };
