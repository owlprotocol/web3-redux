import { select } from 'redux-saga/effects';
import { selectByAddressSingle } from '../selector';
import { accountId } from '../model';

function* accountExists(networkId: string, address: string) {
    const account: ReturnType<typeof selectByAddressSingle> = yield select(selectByAddressSingle, networkId, address);
    if (!account) throw new Error(`Account ${accountId({ address, networkId })} undefined`);

    return account;
}

export default accountExists;
