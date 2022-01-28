import path from 'path';
import dotenv from 'dotenv';

//Pass custom env file arg
const args = process.argv;
const envfileName = args.length > 2 ? args[2] : '.env';
const envfile = path.resolve(process.cwd(), envfileName);
dotenv.config({ path: envfile });

function getEnvVar(name: string) {
    return process.env[name] ?? process.env[`REACT_APP_${name}`] ?? process.env[`NEXT_PUBLIC_${name}`];
}

export const INFURA_API_KEY = getEnvVar('INFURA_API_KEY');
export const ETHERSCAN_API_KEY = getEnvVar('ETHERSCAN_API_KEY');

export const GANACHE_RPC = getEnvVar('GANACE_RPC') ?? 'ws://localhost:8546';
export const MAINNET_RPC = getEnvVar('MAINNET_RPC') ?? `wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}`;
export const ROPSTEN_RPC = getEnvVar('ROPSTEN_RPC') ?? `wss://ropsten.infura.io/ws/v3/${INFURA_API_KEY}`;
export const RINKEBY_RPC = getEnvVar('RINKEBY_RPC') ?? `wss://rinkeby.infura.io/ws/v3/${INFURA_API_KEY}`;
export const GOERLI_RPC = getEnvVar('GOERLI_RPC') ?? `wss://goerli.infura.io/ws/v3/${INFURA_API_KEY}`;
export const KOVAN_RPC = getEnvVar('KOVAN_RPC') ?? `wss://kovan.infura.io/ws/v3/${INFURA_API_KEY}`;
export const POLYGON_RPC = getEnvVar('POLYGON_RPC') ?? `http://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`;
export const POLYGON_MUMBAI_RPC =
    getEnvVar('POLYGON_MUMBAI_RPC') ?? `http://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`;
export const ARBITRUM_RPC = getEnvVar('ARBITRUM_RPC') ?? `http://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}`;
export const ARBITRUM_RINKEBY_RPC =
    getEnvVar('ARBITRUM_RINKEBY_RPC') ?? `http://arbitrum-rinkeby.infura.io/v3/${INFURA_API_KEY}`;
export const OPTIMISM_RPC = getEnvVar('OPTIMISM_RPC') ?? `http://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}`;
export const OPTIMISM_KOVAN_RPC =
    getEnvVar('OPTIMISM_KOVAN_RPC') ?? `http://optimism-kovan.infura.io/v3/${INFURA_API_KEY}`;
