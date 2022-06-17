import invariant from 'tiny-invariant';
import { selectContractEvents } from './selectContractEventsById.js';
import { uniq } from '../../utils/lodash/index.js';
import { isAddress } from '../../utils/web3-utils/index.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';
export const selectERC721TokenIds = (state: any, networkId: string | undefined, address: string | undefined) => {
    if (!networkId || !address) return undefined;
    if (address) invariant(isAddress(address), `${address} invalid contract address!`);
    const addressChecksum = address.toLowerCase();

    //Mint events have from = address(0)
    const Transfer =
        selectContractEvents(state, { networkId, address: addressChecksum }, 'Transfer', {
            from: ADDRESS_0,
        }) ?? [];
    const tokenIds = uniq(Transfer.map((e) => e.returnValues.tokenId)) as string[];
    const events = { Transfer };
    return [tokenIds, events] as [typeof tokenIds, typeof events];
};

export default selectERC721TokenIds;
