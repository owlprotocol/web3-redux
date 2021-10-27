import { put, call, takeEvery, all } from 'redux-saga/effects';
import { validatedEthCall } from './model';
import { create, FetchAction, FETCH } from './actions';
import { ZERO_ADDRESS } from '../utils';
import networkExists from '../network/sagas/networkExists';
import { Network } from '../network/model';

const FETCH_ERROR = `${FETCH}/ERROR`;

function* fetchSaga(action: FetchAction) {
    try {
        const { payload } = action;
        const { networkId } = payload;
        const network: Network = yield call(networkExists, networkId);
        if (!network.web3) throw new Error(`Network ${networkId} missing web3`);
        const web3 = network.web3;

        const from: string = payload.from ?? ZERO_ADDRESS;
        const validated = validatedEthCall({ ...payload, from });
        yield put(create(validated));

        const gas = validated.gas ?? (yield call(web3.eth.estimateGas, { ...validated })); //default gas

        //@ts-ignore
        const returnValue = yield call(web3.eth.call, { ...validated, gas }, validated.defaultBlock);
        yield put(create({ ...validated, returnValue }));
    } catch (error) {
        console.error(error);
        yield put({
            type: FETCH_ERROR,
            error,
            action,
        });
    }
}

export function* saga() {
    yield all([takeEvery(FETCH, fetchSaga)]);
}
