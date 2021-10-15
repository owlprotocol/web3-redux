import { select } from 'redux-saga/effects';
import { selectByAddressSingle } from '../selector';
import { contractId } from '../model';

function* contractExists(networkId: string, address: string) {
    const contract: ReturnType<typeof selectByAddressSingle> = yield select(selectByAddressSingle, address, networkId);
    if (!contract) throw new Error(`Contract ${contractId({ address, networkId })} undefined`);

    return contract;
}

export default contractExists;
