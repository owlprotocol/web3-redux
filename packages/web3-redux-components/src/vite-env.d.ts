/// <reference types="vite/client" />

export interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_INFURA_API_KEY: string;
    readonly VITE_OWL_RPC: string;
    readonly VITE_IPFS_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
