import { AnyAction, Store } from 'redux';
import { selectLatestBlockNumber } from '../../network/selectors';
import { set as setNetwork } from '../../network/actions';
import { isCreateAction, isUpdateAction, isSetAction } from '../actions';

/**
 * Middleware for whenever a block is created/updated.
 * Use cases:
 * - Update Network latestBlockNumber if >
 */
//TODO: Handle batched updates? Is this even required? Most updates will be fetch or subscription updates.
export const onUpdate = (store: Store) => (next: (action: AnyAction) => any) => (action: AnyAction) => {
    let networkId: string | undefined;
    let newBlockNumber: number | undefined;

    if (isCreateAction(action) || isUpdateAction(action)) {
        networkId = action.payload.networkId;
        newBlockNumber = action.payload.number;
    } else if (isSetAction(action) && action.payload.key === 'number') {
        networkId = action.payload.id;
        newBlockNumber = action.payload.value;
    }

    if (networkId && newBlockNumber) {
        const state = store.getState();
        const latestBlockNumber = selectLatestBlockNumber(state, networkId);

        if (!latestBlockNumber || newBlockNumber > latestBlockNumber) {
            //Update network latestBlockNumber
            const updateNetworkAction = setNetwork({
                id: networkId,
                key: 'latestBlockNumber',
                value: newBlockNumber,
            });

            next(action);
            store.dispatch(updateNetworkAction); //Update Network.latestBlockNumber after updating block
        } else {
            next(action);
        }
    } else {
        next(action);
    }
};

export default onUpdate;
