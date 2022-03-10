import { AnyAction, Store } from 'redux';
import { batchActions } from 'redux-batched-actions';
import * as Network from '../network/index.js';
import * as Contract from '../contract/index.js';

export const onPersistRehydrate = (store: Store) => (next: (action: AnyAction) => any) => (action: AnyAction) => {
    next(action);

    if (action.type === 'persist/REHYDRATE') {
        const actions: AnyAction[] = [];
        const state = store.getState();
        const networks = Network.selectByIdMany(state);
        networks.map((n) => {
            const web3 = n?.web3;
            if (web3) {
                const contracts = Network.selectContracts(store.getState(), n?.networkId) ?? [];
                contracts.forEach((c) => {
                    if (c.abi && !c.web3Contract) {
                        actions.push(
                            Contract.set({
                                id: { networkId: c.networkId, address: c.address },
                                key: 'web3Contract',
                                value: new web3.eth.Contract(c.abi, c.address),
                            }),
                        );
                    }
                });
            }
        });

        const actionsBatched =
            actions.length > 0 ? batchActions(actions, `${Contract.SET('web3Contract')}/${actions.length}`) : undefined;
        if (actionsBatched) store.dispatch(actionsBatched);
    }
};
