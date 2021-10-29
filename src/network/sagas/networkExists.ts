import { select } from 'typed-redux-saga/macro';
import { selectByIdSingle as selectNetworkByIdSingle } from '../selector';

function* networkExists(networkId: string) {
    const network: ReturnType<typeof selectNetworkByIdSingle> = yield* select(selectNetworkByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    return network;
}

export default networkExists;
