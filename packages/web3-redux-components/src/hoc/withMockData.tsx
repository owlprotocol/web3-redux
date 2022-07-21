import { Config, Network, Environment } from '@owlprotocol/web3-redux';
import getDisplayName from './getDisplayName.js';
import { getEnvironment } from '../environment.js';

Environment.setEnvironment(getEnvironment() as any);

const corsProxy = getEnvironment().VITE_CORS_PROXY;
const defaultConfig = { corsProxy };

export const withMockData = (WrappedComponent: any) => {
    const Component = (props: any) => {
        //Config
        Config.hooks.useConfig(defaultConfig);
        //Networks
        /*
        useEffect(() => {
            if (!networkOwl) dispatch(Network.create({ networkId: '1337', web3Rpc: import.meta.env.VITE_OWL_RPC }));
        }, [dispatch, networkOwl]);

        const config = Config.useConfig();
        useEffect(() => {
            if (config.ipfsUrl != import.meta.env.VITE_IPFS_URL)
                dispatch(Config.set({ id: '0', key: 'ipfsUrl', value: import.meta.env.VITE_IPFS_URL }));
        }, [dispatch, config]);
        */

        Network.hooks.useNetwork('1', true);
        Network.hooks.useNetwork('42161', true);
        Network.hooks.useNetwork('10', true);
        Network.hooks.useNetwork('137', true);
        Network.hooks.useNetwork('1337', true);
        /*
        //ERC20
        Contract.hooks.useContract('1', TestData.VITALIK, {
            networkId: '1',
            address: TestData.VITALIK,
            label: 'Vitalik',
            tags: ['EOA'],
        });
        Contract.hooks.useContract('1', TestData.contractWETH.address, TestData.contractWETH);
        Contract.hooks.useContract('1', TestData.contractUSDC.address, TestData.contractUSDC);
        Contract.hooks.useContract('1', TestData.contractTETHER.address, TestData.contractTETHER);
        Contract.hooks.useContract('1', TestData.contractCHAINLINK.address, TestData.contractCHAINLINK);
        //ERC721
        Contract.hooks.useContract('1', TestData.contractVeeFriendsSeries2.address, TestData.contractVeeFriendsSeries2);
        Contract.hooks.useContract('1', TestData.contractOZTeam.address, TestData.contractOZTeam);
        //ERC1155
        Contract.hooks.useContract('1', TestData.contractKithFriends.address, TestData.contractKithFriends);
        Contract.hooks.useContract('137', TestData.contractSkyWeaver.address, TestData.contractSkyWeaver);
        */

        return <WrappedComponent {...props} />;
    };
    Component.displayName = `withMockData(${getDisplayName(WrappedComponent)})`;
    return Component;
};
