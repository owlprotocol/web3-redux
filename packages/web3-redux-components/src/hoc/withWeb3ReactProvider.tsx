import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core';
import getDisplayName from './getDisplayName';
import { getLibrary } from '../utils/getLibrary';
import { WalletContext } from '../constants/web3React';

//Browser wallet context provider
const Web3ProviderWallet = createWeb3ReactRoot(WalletContext);
// eslint-disable-next-line react/display-name
const withWeb3ReactProvider = (WrappedComponent: any) => {
    const component = (props: any) => {
        return (
            <Web3ReactProvider getLibrary={getLibrary}>
                <Web3ProviderWallet getLibrary={getLibrary}>
                    <WrappedComponent {...props} />
                </Web3ProviderWallet>
            </Web3ReactProvider>
        );
    };

    component.displayName = `withWeb3ReactProvider(${getDisplayName(WrappedComponent)})`;
    return component;
};

export default withWeb3ReactProvider;
