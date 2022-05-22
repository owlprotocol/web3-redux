import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Network, Contract, TestData, Environment } from '@owlprotocol/web3-redux';
import getDisplayName from './getDisplayName';
import { getEnvironment } from '../environment';
//@ts-ignore
Environment.setEnvironment(getEnvironment());

export const withMockData = (WrappedComponent: any) => {
    const Component = (props: any) => {
        const dispatch = useDispatch();

        const [networkMainnet, networkArbitrum, networkOptimism, networkPolygon, networkGanache] = useSelector(
            (state) => Network.selectByIdMany(state, ['1', '42161', '10', '137', '1337']),
        );
        useEffect(() => {
            if (!networkMainnet) dispatch(Network.create({ networkId: '1' }));
        }, [dispatch, networkMainnet]);
        useEffect(() => {
            if (!networkArbitrum) dispatch(Network.create({ networkId: '42161' }));
        }, [dispatch, networkArbitrum]);
        useEffect(() => {
            if (!networkOptimism) dispatch(Network.create({ networkId: '10' }));
        }, [dispatch, networkOptimism]);
        useEffect(() => {
            if (!networkPolygon) dispatch(Network.create({ networkId: '137' }));
        }, [dispatch, networkPolygon]);
        useEffect(() => {
            if (!networkGanache) dispatch(Network.create({ networkId: '1337', web3Rpc: 'ws://localhost:8545' }));
        }, [dispatch, networkGanache]);

        const [
            contractVITALIK,
            contractWETH,
            contractUSDC,
            contractTETHER,
            contractCHAINLINK,
            contractVeeFriendsSeries2,
            contractOZTeam,
            contractKithFriends,
            contractSkyweaver,
            contractUSDCGanache,
        ] = useSelector((state) =>
            Contract.selectByIdMany(state, [
                { networkId: '1', address: TestData.VITALIK },
                { networkId: '1', address: TestData.WETH },
                { networkId: '1', address: TestData.USDC },
                { networkId: '1', address: TestData.TETHER },
                { networkId: '1', address: TestData.CHAINLINK },
                { networkId: '1', address: TestData.VEE_FRIENDS_SERIES2 },
                { networkId: '1', address: TestData.OZ_TEAM },
                { networkId: '1', address: TestData.KITH_FRIENDS },
                { networkId: '137', address: TestData.SKYWEAVER },
                { networkId: '1337', address: TestData.USDC },
            ]),
        );
        useEffect(() => {
            if (!contractVITALIK) dispatch(Contract.create(TestData.contractVITALIK));
        }, [contractVITALIK, dispatch]);
        useEffect(() => {
            if (!contractWETH) dispatch(Contract.create(TestData.contractWETH));
        }, [contractWETH, dispatch]);
        useEffect(() => {
            if (!contractUSDC) dispatch(Contract.create(TestData.contractUSDC));
        }, [contractUSDC, dispatch]);
        useEffect(() => {
            if (!contractTETHER) dispatch(Contract.create(TestData.contractTETHER));
        }, [contractTETHER, dispatch]);
        useEffect(() => {
            if (!contractCHAINLINK) dispatch(Contract.create(TestData.contractCHAINLINK));
        }, [contractCHAINLINK, dispatch]);
        useEffect(() => {
            if (!contractVeeFriendsSeries2) dispatch(Contract.create(TestData.contractVeeFriendsSeries2));
        }, [contractVeeFriendsSeries2, dispatch]);
        useEffect(() => {
            if (!contractOZTeam) dispatch(Contract.create(TestData.contractOZTeam));
        }, [contractOZTeam, dispatch]);
        useEffect(() => {
            if (!contractKithFriends) dispatch(Contract.create(TestData.contractKithFriends));
        }, [contractKithFriends, dispatch]);
        useEffect(() => {
            if (!contractSkyweaver) dispatch(Contract.create(TestData.contractSkyWeaver));
        }, [contractSkyweaver, dispatch]);
        useEffect(() => {
            if (!contractUSDCGanache) dispatch(Contract.create({ ...TestData.contractUSDC, networkId: '1337' }));
        }, [contractUSDCGanache, dispatch]);

        const networks = [networkMainnet, networkArbitrum, networkOptimism, networkPolygon];
        const contracts = [
            contractVITALIK,
            contractWETH,
            contractUSDC,
            contractTETHER,
            contractCHAINLINK,
            contractVeeFriendsSeries2,
            contractOZTeam,
            contractKithFriends,
            contractSkyweaver,
        ];
        const all = [...networks, ...contracts];
        const allDefined = all.reduce((acc, val) => acc && !!val, true);

        if (!allDefined) return <>Loading React State...</>;
        else return <WrappedComponent {...props} />;
    };
    Component.displayName = `withMockData(${getDisplayName(WrappedComponent)})`;
    return Component;
};
