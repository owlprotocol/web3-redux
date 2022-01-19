import { put, all, takeEvery } from 'typed-redux-saga/macro';
import Web3 from 'web3';
import * as NetworkActions from '../network/actions';
import * as BlockActions from '../block/actions';
import { Network } from '../network/model';
import { InitializeAction, INITIALIZE, NetworkWithSubscribe } from './actions';

function* initialize(action: InitializeAction) {
    const networks: Network[] = action.payload.networks ?? [];

    if (!action.payload.networks) {
        const localRpc = process.env.LOCAL_RPC ?? process.env.REACT_APP_LOCAL_RPC ?? process.env.NEXT_PUBLIC_LOCAL_RPC;
        const mainnetRpc =
            process.env.MAINNET_RPC ?? process.env.REACT_APP_MAINNET_RPC ?? process.env.NEXT_PUBLIC_MAINNET_RPC;
        const ropstenRpc =
            process.env.ROPSTEN_RPC ?? process.env.REACT_APP_ROPSTEN_RPC ?? process.env.NEXT_PUBLIC_ROPSTEN_RPC;
        const kovanRpc = process.env.KOVAN_RPC ?? process.env.REACT_APP_KOVAN_RPC ?? process.env.NEXT_PUBLIC_KOVAN_RPC;
        const rinkebyRpc =
            process.env.RINKEBY_RPC ?? process.env.REACT_APP_RINKEBY_RPC ?? process.env.NEXT_PUBLIC_RINKEBY_RPC;
        const goerliRpc =
            process.env.GOERLI_RPC ?? process.env.REACT_APP_GOERLI_RPC ?? process.env.NEXT_PUBLIC_GOERLI_RPC;
        if (localRpc) networks.push({ networkId: '1337', web3: new Web3(localRpc) });
        if (mainnetRpc) networks.push({ networkId: '1', web3: new Web3(mainnetRpc) });
        if (ropstenRpc) networks.push({ networkId: '3', web3: new Web3(ropstenRpc) });
        if (kovanRpc) networks.push({ networkId: '42', web3: new Web3(kovanRpc) });
        if (rinkebyRpc) networks.push({ networkId: '4', web3: new Web3(rinkebyRpc) });
        if (goerliRpc) networks.push({ networkId: '5', web3: new Web3(goerliRpc) });
    }

    const putActions = networks.map((n) => put(NetworkActions.create(n)));
    const subscribeActions = networks
        .map((n: NetworkWithSubscribe) => {
            if (n.blockSubscribe === false) {
                return null;
            } else if (n.blockSubscribe === true) {
                return put(BlockActions.subscribe({ networkId: n.networkId, returnTransactionObjects: true }));
            } else if (n.blockSubscribe) {
                return put(BlockActions.subscribe(n.blockSubscribe));
            } else if (action.payload.blockSubscribe === true || action.payload.blockSubscribe === undefined) {
                //default has been set to True
                return put(BlockActions.subscribe({ networkId: n.networkId, returnTransactionObjects: true }));
            }

            return null;
        })
        .filter((t) => !!t);
    yield* all([...putActions, ...subscribeActions]);
}

export function* saga() {
    yield* all([takeEvery(INITIALIZE, initialize)]);
}
