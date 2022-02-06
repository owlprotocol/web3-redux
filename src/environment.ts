import path from 'path';
import isClient from './utils/isClient';

//Pass custom env file arg
const args = process.argv;
const envfileName = args.length > 2 ? args[2] : '.env';
const envfile = path.resolve(process.cwd(), envfileName);
//Avoid crashing if in React context
if (!isClient()) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('dotenv').config({ path: envfile });
}

function getEnvVar(name: string) {
    return process.env[name] ?? process.env[`REACT_APP_${name}`] ?? process.env[`NEXT_PUBLIC_${name}`];
}

export const INFURA_API_KEY = getEnvVar('INFURA_API_KEY');
export const ETHERSCAN_API_KEY = getEnvVar('ETHERSCAN_API_KEY');

export const GANACHE_RPC = getEnvVar('GANACHE_RPC') ?? 'ws://localhost:8546';
export const MAINNET_RPC =
    getEnvVar('MAINNET_RPC') ?? INFURA_API_KEY ? `wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}` : undefined;
export const ROPSTEN_RPC =
    getEnvVar('ROPSTEN_RPC') ?? INFURA_API_KEY ? `wss://ropsten.infura.io/ws/v3/${INFURA_API_KEY}` : undefined;
export const RINKEBY_RPC =
    getEnvVar('RINKEBY_RPC') ?? INFURA_API_KEY ? `wss://rinkeby.infura.io/ws/v3/${INFURA_API_KEY}` : undefined;
export const GOERLI_RPC =
    getEnvVar('GOERLI_RPC') ?? INFURA_API_KEY ? `wss://goerli.infura.io/ws/v3/${INFURA_API_KEY}` : undefined;
export const KOVAN_RPC =
    getEnvVar('KOVAN_RPC') ?? INFURA_API_KEY ? `wss://kovan.infura.io/ws/v3/${INFURA_API_KEY}` : undefined;
export const POLYGON_RPC =
    getEnvVar('POLYGON_RPC') ?? INFURA_API_KEY ? `http://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}` : undefined;
export const POLYGON_MUMBAI_RPC =
    getEnvVar('POLYGON_MUMBAI_RPC') ?? INFURA_API_KEY
        ? `http://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`
        : undefined;
export const ARBITRUM_RPC =
    getEnvVar('ARBITRUM_RPC') ?? INFURA_API_KEY ? `http://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}` : undefined;
export const ARBITRUM_RINKEBY_RPC =
    getEnvVar('ARBITRUM_RINKEBY_RPC') ?? INFURA_API_KEY
        ? `http://arbitrum-rinkeby.infura.io/v3/${INFURA_API_KEY}`
        : undefined;
export const OPTIMISM_RPC =
    getEnvVar('OPTIMISM_RPC') ?? INFURA_API_KEY ? `http://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}` : undefined;
export const OPTIMISM_KOVAN_RPC =
    getEnvVar('OPTIMISM_KOVAN_RPC') ?? INFURA_API_KEY
        ? `http://optimism-kovan.infura.io/v3/${INFURA_API_KEY}`
        : undefined;
