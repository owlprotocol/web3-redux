import { assert } from 'chai';
import Web3 from 'web3';
import selectERC721TokenUris from './selectERC721TokenUris.js';
import selectERC721TokenIds from './selectERC721TokenIds.js';
import { coder } from '../../utils/web3-eth-abi/index.js';
import { cloneDeep } from '../../utils/lodash/index.js';

import { IERC721Metadata as IERC721MetadataArtifact } from '../../abis/index.js';
import { ADDRESS_0, ADDRESS_1 } from '../../test/data.js';
import { REDUX_ROOT } from '../../common.js';
import { getOrm } from '../../orm.js';

import { Contract, validate } from '../model/interface.js';

import { validateEthCall } from '../../ethcall/model/index.js';
import { StateRoot } from '../../state.js';
import { ModelWithId } from '../../types/model.js';
import { validateContractEvent } from '../../contractevent/index.js';

describe('contracts/selectors/selectERC721TokenIds.test.ts', () => {
    const networkId = '1337';
    const web3 = new Web3();
    //Contract
    const address = ADDRESS_1;
    const abi = cloneDeep(IERC721MetadataArtifact.abi) as any;
    const web3Contract = new web3.eth.Contract(abi, address);
    const contract: ModelWithId<Contract> = validate({
        networkId,
        address,
        abi,
        web3Contract,
    });

    //EthCall
    const method = 'tokenURI';
    const methodAbi = (cloneDeep(IERC721MetadataArtifact.abi) as any).filter((f: any) => f.name === method)[0];
    const data = coder.encodeFunctionCall(methodAbi, ['1']);
    const ethCall = validateEthCall({
        networkId,
        from: ADDRESS_0,
        to: ADDRESS_1,
        data,
        returnValue: 'https://api.com/1',
    });

    //ContractEvent
    const event0 = validateContractEvent({
        networkId,
        address: ADDRESS_1,
        name: 'Transfer',
        blockHash: '0x0',
        logIndex: 0,
        returnValues: { from: ADDRESS_0, to: ADDRESS_1, tokenId: '0' },
        returnValuesIndexKeys: ['from'],
    });

    const event1 = validateContractEvent({
        networkId,
        address: ADDRESS_1,
        name: 'Transfer',
        blockHash: '0x0',
        logIndex: 1,
        returnValues: { from: ADDRESS_0, to: ADDRESS_1, tokenId: '1' },
        returnValuesIndexKeys: ['from'],
    });
    const events = [event0, event1];

    //State
    const state: StateRoot = {
        [REDUX_ROOT]: getOrm().getEmptyState(),
    };

    before(() => {
        state[REDUX_ROOT]['Contract'].items.push(contract.id);
        state[REDUX_ROOT]['Contract'].itemsById[contract.id] = contract;

        //Set Eth Call
        state[REDUX_ROOT]['EthCall'].items.push(ethCall.id);
        state[REDUX_ROOT]['EthCall'].itemsById[ethCall.id!] = ethCall;

        //Set Event
        let ContractEventIndexIds = 0;
        events.forEach((e) => {
            state[REDUX_ROOT]['ContractEvent'].items.push(e.id);
            state[REDUX_ROOT]['ContractEvent'].itemsById[e.id!] = e;
            e.indexIds?.forEach((eventIndex) => {
                state[REDUX_ROOT]['ContractEventIndex'].items.push(eventIndex);
                state[REDUX_ROOT]['ContractEventIndex'].itemsById[eventIndex] = {
                    id: eventIndex,
                };

                //Set Event Index
                state[REDUX_ROOT]['ContractEventIndexIds'].items.push(`${ContractEventIndexIds}`);
                state[REDUX_ROOT]['ContractEventIndexIds'].itemsById[ContractEventIndexIds] = {
                    toContractEventIndexId: eventIndex,
                    fromContractEventId: e.id,
                    id: ContractEventIndexIds,
                };
                if (!state[REDUX_ROOT]['ContractEventIndexIds'].indexes.fromContractEventId[e.id!])
                    state[REDUX_ROOT]['ContractEventIndexIds'].indexes.fromContractEventId[e.id!] = [];
                state[REDUX_ROOT]['ContractEventIndexIds'].indexes.fromContractEventId[e.id!].push(
                    ContractEventIndexIds,
                );
                if (!state[REDUX_ROOT]['ContractEventIndexIds'].indexes.toContractEventIndexId[eventIndex])
                    state[REDUX_ROOT]['ContractEventIndexIds'].indexes.toContractEventIndexId[eventIndex] = [];
                state[REDUX_ROOT]['ContractEventIndexIds'].indexes.toContractEventIndexId[eventIndex].push(
                    ContractEventIndexIds,
                );

                ContractEventIndexIds += 1;
            });
        });

        //Test
        const selected = selectERC721TokenIds(state, networkId, address);
        const tokenIds = selected ? selected[0] : undefined;
        assert.deepEqual(tokenIds, ['0', '1']);
    });

    describe('selectERC721TokenUris', () => {
        it('baseUri/<tokenId>', () => {
            const tokenUris = selectERC721TokenUris(state, networkId, address);
            assert.deepEqual(tokenUris, ['https://api.com/0', 'https://api.com/1']);
        });

        it('baseUri/<tokenId>.json', () => {
            //@ts-expect-error
            ethCall.returnValue = 'https://api.com/1.json';
            const tokenUris = selectERC721TokenUris(state, networkId, address);
            assert.deepEqual(tokenUris, ['https://api.com/0.json', 'https://api.com/1.json']);
        });

        it('baseUri/{id}.json', () => {
            //@ts-expect-error
            ethCall.returnValue = 'https://api.com/{id}.json';

            const tokenUris = selectERC721TokenUris(state, networkId, address);
            assert.deepEqual(tokenUris, ['https://api.com/0.json', 'https://api.com/1.json']);
        });

        it('baseUri/Token1', () => {
            //@ts-expect-error
            ethCall.returnValue = 'https://api.com/token1';

            const tokenUris = selectERC721TokenUris(state, networkId, address);
            assert.deepEqual(tokenUris, [undefined, 'https://api.com/token1']);
        });
    });
});
