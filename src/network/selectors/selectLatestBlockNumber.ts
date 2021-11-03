import selectLatestBlock from './selectLatestBlock';

function selectLatestBlockNumber(state: any, id: string | undefined) {
    const block = selectLatestBlock(state, id);
    if (!block) return undefined;

    return block.number;
}

export default selectLatestBlockNumber;
