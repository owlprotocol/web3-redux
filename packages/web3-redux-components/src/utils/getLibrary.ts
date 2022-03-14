import Web3 from 'web3';

export function getLibrary(provider: any): Web3 | undefined {
    /*
    const library = new Web3Provider(provider, 'any')
    library.pollingInterval = 15000 //TODO: Configure pollingInterval
    */
    if (provider) {
        const web3 = new Web3(provider);
        //@ts-expect-error
        web3.eth.ens._lastSyncCheck = Number.MAX_SAFE_INTEGER;
        web3.eth.ens.registryAddress = '0x0000000000000000000000000000000000000000';
        //Add wallet_switchEthereumChain
        web3.extend({
            property: 'eth',
            methods: [
                //@ts-expect-error
                new web3.extend.Method({
                    name: 'switchEthereumChain',
                    call: 'wallet_switchEthereumChain',
                    params: 1,
                }),
            ],
        });
        //Add wallet_addEthereumChain
        web3.extend({
            property: 'eth',
            methods: [
                //@ts-expect-error
                new web3.extend.Method({
                    name: 'addEthereumChain',
                    call: 'wallet_addEthereumChain',
                    params: 1,
                }),
            ],
        });

        return web3;
    }

    return undefined;
}

export default getLibrary;
