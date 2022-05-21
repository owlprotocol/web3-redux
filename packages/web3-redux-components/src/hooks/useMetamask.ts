import { useCallback } from 'react';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
import { Network } from '@owlprotocol/web3-redux';
import { isMetaMaskInstalled } from '../utils/isMetamaskInstalled';
import { DEFAULT_CHAIN_ID, WalletContext } from '../constants/web3React';
import { getLibrary } from '../utils/getLibrary';
import { SUPPORTED_WALLETS } from '../constants/web3ReactConnectors';

const { toHex } = Web3.utils;

const useMetamask = () => {
    const { connector, activate, library } = useWeb3React(WalletContext);
    const web3 = library as Web3 | undefined;

    const addEthereumChain = useCallback((web3: Web3, chain: any) => {
        const params = {
            chainId: toHex(chain.chainId),
            chainName: chain.chainName,
            nativeCurrency: {
                name: chain.nativeCurrency.name,
                symbol: chain.nativeCurrency.symbol, // 2-6 characters long
                decimals: chain.nativeCurrency.decimals,
            },
            rpcUrls: chain.rpcUrls,
            blockExplorerUrls:
                chain.blockExplorerUrls && chain.blockExplorerUrls.length > 1 ? chain.blockExplorerUrls : null,
        };

        //https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods
        //@ts-ignore
        web3.eth.switchEthereumChain({ chainId: params.chainId }).catch((error) => {
            if (error.code === 4902) {
                web3.eth
                    //@ts-expect-error
                    .addEthereumChain(params)
                    .then((result: any) => {
                        console.log(result);
                    })
                    .catch((error: Error) => {
                        console.error(error);
                    });
            }
        });
    }, []);

    const addDefaultEthereumChain = useCallback(() => {
        let selectedWeb3 = web3;
        // @ts-expect-error
        if (!selectedWeb3 && isMetaMaskInstalled()) selectedWeb3 = getLibrary(window.ethereum)!; //eslint-disable-line @typescript-eslint/no-non-null-assertion

        if (selectedWeb3) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const defaultNetwork = Network.defaultNetworks()[DEFAULT_CHAIN_ID as string]!;
            const chain = {
                chainId: parseInt(defaultNetwork.networkId),
                chainName: defaultNetwork.name,
                nativeCurrency: defaultNetwork.currency,
                rpcUrls: [defaultNetwork.web3Rpc],
            };

            addEthereumChain(selectedWeb3, chain);
        }
    }, [web3, addEthereumChain]);

    const activateWallet = useCallback(
        (connector: AbstractConnector) => {
            //setPendingWallet(connector) // set wallet for pending view
            activate(connector, undefined, true).catch((error) => {
                if (error instanceof UnsupportedChainIdError) {
                    console.error(error);
                    //activate(connector) //From Uniswap: a little janky...can't use setError because the connector isn't set
                    addDefaultEthereumChain();
                    activate(connector);
                } else if (error instanceof NoEthereumProviderError) {
                    console.error(error.message);
                } else {
                    console.error(error);
                    //setPendingError(true)
                }
            });
        },
        [activate, addDefaultEthereumChain],
    );

    const connectWallet = useCallback(() => {
        if (connector) {
            activateWallet(connector);
        } else if (!isMetaMaskInstalled()) {
            console.error('Metamask is not installed. No connector!');
        } else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            activateWallet(SUPPORTED_WALLETS.METAMASK.connector!);
        }
    }, [connector, activateWallet]);

    return { web3, connectWallet, addEthereumChain, addDefaultEthereumChain };
};

export default useMetamask;
