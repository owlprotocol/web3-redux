import { maxBy } from 'lodash';
import selectBlocks from './selectBlocks';

function selectLatestBlock(state: any, id: string | undefined) {
    const blocks = selectBlocks(state, id);
    if (!blocks || blocks.length == 0) return undefined;

    return maxBy(blocks, 'number');
}

export default selectLatestBlock;
