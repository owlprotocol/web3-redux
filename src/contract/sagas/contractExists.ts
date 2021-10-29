import { select } from 'typed-redux-saga/macro';
import { selectByAddressSingle } from '../selector';
import { getId } from '../model';

function* contractExists(networkId: string, address: string) {
    const contract: ReturnType<typeof selectByAddressSingle> = yield* select(selectByAddressSingle, networkId, address);
    if (!contract) throw new Error(`Contract ${getId({ address, networkId })} undefined`);

    return contract;
}

export default contractExists;
