import selectLatestBlockNumber from './selectLatestBlockNumber';
import { selectByIdSingle } from '../../block/selectors';

/** @category Selectors */
function selectLatestBlock(state: any, id: string | undefined) {
    if (!id) return undefined;

    const latestBlockNumber = selectLatestBlockNumber(state, id);
    if (!latestBlockNumber) return undefined;

    const block = selectByIdSingle(state, { networkId: id, number: latestBlockNumber });
    return block;
}

export default selectLatestBlock;
