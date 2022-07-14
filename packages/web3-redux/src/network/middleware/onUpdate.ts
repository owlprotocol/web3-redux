import { AnyAction, Store } from 'redux';
import Web3 from 'web3';

import ContractCRUD from '../../contract/crud.js';
import NetworkCRUD from '../crud.js';

//When Network web3 or web3Sender is changed, update all corresponding contracts
export const onNetworkUpdate = (store: Store) => (next: (action: AnyAction) => any) => (action: AnyAction) => {
    let networkId;
    let newWeb3: Web3 | undefined;
    let newWeb3Sender: Web3 | undefined;
    let newWeb3Rpc: string | undefined;
    if (NetworkCRUD.actions.create.match(action) || NetworkCRUD.actions.update.match(action)) {
        networkId = action.payload.networkId;
        newWeb3 = action.payload.web3;
        newWeb3Rpc = action.payload.web3Rpc;
        newWeb3Sender = action.payload.web3Sender;
    }

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
};

export default onNetworkUpdate;
