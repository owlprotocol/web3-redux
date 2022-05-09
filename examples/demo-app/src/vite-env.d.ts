/// <reference types="vite/client" />

export interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
