//@ts-nocheck
/* eslint-disable */
import { useEffect } from 'react';
import Web3 from 'web3';
import { useDispatch } from 'react-redux';
import { Config, Network, NetworkWithObjects } from '@owlprotocol/web3-redux';
import { hooks } from '../connectors/metaMask';

const { useChainId, useAccounts, useIsActive } = hooks;

export function useConfigureFromWeb3React() {
    const dispatch = useDispatch();

    //Web3React data
    const chainId = useChainId();
    const accounts = useAccounts();
    const isActive = useIsActive();

    /*
    const newNetworkId = chainId ? `${chainId}` : undefined;
    const newWeb3Sender = library as Web3 | undefined;

    //Web3Redux data
    const [currentNetworkId, setNetworkId] = Config.hooks.useNetworkId();
    const [currentAccount, setAccount] = Config.hooks.useAccount();
    const [currentNetwork] = Network.hooks.useNetwork(currentNetworkId ?? '1');

    const currentWeb3Sender = (currentNetwork as NetworkWithObjects | undefined)?.web3Sender;

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
            dispatch(Network.actions.update({ networkId: newNetworkId, web3Sender: newWeb3Sender }));
        }
    }, [dispatch, newNetworkId, newWeb3Sender, currentWeb3Sender]);
    */
}

export default useConfigureFromWeb3React;
