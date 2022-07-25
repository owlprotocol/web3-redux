import { AnyAction, Store } from 'redux';

import ContractCRUD from '../../contract/crud.js';
import NetworkCRUD from '../crud.js';

//When Network web3 or web3Sender is changed, update all corresponding contracts
export const onNetworkUpdate = (store: Store) => (next: (action: AnyAction) => any) => (action: AnyAction) => {
    if (
        NetworkCRUD.actions.create.match(action) ||
        NetworkCRUD.actions.update.match(action) ||
        NetworkCRUD.actions.put.match(action) ||
        NetworkCRUD.actions.upsert.match(action)
    ) {
        const networkId = action.payload.networkId;
        const newWeb3 = action.payload.web3;
        const newWeb3Rpc = action.payload.web3Rpc;
        const newWeb3Sender = action.payload.web3Sender;

        const network = NetworkCRUD.selectors.selectByIdSingle(store.getState(), networkId);
        const web3Changed = (!!newWeb3 && network?.web3 !== newWeb3) || (newWeb3Rpc && network?.web3Rpc !== newWeb3Rpc);
        const web3SenderChanged = !!newWeb3Sender && network?.web3Sender !== newWeb3Sender;

        next(action); //Create/Update network

        const contracts = ContractCRUD.selectors.selectWhere(store.getState(), { networkId }) ?? [];
        const contractIds = contracts.map(({ networkId, address }) => {
            return { networkId, address };
        });

        console.log(`Network ${networkId} updated. Hydrating ${JSON.stringify(contractIds)}`);

        if ((web3Changed || web3SenderChanged) && contractIds.length > 0)
            store.dispatch(ContractCRUD.actions.hydrateBatched(contractIds));
    } else {
        next(action);
    }
};
