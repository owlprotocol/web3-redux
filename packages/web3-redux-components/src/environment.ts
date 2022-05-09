import type { ImportMetaEnv } from './vite-env';

let environment = {
    VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
    VITE_INFURA_API_KEY: import.meta.env.VITE_INFURA_API_KEY,
} as ImportMetaEnv;

export const setEnvironment = (env: Partial<ImportMetaEnv>) => {
    //Merge
    environment = { ...environment, ...env };
};

export const getEnvironment = () => {
    return environment;
};
