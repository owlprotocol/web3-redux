import { AnyAction, Store } from 'redux';
import { Transaction } from '../../transaction/model/interface.js';
import { isStrings } from '../../utils/index.js';
import TransactionCRUD from '../../transaction/crud.js';
import BlockCRUD from '../crud.js';

/**
 * Middleware for whenever a block is created/updated.
 * Use cases:
 * - Update Network latestBlockNumber if >
 */
//TODO: Handle batched updates? Is this even required? Most updates will be fetch or subscription updates.
export const onUpdate = (store: Store) => (next: (action: AnyAction) => any) => (action: AnyAction) => {
    const postActions: AnyAction[] = [];
    let networkId: string | undefined;
    let blockNumber: number | undefined;
    let transactions: Transaction[] | string[] | undefined;

    if (BlockCRUD.actions.create.match(action) || BlockCRUD.actions.update.match(action)) {
        networkId = action.payload.networkId;
        blockNumber = action.payload.number;
        transactions = action.payload.transactions;
    }

    if (networkId) {
        if (blockNumber !== undefined) {
            //Create transactions
            if (transactions && transactions.length > 0 && isStrings(transactions)) {
                const action = TransactionCRUD.actions.createBatched(
                    transactions.map((hash: string) => {
                        return {
                            hash,
                            networkId: networkId!,
                            blockNumber,
                        };
                    }),
                );
                postActions.push(action);
            } else if (transactions && transactions.length > 0 && !isStrings(transactions)) {
                const action = TransactionCRUD.actions.createBatched(
                    transactions.map((tx: Transaction) => {
                        return {
                            ...tx,
                            networkId: networkId!,
                        };
                    }),
                );
                postActions.push(action);
            }
        }
    }

    next(action);
    postActions.forEach((a) => store.dispatch(a)); //Dispatch actions after original action
};

export default onUpdate;
