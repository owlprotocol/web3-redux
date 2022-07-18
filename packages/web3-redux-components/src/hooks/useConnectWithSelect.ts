import type { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import type { Web3ReactHooks } from '@web3-react/core';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import type { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { useCallback, useState } from 'react';
import type { AddEthereumChainParameter } from '@web3-react/types';

export function useConnectWithSelect({
    connector,
    chainId,
    getAddChainParameters,
    setError,
}: {
    connector: MetaMask | WalletConnect | CoinbaseWallet | Network | GnosisSafe;
    chainId: ReturnType<Web3ReactHooks['useChainId']>;
    getAddChainParameters: (chainId: number) => AddEthereumChainParameter | number;
    setError: (error: Error | undefined) => void;
}) {
    const isNetwork = connector instanceof Network;
    const [desiredChainId, setDesiredChainId] = useState<number>(isNetwork ? 1 : -1);

    const switchChain = useCallback(
        (desiredChainId: number) => {
            setDesiredChainId(desiredChainId);
            // if we're already connected to the desired chain, return
            if (desiredChainId === chainId) {
                setError(undefined);
                return;
            }

            // if they want to connect to the default chain and we're already connected, return
            if (desiredChainId === -1 && chainId !== undefined) {
                setError(undefined);
                return;
            }

            if (connector instanceof WalletConnect || connector instanceof Network) {
                connector
                    .activate(desiredChainId === -1 ? undefined : desiredChainId)
                    .then(() => setError(undefined))
                    .catch(setError);
            } else {
                connector
                    .activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
                    .then(() => setError(undefined))
                    .catch(setError);
            }
        },
        [connector, chainId, getAddChainParameters, setError],
    );

    const onClick = useCallback((): void => {
        setError(undefined);
        if (connector instanceof GnosisSafe) {
            connector
                .activate()
                .then(() => setError(undefined))
                .catch(setError);
        } else if (connector instanceof WalletConnect || connector instanceof Network) {
            connector
                .activate(desiredChainId === -1 ? undefined : desiredChainId)
                .then(() => setError(undefined))
                .catch(setError);
        } else {
            connector
                .activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
                .then(() => setError(undefined))
                .catch(setError);
        }
    }, [connector, getAddChainParameters, desiredChainId, setError]);

    return { switchChain, onClick };
}

export default useConnectWithSelect;
