import { put, call } from 'typed-redux-saga';
import { create as createAction, GetChainIdAction } from '../actions/index.js';

function* getChainId(action: GetChainIdAction) {
    const { payload } = action;
    const web3 = payload;

    const chainId = yield* call(web3.eth.getChainId);
    yield* put(createAction({ networkId: `${chainId}`, web3 }));
}

export default getChainId;
