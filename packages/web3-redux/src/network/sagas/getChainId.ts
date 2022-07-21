import { put, call } from 'typed-redux-saga';
import { GetChainIdAction } from '../actions/index.js';
import NetworkCRUD from '../crud.js';

function* getChainId(action: GetChainIdAction) {
    const { payload } = action;
    const web3 = payload;

    const chainId = yield* call(web3.eth.getChainId);
    yield* put(NetworkCRUD.actions.upsert({ networkId: `${chainId}` }));
}

export default getChainId;
