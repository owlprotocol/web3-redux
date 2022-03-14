import { useEffect } from 'react';
import Web3 from 'web3';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Config, Network } from '@owlprotocol/web3-redux';
import { WalletContext } from '../constants/web3React';

function useConfigureFromWeb3React() {
    const dispatch = useDispatch();

    //Web3React data
    const { chainId, account: newAccount, library } = useWeb3React(WalletContext); //Injected connector value
    const newNetworkId = chainId ? `${chainId}` : undefined;
    const newWeb3Sender = library as Web3 | undefined;

    //Web3Redux data
    const [currentNetworkId, setNetworkId] = Config.useNetworkId();
    const [currentAccount, setAccount] = Config.useAccount();
    const currentNetwork = Network.useNetwork(currentNetworkId);
    const currentWeb3Sender = currentNetwork?.web3Sender;

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
            dispatch(Network.set({ id: newNetworkId, key: 'web3Sender', value: newWeb3Sender }));
        }
    }, [dispatch, newNetworkId, newWeb3Sender, currentWeb3Sender]);
}

export default useConfigureFromWeb3React;