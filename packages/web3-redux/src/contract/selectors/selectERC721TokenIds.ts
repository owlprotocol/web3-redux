import { selectContractEvents } from './selectContractEventsById.js';
import { uniq } from '../../utils/lodash/index.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';
export const selectERC721TokenIds = (state: any, networkId: string | undefined, address: string | undefined) => {
    if (!networkId || !address) return undefined;

    //Mint events have from = address(0)
    const events =
        selectContractEvents(state, { networkId, address }, 'Transfer', {
            from: ADDRESS_0,
        }) ?? [];
    const tokenIds = events.map((e) => e.returnValues.tokenId) as string[];
    return uniq(tokenIds);
};

export default selectERC721TokenIds;
