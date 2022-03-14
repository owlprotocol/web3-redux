declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            GANACHE_RPC?: string;
            MAINNET_RPC?: string;
            ROPSTEN_RPC?: string;
            KOVAN_RPC?: string;
            RINKEBY_RPC?: string;
            GOERLI_RPC?: string;
            ETHERSCAN_API_KEY?: string;
            INFURA_API_KEY?: string;
            LOG_REDUX_ACTIONS?: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
