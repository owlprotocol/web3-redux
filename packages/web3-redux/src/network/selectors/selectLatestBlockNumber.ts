import selectByIdSingle from './selectByIdSingle.js';

/** @category Selectors */
function selectLatestBlockNumber(state: any, id: string | undefined) {
    const network = selectByIdSingle(state, id);
    if (!network) return undefined;

    return network.latestBlockNumber;
}

export default selectLatestBlockNumber;
