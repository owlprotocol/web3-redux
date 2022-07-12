import { Contract, Config } from '@owlprotocol/web3-redux';

/**
 * Hook that uses the ProxyFactory.sol smart contract to
 * deploy minimal proxies.
 *
 * @returns callback function to deploy
 */
export function useProxyFactory(
    networkId: string | undefined,
    factoryAddress: string | undefined,
    implementationAddress: string | undefined,
    initMethodName: string,
    initArgs: any[],
) {
    const [account] = Config.hooks.useAccount();
    console.debug({ networkId, factoryAddress, implementationAddress, initMethodName, initArgs });

    /**
     * TODO:
     * - Get implementation contract abi
     * - Get initializer function
     * - Encode initData = [4byte selector, initializer args]
     *
     */

    const initData = '';

    //TODO: Additional args (salt?)
    const args = [implementationAddress, initData];

    const [sendTx, { error: sendError, contractSend }] = Contract.hooks.useContractSend(
        networkId,
        factoryAddress,
        'deployProxy',
        args,
        {
            from: account,
        },
    );

    return [sendTx, { error: sendError, contractSend }];
}

export default useProxyFactory;
