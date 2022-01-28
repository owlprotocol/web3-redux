import { AnyAction, Store } from 'redux';
import Web3 from 'web3';
import { batchActions } from 'redux-batched-actions';
import Network from '../index';
import Contract from '../../contract';

//When Network web3 or web3Sender is changed, update all corresponding contracts
export const onNetworkUpdate = (store: Store) => (next: (action: AnyAction) => any) => (action: AnyAction) => {
    let networkId;
    let newWeb3: Web3 | undefined;
    let newWeb3Sender: Web3 | undefined;
    let postAction: AnyAction | undefined;
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

    if (networkId) {
        const network = Network.selectByIdSingle(store.getState(), networkId) ?? {
            web3: undefined,
            web3Sender: undefined,
        };

        next(action); //Create/Update network
        const contracts = Network.selectContracts(store.getState(), networkId) ?? [];

        if (contracts.length > 0) {
            const web3Changed = !!newWeb3 && network.web3 !== newWeb3;
            const web3SenderChanged = !!newWeb3Sender && network.web3Sender !== newWeb3Sender;

            if (web3Changed && web3SenderChanged) {
                const actions = contracts
                    .map((c) => {
                        if (c.abi) {
                            return Contract.update({
                                networkId: c.networkId,
                                address: c.address,
                                web3Contract: new newWeb3!.eth.Contract(c.abi, c.address),
                                web3SenderContract: new newWeb3Sender!.eth.Contract(c.abi, c.address),
                            });
                        }
                    })
                    .filter((a) => !!a);

                postAction = batchActions(actions as AnyAction[], `${Contract.update.type}/${actions.length}`);
            } else if (web3Changed) {
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

                postAction = batchActions(actions as AnyAction[], `${Contract.SET('web3Contract')}/${actions.length}`);
            } else if (web3SenderChanged) {
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

                postAction = batchActions(
                    actions as AnyAction[],
                    `${Contract.SET('web3SenderContract')}/${actions.length}`,
                );
            }
        }

        if (postAction) store.dispatch(postAction);
    } else {
        next(action);
    }
};

export default onNetworkUpdate;
