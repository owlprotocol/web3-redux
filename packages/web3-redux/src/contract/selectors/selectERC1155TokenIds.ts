import invariant from 'tiny-invariant';
import { selectContractEvents } from './selectContractEventsById.js';
import { uniq, flatten } from '../../utils/lodash/index.js';
import { isAddress } from '../../utils/web3-utils/index.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';
export const selectERC1155TokenIds = (state: any, networkId: string | undefined, address: string | undefined) => {
    if (!networkId || !address) return undefined;
    if (address) invariant(isAddress(address), `${address} invalid contract address!`);
    const addressChecksum = address.toLowerCase(); //Copy string

    //Mint events have from = address(0)
    const TransferSingle =
        selectContractEvents(state, { networkId, address: addressChecksum }, 'TransferSingle', {
            from: ADDRESS_0,
        }) ?? [];
    const TransferBatch =
        selectContractEvents(state, { networkId, address: addressChecksum }, 'TransferBatch', {
            from: ADDRESS_0,
        }) ?? [];

    const tokenIdsSingle = TransferSingle.map((e) => e.returnValues.id) as string[];
    const tokenIdsBatch = flatten(TransferBatch.map((e) => e.returnValues.ids) as string[][]);
    const tokenIds = uniq([...tokenIdsSingle, ...tokenIdsBatch]);
    const events = { TransferSingle, TransferBatch };
    return [tokenIds, events] as [typeof tokenIds, typeof events];
};

export default selectERC1155TokenIds;
