import { put, call } from 'typed-redux-saga/macro';
import { create as createAction, GetChainIdAction } from '../actions';

function* getChainId(action: GetChainIdAction) {
    const { payload } = action;
    const web3 = payload;

    const chainId = yield* call(web3.eth.getChainId);
    yield* put(createAction({ networkId: `${chainId}`, web3 }));
}

export default getChainId;