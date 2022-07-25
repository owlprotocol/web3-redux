/**
 * Environment variable utilities.
 * @module Environment
 */
//import { isClient } from './utils/isClient.js';

interface Environment {
    [k: string]: string | undefined;
}

let environment: Environment = {};

//Avoid crashing if in browser context
/*
if (!isClient()) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('path');
    //Pass custom env file arg
    const args = process.argv;
    const envfileName = args.length > 2 ? args[2] : '.env';
    const envfile = path.resolve(process.cwd(), envfileName);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({ path: envfile });
    //Set local NodeJS env
    environment = process.env;
}
*/

export const setEnvironment = (env: Partial<Environment>) => {
    //Merge
    environment = { ...environment, ...env };
};

export const getEnvironment = () => {
    return environment;
};

/**
 * Get an environment variable in one of the following formants:
 * - `name`
 * - `REACT_APP_name`
 * - `NEXT_PUBLIC_name`
 */
export function getEnvVar(name: string): string | undefined {
    const prefixes = ['', 'REACT_APP_', 'NEXT_PUBLIC_', 'VITE_'];
    for (const p of prefixes) {
        const fullName = `${p}${name}`;
        if (environment[fullName]) return environment[fullName];
    }
}

/** CORS Proxy Endpoint */
export const CORS_PROXY = () => getEnvVar('CORS_PROXY');
/**
 * Infura API Project Id.
 * Used to defive default Infura connection uri. */
export const INFURA_API_KEY = () => getEnvVar('INFURA_API_KEY');
/** Etherscan API Key */
export const ETHERSCAN_API_KEY = () => getEnvVar('ETHERSCAN_API_KEY');
export const LOG_REDUX_ACTIONS = () => getEnvVar('LOG_REDUX_ACTIONS');

/** Local Ganache Blockchain */
export const GANACHE_RPC = () => getEnvVar('GANACHE_RPC') ?? 'ws://localhost:8545';

/** Ethereum Mainnet Blockchain */
export const MAINNET_RPC = () =>
    getEnvVar('MAINNET_RPC') ?? INFURA_API_KEY() ? `wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY()}` : undefined;
export const MAINNET_EXPLORER = () => getEnvVar('MAINNET_EXPLORER') ?? 'https://etherscan.io/';
export const MAINNET_EXPLORER_API = () => getEnvVar('MAINNET_EXPLORER_API') ?? 'https://api.etherscan.io/api';

export const ROPSTEN_RPC = () =>
    getEnvVar('ROPSTEN_RPC') ?? INFURA_API_KEY() ? `wss://ropsten.infura.io/ws/v3/${INFURA_API_KEY()}` : undefined;
export const ROPSTEN_EXPLORER = () => getEnvVar('ROPSTEN_EXPLORER') ?? 'https://ropsten.etherscan.io/';
export const ROPSTEN_EXPLORER_API = () => getEnvVar('ROPSTEN_EXPLORER_API') ?? 'https://api-ropsten.etherscan.io/api';

export const RINKEBY_RPC = () =>
    getEnvVar('RINKEBY_RPC') ?? INFURA_API_KEY() ? `wss://rinkeby.infura.io/ws/v3/${INFURA_API_KEY()}` : undefined;
export const RINKEBY_EXPLORER = () => getEnvVar('RINKEBY_EXPLORER') ?? 'https://rinkeby.etherscan.io/';
export const RINKEBY_EXPLORER_API = () => getEnvVar('RINKEBY_EXPLORER_API') ?? 'https://api-rinkeby.etherscan.io/api';

export const GOERLI_RPC = () =>
    getEnvVar('GOERLI_RPC') ?? INFURA_API_KEY() ? `wss://goerli.infura.io/ws/v3/${INFURA_API_KEY()}` : undefined;
export const GOERLI_EXPLORER = () => getEnvVar('GOERLI_EXPLORER') ?? 'https://goerli.etherscan.io/';
export const GOERLI_EXPLORER_API = () => getEnvVar('GOERLI_EXPLORER_API') ?? 'https://api-goerli.etherscan.io/api';

export const KOVAN_RPC = () =>
    getEnvVar('KOVAN_RPC') ?? INFURA_API_KEY() ? `wss://kovan.infura.io/ws/v3/${INFURA_API_KEY()}` : undefined;
export const KOVAN_EXPLORER = () => getEnvVar('KOVAN_EXPLORER') ?? 'https://kovan.etherscan.io/';
export const KOVAN_EXPLORER_API = () => getEnvVar('KOVAN_EXPLORER_API') ?? 'https://api-kovan.etherscan.io/api';

export const POLYGON_RPC = () =>
    getEnvVar('POLYGON_RPC') ?? INFURA_API_KEY()
        ? `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY()}`
        : undefined;
export const POLYGON_EXPLORER = () => getEnvVar('POLYGON_EXPLORER') ?? 'https://polygonscan.com/';
export const POLYGON_EXPLORER_API = () => getEnvVar('POLYGON_EXPLORER_API') ?? 'https://api.polygonscan.com/api';

export const POLYGON_MUMBAI_RPC = () =>
    getEnvVar('POLYGON_MUMBAI_RPC') ?? INFURA_API_KEY()
        ? `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY()}`
        : undefined;
export const POLYGON_MUMBAI_EXPLORER = () => getEnvVar('POLYGON_MUMBAI_EXPLORER') ?? 'https://testnet.polygonscan.com/';
export const POLYGON_MUMBAI_EXPLORER_API = () =>
    getEnvVar('POLYGON_MUMBAI_EXPLORER_API') ?? 'https://api-testnet.polygonscan.com/api';

export const ARBITRUM_RPC = () =>
    getEnvVar('ARBITRUM_RPC') ?? INFURA_API_KEY()
        ? `https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY()}`
        : undefined;
export const ARBITRUM_EXPLORER = () => getEnvVar('ARBITRUM_EXPLORER') ?? 'https://arbiscan.io/';
export const ARBITRUM_EXPLORER_API = () => getEnvVar('ARBITRUM_EXPLORER_API') ?? 'https://api.arbiscan.io/api';

export const ARBITRUM_RINKEBY_RPC = () =>
    getEnvVar('ARBITRUM_RINKEBY_RPC') ?? INFURA_API_KEY()
        ? `https://arbitrum-rinkeby.infura.io/v3/${INFURA_API_KEY()}`
        : undefined;

export const OPTIMISM_RPC = () =>
    getEnvVar('OPTIMISM_RPC') ?? INFURA_API_KEY()
        ? `https://optimism-mainnet.infura.io/v3/${INFURA_API_KEY()}`
        : undefined;
export const OPTIMISM_KOVAN_RPC = () =>
    getEnvVar('OPTIMISM_KOVAN_RPC') ?? INFURA_API_KEY()
        ? `https://optimism-kovan.infura.io/v3/${INFURA_API_KEY()}`
        : undefined;

export const OPTIMISM_GNOSIS_RPC = () =>
    getEnvVar('OPTIMISM_GNOSIS_RPC') ?? INFURA_API_KEY()
        ? `wss://optimism.gnosischain.com/wss/${INFURA_API_KEY()}`
        : undefined;
export const OPTIMISM_GNOSIS_EXPLORER = () =>
    getEnvVar('OPTIMISM_GNOSIS_EXPLORER') ?? 'https://blockscout.com/xdai/optimism';
export const OPTIMISM_GNOSIS_EXPLORER_API = () =>
    getEnvVar('OPTIMISIM_GNOSIS_EXPLORER_API') ?? 'https://api.blockscout.com/xdai/optimism/api';

export const AVALANCHE_RPC = () =>
    getEnvVar('AVALANCHE_RPC') ?? INFURA_API_KEY()
        ? `https://api.avax.network/ext/bc/C/rpc/${INFURA_API_KEY()}`
        : undefined;
export const AVALANCHE_EXPLORER = () => getEnvVar('AVALANCHE_EXPLORER') ?? 'https://snowtrace.io';
export const AVALANCHE_EXPLORER_API = () => getEnvVar('AVALANCHE_EXPLORER_API') ?? 'https://api.snowtrace.io/api';

export const AVALANCHE_FUJI_RPC = () =>
    getEnvVar('AVALANCHE_FUJI_RPC') ?? INFURA_API_KEY()
        ? `https://api.avax-test.network/ext/bc/C/rpc/${INFURA_API_KEY()}`
        : undefined;
export const AVALANCHE_FUJI_EXPLORER = () => getEnvVar('AVALANCHE_FUJI_EXPLORER') ?? 'https://testnet.snowtrace.io';
export const AVALANCHE_FUJI_EXPLORER_API = () =>
    getEnvVar('AVALANCHE_FUJI_EXPLORER_API') ?? 'https://api.testnet.snowtrace.io/api';

export const BSC_MAINNET_RPC = () =>
    getEnvVar('BSC_MAINNET_RPC') ?? INFURA_API_KEY() ? `wss://bsc-ws-node.nariox.org/${INFURA_API_KEY()}` : undefined;
export const BSC_MAINNET_EXPLORER = () => getEnvVar('BSC_MAINNET_EXPLORER') ?? 'https://bscscan.com';
export const BSC_MAINNET_EXPLORER_API = () => getEnvVar('BSC_MAINNET_EXPLORER_API') ?? 'https://api.bscscan.com/api';

export const BSC_TESTNET_RPC = () =>
    getEnvVar('BSC_TESTNET_RPC') ?? INFURA_API_KEY()
        ? `https://data-seed-prebsc-2-s3.binance.org:8545/${INFURA_API_KEY()}`
        : undefined;
export const BSC_TESTNET_EXPLORER = () => getEnvVar('BSC_TESTNET_EXPLORER') ?? 'https://testnet.bscscan.com';
export const BSC_TESTNET_EXPLORER_API = () =>
    getEnvVar('BSC_TESTNET_EXPLORER_API') ?? 'https://api.testnet.bscscan.com/api';

export const GNOSIS_CHAIN_RPC = () =>
    getEnvVar('POLYGON_RPC') ?? INFURA_API_KEY()
        ? `https://gnosis-mainnet.public.blastapi.io/${INFURA_API_KEY()}`
        : undefined;
export const GNOSIS_CHAIN_EXPLORER = () => getEnvVar('POLYGON_EXPLORER') ?? 'https://blockscout.com/xdai/mainnet';
export const GNOSIS_CHAIN_EXPLORER_API = () =>
    getEnvVar('POLYGON_EXPLORER_API') ?? 'https://api.blockscout.com/xdai/mainnet/api';

export const ETC_MAINNET_RPC = () =>
    getEnvVar('ETC_MAINNET_RPC') ?? INFURA_API_KEY()
        ? `https://www.ethercluster.com/etc/${INFURA_API_KEY()}`
        : undefined;
export const ETC_MAINNET_EXPLORER = () => getEnvVar('ETC_MAINNET_EXPLORER') ?? 'https://blockscout.com/etc/mainnet';
export const ETC_MAINNET_EXPLORER_API = () =>
    getEnvVar('ETC_MAINNET_EXPLORER_API') ?? 'https://api.blockscout.com/etc/mainnet/api';

export const ETC_KOTTI_RPC = () =>
    getEnvVar('ETC_KOTTI_RPC') ?? INFURA_API_KEY()
        ? `https://www.ethercluster.com/kotti/${INFURA_API_KEY()}`
        : undefined;
export const ETC_KOTTI_EXPLORER = () =>
    getEnvVar('ETC_KOTTI_EXPLORER') ?? 'https://explorer.jade.builders/?network=kotti/';
export const ETC_KOTTI_EXPLORER_API = () =>
    getEnvVar('ETC_KOTTI_EXPLORER_API') ?? 'https://api.explorer.jade.builders/?network=kotti/api';

//IPFS
//Infura uses Basic Auth for IPFS
//https://infura.io/docs/ipfs#section/Getting-Started/Create-your-Infura-IPFS-project
//TODO: Add basic auth support
/** Infura Project Id for IPFS API */
export const INFURA_IPFS_PROJECT_ID = () => getEnvVar('INFURA_IPFS_PROJECT_ID');
/** Infura Basic Auth for IPFS */
export const INFURA_IPFS_PROJECT_SECRET = () => getEnvVar('INFURA_IPFS_PROJECT_SECRET');
/** IPFS RPC */
export const IPFS_URL = () => getEnvVar('IPFS_URL') ?? 'http://localhost:5001';
/** 4byte.directory API */
export const _4BYTE_URL = () => getEnvVar('_4BYTE_URL') ?? 'https://www.4byte.directory/api/v1';
