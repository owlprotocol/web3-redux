import { useEffect } from 'react';
import { Config, Contract } from '@owlprotocol/web3-redux';
import { fromWei } from 'web3-utils';
import composeHooks from 'react-hooks-compose';
import { Button } from 'reactstrap';
import { WrongNetwork, Wrapper, AccountBalance } from './styles';
import { isSupportedNetworkId } from '../../constants/web3React';
import { shortenHash } from '../../utils';
import useMetamask from '../../hooks/useMetamask';
import useConfigureFromWeb3React from '../../hooks/useConfigureFromWeb3React';
import Icon from '../Icon';

export const useWalletConnect = () => {
    useConfigureFromWeb3React(); //Update web3-redux config
    const { connectWallet, web3 } = useMetamask();

    const [networkId] = Config.useNetworkId();
    const [account] = Config.useAccount();
    const { balance } = Contract.useContract(networkId, account, undefined, { getBalance: 'ifnull' }) ?? {};
    const balanceFormatted = balance ? fromWei(balance, 'ether').substring(0, 6) : undefined;
    const btnText = account ? shortenHash(account) : undefined;

    useEffect(() => {
        //Try connect on mount
        if (!web3) {
            try {
                connectWallet();
            } catch (err) {
                console.error(err);
            }
        }
    }, [connectWallet, web3]);

    return { networkId, balance: balanceFormatted, connectWallet, btnText };
};

export interface PresenterProps {
    networkId: string | undefined;
    balance: string | undefined;
    connectWallet?: (...params: any[]) => any;
    btnText: string | undefined;
}
export const WalletConnectPresenter = ({
    networkId,
    balance,
    connectWallet = () => console.log('Clicked Connect'),
    btnText = 'Connect Wallet',
}: PresenterProps) => {
    // Wallet connected but wrong network
    // replace the wallet connet component.
    if (networkId && !isSupportedNetworkId(networkId)) {
        return (
            <WrongNetwork>
                <Icon icon="broken-link" />
                <span>Wrong Network</span>
            </WrongNetwork>
        );
    }

    return (
        <Wrapper>
            {balance && <AccountBalance>{balance} ETH</AccountBalance>}
            <Button secondary icon="currencies" onClick={connectWallet}>
                {networkId} {btnText}
            </Button>
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
