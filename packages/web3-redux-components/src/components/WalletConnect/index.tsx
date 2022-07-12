import { useEffect } from 'react';
import { useTheme, Button, Box } from '@chakra-ui/react';
import { Config, Contract } from '@owlprotocol/web3-redux';
import Web3 from 'web3';
import composeHooks from 'react-hooks-compose';
import Icon from '../Icon';
import { isSupportedNetworkId } from '../../constants/web3React';
import { shortenHash } from '../../utils';
import useMetamask from '../../hooks/useMetamask';
import useConfigureFromWeb3React from '../../hooks/useConfigureFromWeb3React';

const { fromWei } = Web3.utils;

export const useWalletConnect = () => {
    useConfigureFromWeb3React(); //Update web3-redux config
    const { connectWallet, web3 } = useMetamask();

    const [networkId] = Config.hooks.useNetworkId();
    const [account] = Config.hooks.useAccount();
    const { balance } = Contract.hooks.useContract(networkId, account, undefined, { getBalance: 'ifnull' }) ?? {};
    const balanceFormatted = balance ? fromWei(balance, 'ether').substring(0, 6) : undefined;
    const btnText = account ? shortenHash(account) : undefined;

    // TODO: Add component prop to controll on-mount-connect.
    useEffect(() => {
        if (true) return;

        //Try connect on mount
        if (!web3) {
            try {
                connectWallet();
            } catch (err) {
                console.error(err);
            }
        }
    }, [connectWallet, web3]);

    return { networkId, balance: balanceFormatted, connectWallet, btnText, showBalance: !!balance };
};

export interface PresenterProps {
    connectWallet?: (...params: any[]) => any;
    networkId?: string | undefined;
    balance?: string | undefined;
    showBalance?: boolean;
}
export const WalletConnectPresenter = ({
    networkId,
    balance,
    connectWallet = () => console.log('Clicked Connect'),
    showBalance = false,
}: PresenterProps) => {
    const { themes } = useTheme();

    // Wallet connected but wrong network
    // replace the wallet connet component.
    if (networkId && !isSupportedNetworkId(networkId)) {
        return (
            <div>
                <Box w="20px" h="20px">
                    <Icon icon="broken-link" />
                </Box>
                <span>Wrong Network</span>
            </div>
        );
    }

    return (
        <div>
            {showBalance && balance && <span>{balance} ETH</span>}
            <Button
                bg={themes.color6}
                color={themes.color7}
                onClick={connectWallet}
                borderRadius={12}
                fontWeight={'bold'}
            >
                Connect Wallet
            </Button>
        </div>
    );
};

const WalletConnect = composeHooks(() => ({
    useWalletConnect: () => useWalletConnect(),
}))(WalletConnectPresenter) as ({ }: any) => JSX.Element;

//@ts-expect-error
WalletConnect.displayName = 'WalletConnect';

export { WalletConnect };
export default WalletConnect;
