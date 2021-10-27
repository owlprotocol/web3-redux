import { assert } from 'chai';
import Web3 from 'web3';
import { createStore } from '../../store';
import { Network, EthCall } from '../../index';
import { addressList } from '../../test/utils';

const networkId = '1337';
const web3 = new Web3('http://locahost:8545');

describe('ethcall.actions', () => {
    let store: ReturnType<typeof createStore>;

    beforeEach(() => {
        store = createStore();
        store.dispatch(Network.create({ networkId, web3 }));
    });

    describe('selectors:empty', () => {
        it('selectSingle(state, id) => undefined', async () => {
            const selected = EthCall.selectByIdSingle(store.getState(), '');
            assert.equal(selected, undefined);
        });

        it('selectByIdSingle(state, [id]) => []', async () => {
            const selected = EthCall.selectByIdMany(store.getState(), ['']);
            assert.deepEqual(selected, [null]);
        });
    });

    describe('selectors:memoization', () => {
        it('selectSingle(state, id)', async () => {
            //Test payload != selected reference
            const ethCall1 = EthCall.validatedEthCall({
                networkId,
                from: addressList[0],
                to: addressList[1],
                data: '0x1',
            });
            store.dispatch(EthCall.create(ethCall1));
            const selected1 = EthCall.selectByIdSingle(store.getState(), ethCall1.id);

            assert.notEqual(selected1, ethCall1, 'unequal reference');
            assert.deepEqual(selected1, ethCall1, 'equal deep values');

            //Test selected unchanged after new insert
            const ethCall2 = EthCall.validatedEthCall({
                networkId,
                from: addressList[0],
                to: addressList[1],
                data: '0x2',
            });
            store.dispatch(EthCall.create(ethCall2));

            const selected2 = EthCall.selectByIdSingle(store.getState(), ethCall1.id);
            assert.equal(selected2, selected1, 'memoized selector');
        });
    });
});
