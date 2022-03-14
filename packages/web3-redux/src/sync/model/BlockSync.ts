import { BaseSync } from './BaseSync.js';

/**
 * Sync middleware to handle {@link BlockHeader} CREATE/UPDATE actions.
 */
export interface BlockSync extends BaseSync {
    type: 'Block';
    matchBlockNumberModulo?: number;
}

/** Triggers every N (default=1) block of network
 * @param networkId Network blocks to monitor
 * @param actions Array of actions to dispatch per trigger
 * @param N
 */
export function createBlockSyncEveryBlock(
    networkId: string,
    actions: BlockSync['actions'],
    matchBlockNumberModulo?: number,
): BlockSync {
    return {
        type: 'Block',
        networkId,
        actions,
        matchBlockNumberModulo,
    };
}

export default BlockSync;
