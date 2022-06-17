import { AnyAction, Store } from 'redux';
import { selectLatestBlockNumber } from '../../network/selectors/index.js';
import { set as setNetwork } from '../../network/actions/index.js';
import { Transaction } from '../../transaction/model/interface.js';
import { createBatchedAction as createTransactionBatchedAction } from '../../transaction/actions/index.js';
import { getTransactionId } from '../../transaction/model/index.js';

import { isCreateAction, isUpdateAction, isSetAction } from '../actions/index.js';
import { isStrings } from '../../utils/index.js';
import { getBlockId } from '../model/index.js';

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

    if (isCreateAction(action) || isUpdateAction(action)) {
        networkId = action.payload.networkId;
        blockNumber = action.payload.number;
        transactions = action.payload.transactions;
    } else if (isSetAction(action) && action.payload.key === 'number') {
        networkId = action.payload.id.networkId;
        blockNumber = action.payload.value;
    }

    if (networkId) {
        if (blockNumber !== undefined) {
            const state = store.getState();
            const latestBlockNumber = selectLatestBlockNumber(state, networkId);

            if (!latestBlockNumber || blockNumber > latestBlockNumber) {
                //Update network latestBlockNumber
                const updateNetworkAction = setNetwork({
                    id: networkId,
                    key: 'latestBlockNumber',
                    value: blockNumber,
                });

                postActions.push(updateNetworkAction); //Update Network.latestBlockNumber after updating block
            }

            //Create transactions
            if (transactions && transactions.length > 0 && isStrings(transactions)) {
                const action = createTransactionBatchedAction(
                    transactions.map((hash: string) => {
                        return {
                            hash,
                            networkId: networkId!,
                            blockNumber,
                            blockId: getBlockId({ networkId: networkId!, number: blockNumber! }),
                            id: getTransactionId({ hash, networkId: networkId! }),
                        };
                    }),
                );
                postActions.push(action);
            } else if (transactions && transactions.length > 0 && !isStrings(transactions)) {
                const action = createTransactionBatchedAction(
                    transactions.map((tx: Transaction) => {
                        return {
                            ...tx,
                            networkId: networkId!,
                            blockId: getBlockId({ networkId: networkId!, number: blockNumber! })!,
                            id: getTransactionId({ hash: tx.hash, networkId: networkId! }),
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
