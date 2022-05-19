import { useEffect } from 'react';
import { useTheme } from '@chakra-ui/react';
import { Config, Contract } from '@owlprotocol/web3-redux';
import { fromWei } from 'web3-utils';
import composeHooks from 'react-hooks-compose';
import { WrongNetwork, Wrapper, AccountBalance } from './styles';
import Icon from '../Icon';
import Button from '../Button';
import { isSupportedNetworkId } from '../../constants/web3React';
import { shortenHash } from '../../utils';
import useMetamask from '../../hooks/useMetamask';
import useConfigureFromWeb3React from '../../hooks/useConfigureFromWeb3React';

export const useWalletConnect = () => {
    useConfigureFromWeb3React(); //Update web3-redux config
    const { connectWallet, web3 } = useMetamask();

    const [networkId] = Config.useNetworkId();
    const [account] = Config.useAccount();
    const { balance } = Contract.useContract(networkId, account, undefined, { getBalance: 'ifnull' }) ?? {};
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
            <WrongNetwork>
                <Icon icon="broken-link" w="20px" h="20px" />
                <span>Wrong Network</span>
            </WrongNetwork>
        );
    }

    return (
        <Wrapper>
            {showBalance && balance && <AccountBalance>{balance} ETH</AccountBalance>}
            <Button
                bg={themes.color6}
                color={themes.color7}
                onClick={connectWallet}
                text="Connect Wallet"
                borderRadius={12}
                fontWeight={'bold'}
            />
        </Wrapper>
    );
};

const WalletConnect = composeHooks(() => ({
    useWalletConnect: () => useWalletConnect(),
}))(WalletConnectPresenter) as ({ }: any) => JSX.Element;

//@ts-expect-error
WalletConnect.displayName = 'WalletConnect';

export { WalletConnect };
export default WalletConnect;
