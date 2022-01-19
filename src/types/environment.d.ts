declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            LOCAL_RPC?: string;
            MAINNET_RPC?: string;
            ROPSTEN_RPC?: string;
            KOVAN_RPC?: string;
            RINKEBY_RPC?: string;
            GOERLI_RPC?: string;
            REACT_APP_LOCAL_RPC?: string;
            REACT_APP_MAINNET_RPC?: string;
            REACT_APP_ROPSTEN_RPC?: string;
            REACT_APP_KOVAN_RPC?: string;
            REACT_APP_RINKEBY_RPC?: string;
            REACT_APP_GOERLI_RPC?: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
