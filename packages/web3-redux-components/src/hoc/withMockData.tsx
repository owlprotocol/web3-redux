import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Config, Network, Contract, TestData, Environment, Abi } from '@owlprotocol/web3-redux';
import getDisplayName from './getDisplayName';
import { getEnvironment } from '../environment';

Environment.setEnvironment(getEnvironment() as any);

export const withMockData = (WrappedComponent: any) => {
    const Component = (props: any) => {
        const dispatch = useDispatch();

        const config = Config.hooks.useConfig();
        useEffect(() => {
            const corsProxy = getEnvironment().VITE_CORS_PROXY;
            if (config?.corsProxy != corsProxy) dispatch(Config.actions.update({ id: '0', corsProxy }));
        }, [dispatch, config]);

        //Networks
        Network.hooks.useNetwork('1', true);
        Network.hooks.useNetwork('42161', true);
        Network.hooks.useNetwork('10', true);
        Network.hooks.useNetwork('137', true);
        Network.hooks.useNetwork('1337', true);
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

        //ERC20
        Contract.hooks.useContract('1', TestData.VITALIK, {});
        Contract.hooks.useContract('1', TestData.WETH, { abi: Abi.IERC20MetadataArtifact.abi });
        Contract.hooks.useContract('1', TestData.USDC, { abi: Abi.IERC20MetadataArtifact.abi });
        Contract.hooks.useContract('1', TestData.TETHER, {
            abi: Abi.IERC20MetadataArtifact.abi,
        });
        Contract.hooks.useContract('1', TestData.CHAINLINK, {
            abi: Abi.IERC20MetadataArtifact.abi,
        });

        //ERC721
        Contract.hooks.useContract('1', TestData.VEE_FRIENDS_SERIES2, {
            abi: Abi.IERC721MetadataArtifact.abi,
        });
        Contract.hooks.useContract('1', TestData.OZ_TEAM, {
            abi: Abi.IERC721MetadataArtifact.abi,
        });
        //ERC1155
        Contract.hooks.useContract('1', TestData.KITH_FRIENDS, {
            abi: Abi.IERC1155MetadataURIArtifact.abi,
        });
        Contract.hooks.useContract('137', TestData.SKYWEAVER, {
            abi: Abi.IERC1155MetadataURIArtifact.abi,
        });

        return <WrappedComponent {...props} />;
    };
    Component.displayName = `withMockData(${getDisplayName(WrappedComponent)})`;
    return Component;
};
