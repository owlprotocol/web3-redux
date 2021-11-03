import BlockSync from './BlockSync';
import EventSync from './EventSync';
import TransactionSync from './TransactionSync';

export type Sync = BlockSync | TransactionSync | EventSync;

export type { BlockSync, EventSync, TransactionSync };
