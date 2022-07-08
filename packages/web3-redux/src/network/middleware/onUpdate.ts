import { AnyAction, Store } from 'redux';
import Web3 from 'web3';

import ContractCRUD from '../../contract/crud.js';
import NetworkCRUD from '../crud.js';

//When Network web3 or web3Sender is changed, update all corresponding contracts
export const onNetworkUpdate = (store: Store) => (next: (action: AnyAction) => any) => (action: AnyAction) => {
    let networkId;
    let newWeb3: Web3 | undefined;
    let newWeb3Sender: Web3 | undefined;
    if (NetworkCRUD.actions.create.match(action) || NetworkCRUD.actions.update.match(action)) {
        networkId = action.payload.networkId;
        newWeb3 = action.payload.web3;
        newWeb3Sender = action.payload.web3Sender;
    }

    const network = NetworkCRUD.selectors.selectByIdSingle(store.getState(), networkId);
    const web3Changed = !!newWeb3 && network?.web3 !== newWeb3;
    const web3SenderChanged = !!newWeb3Sender && network?.web3Sender !== newWeb3Sender;
    next(action); //Create/Update network

    const contracts = ContractCRUD.selectors.selectWhere(store.getState(), { networkId }) ?? [];

    if (web3Changed) {
        const updates = contracts
            .filter((c) => !!c.abi)
            .map((c) => {
                return {
                    networkId: c.networkId,
                    address: c.address,
                    web3Contract: new newWeb3!.eth.Contract(c.abi!, c.address),
                };
            });

        if (updates.length > 0) store.dispatch(ContractCRUD.actions.updateBatched(updates));
    }

    if (web3SenderChanged) {
        const updates = contracts
            .filter((c) => !!c.abi)
            .map((c) => {
                return {
                    networkId: c.networkId,
                    address: c.address,
                    web3SenderContract: new newWeb3Sender!.eth.Contract(c.abi!, c.address),
                };
            });

        if (updates.length > 0) store.dispatch(ContractCRUD.actions.updateBatched(updates));
    }
};

export default onNetworkUpdate;
