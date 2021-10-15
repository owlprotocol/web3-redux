import { assert } from 'chai';
import Web3 from 'web3';
import { createStore } from '../store';
import { Network, Block, Transaction } from '../index';
import { validatedBlock } from './model';

const networkId = '1337';
const web3 = new Web3('http://locahost:8545');
const network = {
    networkId,
    web3,
};

describe('block.actions', () => {
    let store: ReturnType<typeof createStore>;

    beforeEach(() => {
        store = createStore();
        store.dispatch(Network.create(network));
    });

    describe('selectors:empty', () => {
        it('selectSingle(state, id) => undefined', async () => {
            const selected = Block.selectByIdSingle(store.getState(), '');
            assert.equal(selected, undefined);
        });

        it('selectByIdMany(state, [id]) => []', async () => {
            const selected = Block.selectByIdMany(store.getState(), ['']);
            assert.deepEqual(selected, [null]);
        });

        it('selectSingleTransactions(state, blockId) => null', async () => {
            const selected = Block.selectSingleTransactions(store.getState(), '');
            assert.equal(selected, null);
        });

        it('selectManyTransactions(state, [blockNo]) => [null]', async () => {
            const selected = Block.selectManyTransactions(store.getState(), ['']);
            assert.deepEqual(selected, [null]);
        });

        it('selectSingleBlockTransaction(state, blockId) => null', async () => {
            const selected = Block.selectSingleBlockTransaction(store.getState(), '');
            assert.equal(selected, null);
        });

        it('selectManyBlockTransaction(state, [blockNo]) => [null]', async () => {
            const selected = Block.selectManyBlockTransaction(store.getState(), ['']);
            assert.deepEqual(selected, [null]);
        });
    });

    describe('selectors:memoization', () => {
        it('selectSingle(state, id)', async () => {
            //Test payload != selected reference
            const block1 = { networkId, number: 1 };
            const block1Id = Block.blockId(block1);
            const block1WithId = validatedBlock(block1);
            store.dispatch(Block.create(block1)); //[redux antipattern] mutates block1 with id
            const selected1 = Block.selectByIdSingle(store.getState(), block1Id);

            assert.notEqual(selected1, block1WithId, 'unequal reference');
            assert.deepEqual(selected1, block1WithId, 'equal deep values');

            //Test selected unchanged after new block insert
            const block2 = { networkId, number: 2 };
            store.dispatch(Block.create(block2));

            const selected2 = Block.selectByIdSingle(store.getState(), block1Id);
            assert.equal(selected2, selected1, 'memoized selector');

            //Test selected unchanged after transaction insert
            const transaction1 = { networkId, hash: '0x1', blockNumber: 1 };
            store.dispatch(Transaction.create(transaction1));

            const selected3 = Block.selectByIdSingle(store.getState(), block1Id);
            assert.equal(selected3, selected1, 'memoized selector');

            //Test selected changed after block update
            store.dispatch(Block.create({ ...block1, gasUsed: 1 }));

            const selected4 = Block.selectByIdSingle(store.getState(), block1Id);
            assert.notEqual(selected4, selected1, 'memoization should be invalidated');
        });

        it('selectSingleBlockTransaction(state, id)', async () => {
            //Create block with transaction
            const block1 = { networkId, number: 1 };
            const block1Id = Block.blockId(block1);
            store.dispatch(Block.create(block1)); //[redux antipattern] mutates block1 with id
            const transaction1 = { networkId, hash: '0x1', blockNumber: 1 };
            store.dispatch(Transaction.create(transaction1));

            const selected1 = Block.selectSingleBlockTransaction(store.getState(), block1Id);

            //Test selected unchanged after new block insert
            const block2 = { networkId, number: 2 };
            store.dispatch(Block.create(block2));

            const selected2 = Block.selectSingleBlockTransaction(store.getState(), block1Id);
            assert.equal(selected2, selected1, 'memoized selector');

            //Test selected unchanged after unrelated transaction insert
            const transaction2 = { networkId, hash: '0x2', blockNumber: 2 };
            store.dispatch(Transaction.create(transaction2));

            const selected3 = Block.selectSingleBlockTransaction(store.getState(), block1Id);
            assert.equal(selected3, selected1, 'memoized selector');

            //Test selected changed after related transaction insert
            const transaction3 = { networkId, hash: '0x3', blockNumber: 1 };
            store.dispatch(Transaction.create(transaction3));

            const selected4 = Block.selectSingleBlockTransaction(store.getState(), block1Id);
            assert.notEqual(selected4, selected1, 'memoization should be invalidated');
        });
    });

    describe('selectors:many', () => {
        it('selectMany(state)', async () => {
            const block1 = { networkId, number: 1 };
            const validated1 = Block.validatedBlock(block1);
            store.dispatch(Block.create(block1));

            //State
            assert.deepEqual(
                store.getState().web3Redux['Block'].itemsById[validated1.id!],
                validated1,
                'state.web3Redux.Block.itemsById',
            );

            //Block.selectMany
            assert.deepEqual(
                Block.selectByIdMany(store.getState(), [validated1.id!]),
                [validated1],
                'selectMany([id])',
            );
            assert.deepEqual(Block.selectByIdMany(store.getState()), [validated1], 'Block.selectMany()');
        });

        it('selectManyTransactions', async () => {
            const block1 = { networkId, number: 1 };
            const transaction1 = { networkId, hash: '0x1', blockNumber: 1 };
            store.dispatch(Block.create(block1));
            store.dispatch(Transaction.create(transaction1));

            const expectedBlock = Block.validatedBlock(block1);
            const expectedTransaction = Transaction.validatedTransaction(transaction1);

            assert.deepEqual(
                Block.selectManyTransactions(store.getState(), [expectedBlock.id!]),
                [[expectedTransaction]],
                'selectTransactions([id])',
            );
            assert.deepEqual(
                Block.selectManyTransactions(store.getState()),
                [[expectedTransaction]],
                'selectTransactions()',
            );
        });

        it('selectManyBlockTransaction', async () => {
            const block1 = { networkId, number: 1 };
            const transaction1 = { networkId, hash: '0x1', blockNumber: 1 };
            store.dispatch(Block.create(block1));
            store.dispatch(Transaction.create(transaction1));

            const expectedBlock = Block.validatedBlock(block1);
            const expectedTransaction = Transaction.validatedTransaction(transaction1);

            assert.deepEqual(
                Block.selectManyBlockTransaction(store.getState(), [expectedBlock.id!]),
                [{ ...expectedBlock, transactions: [expectedTransaction] }],
                'selectBlockTransaction([id])',
            );
            assert.deepEqual(
                Block.selectManyBlockTransaction(store.getState()),
                [{ ...expectedBlock, transactions: [expectedTransaction] }],
                'selectBlockTransaction()',
            );
        });
    });
});
