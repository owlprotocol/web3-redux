import { assert } from 'chai';
import { createStore, StoreType } from '../store';
import { sleep } from '../utils';

import { name } from './common';
import { selectByIdSingle } from './selectors';

import { _4ByteSignature } from './model/interface';

import fetchEventSignatureAction from './actions/fetchEventSignature';
import fetchFunctionSignatureAction from './actions/fetchFunctionSignature';

describe(`${name}/integration`, () => {
    let store: StoreType;

    const TransferPreImage = 'Transfer(address,address,uint256)';
    const TransferSignature = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

    const ApprovePreImage = 'approve(address,uint256)';
    const ApproveSignature = '0x095ea7b3';

    const eventItem: _4ByteSignature = { signatureHash: TransferSignature };
    const functionItem: _4ByteSignature = { signatureHash: ApproveSignature };

    beforeEach(() => {
        ({ store } = createStore());
    });

    it('fetchEventSignature()', async () => {
        store.dispatch(fetchEventSignatureAction(eventItem));
        await sleep(1000);

        const item = selectByIdSingle(store.getState(), eventItem.signatureHash);
        assert.equal(item!.preImage, TransferPreImage, 'preImage');
    });

    it('fetchFunctionSignature()', async () => {
        store.dispatch(fetchFunctionSignatureAction(functionItem));
        await sleep(1000);

        const item = selectByIdSingle(store.getState(), functionItem.signatureHash);

        assert.equal(item!.preImage, ApprovePreImage, 'function name');
    });
});
