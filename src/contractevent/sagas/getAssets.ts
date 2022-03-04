import { put, call, all } from 'typed-redux-saga/macro';
import invariant from 'tiny-invariant';
import { AbiCoder } from 'web3-eth-abi';
import lodash from 'lodash';
import { batchActions } from 'redux-batched-actions';

import getPastLogs from './getPastLogs';
import IERC20 from '../../abis/token/ERC20/IERC20.sol/IERC20.json';
import IERC721 from '../../abis/token/ERC721/IERC721.sol/IERC721.json';
import IERC1155 from '../../abis/token/ERC1155/IERC1155.sol/IERC1155.json';

import { create as createContract } from '../../contract/actions';
import { GetAssetsAction, GET_ASSETS, getPastLogs as getPastLogsAction } from '../actions';
import networkExists from '../../network/sagas/exists';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const coder: AbiCoder = require('web3-eth-abi');

const GET_ASSETS_ERROR = `${GET_ASSETS}/ERROR`;

//Event logs, comments denote [indexed params] - [unindexed data]
const ERC20Transfer = IERC20.abi.find((a) => a.name === 'Transfer'); //[Transfer, from, to] - [data]
//const ERC721Transfer = IERC721.abi.find((a) => a.name === 'Transfer');          //[Transfer, from, to, tokenId] - []
const ERC1155Transfer = IERC1155.abi.find((a) => a.name === 'TransferSingle'); //[TransferSingle, operator, from, to] - [tokenId]

//both have same topics[0]
const ERC20or721TransferTopic = coder.encodeEventSignature(ERC20Transfer as any);
//const ERC721TransferTopic = coder.encodeEventSignature(ERC721Transfer as any);
const ERC1155TransferTopic = coder.encodeEventSignature(ERC1155Transfer as any);

function* getAssets(action: GetAssetsAction) {
    try {
        const { payload } = action;
        const { networkId, address } = payload;

        const network = yield* call(networkExists, networkId);
        const web3 = network.web3 ?? network.web3Sender;
        invariant(web3, `Network ${networkId} missing web3`);

        const addressTopic = coder.encodeParameter('address', address);

        //Call getPastLogs saga
        const ERC20or721LogsFrom = call(
            getPastLogs,
            getPastLogsAction({ networkId, topics: [ERC20or721TransferTopic, addressTopic, null] }),
        );
        const ERC20or721LogsTo = call(
            getPastLogs,
            getPastLogsAction({ networkId, topics: [ERC20or721TransferTopic, null, addressTopic] }),
        );
        const ERC1155LogsFrom = call(
            getPastLogs,
            getPastLogsAction({ networkId, topics: [ERC1155TransferTopic, null, addressTopic, null] }),
        );
        const ERC1155LogsTo = call(
            getPastLogs,
            getPastLogsAction({ networkId, topics: [ERC1155TransferTopic, null, null, addressTopic] }),
        );

        //Flatten and parse results
        const results = yield* all([ERC20or721LogsFrom, ERC20or721LogsTo, ERC1155LogsFrom, ERC1155LogsTo]);

        const ERC20or721Logs = lodash.flatten(lodash.compact([results[0], results[1]]));
        const ERC20Logs = ERC20or721Logs.filter((l) => l.topics.length === 3);
        const ERC721Logs = ERC20or721Logs.filter((l) => l.topics.length === 4); //tokenId indexed
        const ERC20Address = lodash.uniq(lodash.map(ERC20Logs, 'address'));
        const ERC721Address = lodash.uniq(lodash.map(ERC721Logs, 'address'));

        const ERC1155Logs = lodash.flatten(lodash.compact([results[2], results[3]]));
        const ERC1155Address = lodash.uniq(lodash.map(ERC1155Logs, 'address'));

        //console.debug({ ERC20Address, ERC721Address, ERC1155Address })

        //Dispatch Contract create actions
        const ERC20CreateAction = ERC20Address.map((a) =>
            createContract({ networkId, address: a, abi: IERC20.abi as any }),
        );
        const ERC721CreateAction = ERC721Address.map((a) =>
            createContract({ networkId, address: a, abi: IERC721.abi as any }),
        );
        const ERC1155CreateAction = ERC1155Address.map((a) =>
            createContract({ networkId, address: a, abi: IERC1155.abi as any }),
        );
        const actions = [...ERC20CreateAction, ...ERC721CreateAction, ...ERC1155CreateAction];
        if (actions.length > 0) {
            const batchAction = batchActions(actions, `${createContract.type}/${actions.length}`);
            yield* put(batchAction);
        }

        return { ERC20Address, ERC721Address, ERC1155Address };
    } catch (error) {
        console.error(error);
        yield* put({
            type: GET_ASSETS_ERROR,
            error,
            action,
        });
    }
}

export default getAssets;
