import { Block } from '../../block/model';
import BaseSync from './BaseSync';

export default interface BlockSync extends BaseSync {
    type: 'Block';
    filter: (x: Block) => boolean;
}

export function defaultBlockSync(actions: BlockSync['actions']) {
    return {
        type: 'Block',
        filter: () => true,
        actions,
    } as BlockSync;
}

export function moduloBlockSync(actions: BlockSync['actions'], period: number) {
    return {
        type: 'Block',
        filter: (block) => block.number % period == 0,
        actions,
    } as BlockSync;
}
