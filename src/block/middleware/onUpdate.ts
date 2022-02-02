import { AnyAction, Store } from 'redux';
import { batchActions } from 'redux-batched-actions';
import { selectLatestBlockNumber } from '../../network/selectors';
import { set as setNetwork } from '../../network/actions';
import { Transaction } from '../../transaction/model/interface';
import { create as createTransaction } from '../../transaction/actions';
import { getTransactionId } from '../../transaction/model';

import { isCreateAction, isUpdateAction, isSetAction } from '../actions';
import { isStrings } from '../../utils';
import { getBlockId } from '../model';

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
            if (transactions && isStrings(transactions)) {
                const actions = transactions.map((hash: string) => {
                    return createTransaction({
                        hash,
                        networkId: networkId!,
                        blockNumber,
                        blockId: getBlockId({ networkId: networkId!, number: blockNumber! }),
                        id: getTransactionId({ hash, networkId: networkId! }),
                    });
                });

                if (actions.length > 0)
                    postActions.push(batchActions(actions, `${createTransaction.type}/${actions.length}`));
            } else if (transactions) {
                const actions = transactions.map((tx: Transaction) => {
                    return createTransaction({
                        ...tx,
                        networkId: networkId!,
                        blockId: getBlockId({ networkId: networkId!, number: blockNumber! })!,
                        id: getTransactionId({ hash: tx.hash, networkId: networkId! }),
                    });
                });

                if (actions.length > 0)
                    postActions.push(batchActions(actions, `${createTransaction.type}/${actions.length}`));
            }
        }
    }

    next(action);
    postActions.forEach((a) => store.dispatch(a)); //Dispatch actions after original action
};

export default onUpdate;
