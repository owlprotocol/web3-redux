import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Config, Network, NetworkWithObjects } from '@owlprotocol/web3-redux';
import { hooks } from '../connectors/metaMask.js';
import getLibrary from '../utils/getLibrary.js';

const { useChainId, useAccounts, useProvider } = hooks;

export function useConfigureFromWeb3React() {
    const dispatch = useDispatch();

    //Web3React data
    const chainId = useChainId();
    const accounts = useAccounts();
    const metamask = useProvider();
    const provider = metamask?.provider;

    const newWeb3Sender = useMemo(() => (provider ? getLibrary(provider) : undefined), [provider]);
    const newAccount = accounts && accounts.length > 0 ? accounts[0].toLowerCase() : undefined;
    const newNetworkId = chainId ? `${chainId}` : undefined;

    //Web3Redux data
    const [config, { setNetworkId, setAccount }] = Config.hooks.useConfig();
    const { account: currentAccount, networkId: currentNetworkId } = config ?? {};

    const [currentNetwork] = Network.hooks.useNetwork(currentNetworkId ?? '1');
    const currentWeb3Sender = (currentNetwork as NetworkWithObjects | undefined)?.web3Sender;
    const isSameWeb3Provider = currentWeb3Sender?.givenProvider === provider;

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
        if (newNetworkId && !isSameWeb3Provider) {
            dispatch(Network.actions.upsert({ networkId: newNetworkId, web3Sender: newWeb3Sender }));
        }
    }, [dispatch, newNetworkId, isSameWeb3Provider, newWeb3Sender]);
}

export default useConfigureFromWeb3React;
