import { AnyAction, Store } from 'redux';
import Web3 from 'web3';
import { batchActions } from 'redux-batched-actions';
import * as Network from '../index.js';
import * as Contract from '../../contract/index.js';

//When Network web3 or web3Sender is changed, update all corresponding contracts
export const onNetworkUpdate = (store: Store) => (next: (action: AnyAction) => any) => (action: AnyAction) => {
    let networkId;
    let newWeb3: Web3 | undefined;
    let newWeb3Sender: Web3 | undefined;
    if (Network.isCreateAction(action) || Network.isUpdateAction(action)) {
        networkId = action.payload.networkId;
        newWeb3 = action.payload.web3;
        newWeb3Sender = action.payload.web3Sender;
    } else if (Network.isSetAction(action) && action.payload.key === 'web3') {
        networkId = action.payload.id;
        newWeb3 = action.payload.value;
    } else if (Network.isSetAction(action) && action.payload.key === 'web3Sender') {
        networkId = action.payload.id;
        newWeb3Sender = action.payload.value;
    }

    const network = Network.selectByIdSingle(store.getState(), networkId);
    const web3Changed = !!newWeb3 && network?.web3 !== newWeb3;
    const web3SenderChanged = !!newWeb3Sender && network?.web3Sender !== newWeb3Sender;
    next(action); //Create/Update network

    const contracts = Network.selectContracts(store.getState(), networkId) ?? [];

    if (web3Changed) {
        const actions = contracts
            .map((c) => {
                if (c.abi) {
                    return Contract.set({
                        id: { networkId: c.networkId, address: c.address },
                        key: 'web3Contract',
                        value: new newWeb3!.eth.Contract(c.abi, c.address),
                    });
                }
            })
            .filter((a) => !!a);

        const actionsBatched =
            actions.length > 0
                ? batchActions(actions as AnyAction[], `${Contract.SET('web3Contract')}/${actions.length}`)
                : undefined;
        if (actionsBatched) store.dispatch(actionsBatched);
    }

    if (web3SenderChanged) {
        const actions = contracts
            .map((c) => {
                if (c.abi) {
                    return Contract.set({
                        id: { networkId: c.networkId, address: c.address },
                        key: 'web3SenderContract',
                        value: new newWeb3Sender!.eth.Contract(c.abi, c.address),
                    });
                }
            })
            .filter((a) => !!a);

        const actionsBatched =
            actions.length > 0
                ? batchActions(actions as AnyAction[], `${Contract.SET('web3SenderContract')}/${actions.length}`)
                : undefined;
        if (actionsBatched) store.dispatch(actionsBatched);
    }
};

export default onNetworkUpdate;
