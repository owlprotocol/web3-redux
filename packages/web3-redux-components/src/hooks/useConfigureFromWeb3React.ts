import { useEffect, useMemo } from 'react';
import Web3 from 'web3';
import { useDispatch } from 'react-redux';
import { Config, Network, NetworkWithObjects } from '@owlprotocol/web3-redux';
import { hooks } from '../connectors/metaMask';

const { useChainId, useAccounts, useProvider } = hooks;

export function useConfigureFromWeb3React() {
    const dispatch = useDispatch();

    //Web3React data
    const chainId = useChainId();
    const accounts = useAccounts();
    const provider = useProvider();

    const newWeb3Sender = useMemo(() => (provider ? new Web3(provider as any) : undefined), [provider]);
    const newAccount = accounts && accounts.length > 0 ? accounts[0].toLowerCase() : undefined;
    const newNetworkId = chainId ? `${chainId}` : undefined;

    //Web3Redux data
    const [currentNetworkId, setNetworkId] = Config.hooks.useNetworkId();
    const [currentAccount, setAccount] = Config.hooks.useAccount();
    const [currentNetwork] = Network.hooks.useNetwork(currentNetworkId ?? '1');
    const currentWeb3Sender = (currentNetwork as NetworkWithObjects | undefined)?.web3Sender;

    console.debug({ newAccount, currentAccount });

    //Update networkId
    useEffect(() => {
        if (newNetworkId && newNetworkId != currentNetworkId) setNetworkId(newNetworkId);
    }, [currentNetworkId, newNetworkId, setNetworkId]);

    //Update account
    useEffect(() => {
        if (newAccount && newAccount != currentAccount) setAccount(newAccount);
    }, [newAccount, currentAccount, setAccount]);

    //Update web3Sender
    useEffect(() => {
        if (newNetworkId && newWeb3Sender != currentWeb3Sender) {
            dispatch(Network.actions.upsert({ networkId: newNetworkId, web3Sender: newWeb3Sender }));
        }
    }, [dispatch, newNetworkId, newWeb3Sender, currentWeb3Sender]);
}

export default useConfigureFromWeb3React;
