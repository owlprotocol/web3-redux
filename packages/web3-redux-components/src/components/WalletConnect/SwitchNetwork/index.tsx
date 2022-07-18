/* eslint-disable */
import { useTheme, Button } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { hooks, metaMask } from '../../../connectors/metaMask';
import useConnectWithSelect from '../../../hooks/useConnectWithSelect';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider } = hooks;

export interface Chain {
    chainId: string;
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls: string[];
}

export interface SwitchNetworkProps {
    networkId: string;
}

export const SwitchNetwork = ({ networkId }: SwitchNetworkProps) => {
    const [retry, setRetry] = useState(true)
    const [error, setError] = useState<undefined | Error>();
    const { themes } = useTheme();

    const getAddChainParameters = useCallback((chainId: number) => {
        return chainId;
    }, [])

    const chainId = useChainId();
    const accounts = useAccounts();
    const isActivating = useIsActivating();
    const isActive = useIsActive();
    const provider = useProvider();

    console.debug({ chainId, isActivating, isActive, error })

    // attempt to connect eagerly on mount
    useEffect(() => {
        if (retry) {
            void metaMask.connectEagerly().catch(() => {
                console.debug('Failed to connect eagerly to metamask');
            }).then(() => {
                setRetry(false)
            });

        }
    }, [retry]);

    useEffect(() => {
        if (!chainId) {
            setRetry(true)
        }
    }, [!chainId])

    const { switchChain, onClick } = useConnectWithSelect({
        connector: metaMask,
        chainId,
        getAddChainParameters,
        setError,
    });

    if (!isActive) {
        return (
            <Button bg={themes.color6} color={themes.color7} onClick={onClick} borderRadius={12} fontWeight={'bold'}>
                Connect Wallet
            </Button>
        );
    } else if (chainId != parseInt(networkId)) {
        return (
            <Button
                bg={themes.color6}
                color={themes.color7}
                onClick={() => switchChain(parseInt(networkId))}
                borderRadius={12}
                fontWeight={'bold'}
            >
                Switch Network {networkId}
            </Button>
        );
    } else {
        return <></>;
    }
};

export default SwitchNetwork;
