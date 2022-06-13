import { selectContractEvents } from './selectContractEventsById.js';
import { uniq, flatten } from '../../utils/lodash/index.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';
export const selectERC1155TokenIds = (state: any, networkId: string | undefined, address: string | undefined) => {
    if (!networkId || !address) return undefined;

    //Mint events have from = address(0)
    const eventsTransferSingle =
        selectContractEvents(state, { networkId, address }, 'TransferSingle', {
            from: ADDRESS_0,
        }) ?? [];
    const eventsTransferBatch =
        selectContractEvents(state, { networkId, address }, 'TransferBatch', {
            from: ADDRESS_0,
        }) ?? [];

    const tokenIdsSingle = eventsTransferSingle.map((e) => e.returnValues.id) as string[];
    const tokenIdsBatch = flatten(eventsTransferBatch.map((e) => e.returnValues.ids) as string[][]);
    return uniq([...tokenIdsSingle, ...tokenIdsBatch]);
};

export default selectERC1155TokenIds;
