import { WebStorage } from 'redux-persist/lib/types';
//https://dev.to/shinshin86/a-mock-of-localstorage-written-in-typescript-2680
type Store = any;

export class LocalStorageAsyncMock implements WebStorage {
    store: Store;
    length: number;

    constructor() {
        this.store = {};
        this.length = 0;
    }

    key(n: number): Promise<any> {
        return new Promise((resolve, reject) => {
            if (typeof n === 'undefined') {
                reject(
                    new Error(
                        'Uncaught TypeError: Failed to execute "key" on "Storage": 1 argument required, but only 0 present.',
                    ),
                );
            }

            if (n >= Object.keys(this.store).length) {
                resolve(null);
            }

            resolve(Object.keys(this.store)[n]);
        });
    }

    getItem(key: string): Promise<Store | null> {
        //console.debug(`(${key})`)
        return new Promise((resolve) => {
            if (!Object.keys(this.store).includes(key)) {
                resolve(null);
            }

            resolve(this.store[key]);
        });
    }

    setItem(key: string, value: any): Promise<undefined> {
        //console.debug(`setItem(${key},${value})`)
        return new Promise((resolve, reject) => {
            if (typeof key === 'undefined' && typeof value === 'undefined') {
                reject(
                    new Error(
                        'Uncaught TypeError: Failed to execute "setItem" on "Storage": 2 arguments required, but only 0 present.',
                    ),
                );
            }

            if (typeof value === 'undefined') {
                reject(
                    new Error(
                        'Uncaught TypeError: Failed to execute "setItem" on "Storage": 2 arguments required, but only 1 present.',
                    ),
                );
            }

            if (!key) resolve(undefined);

            this.store[key] = value.toString() || '';
            this.length = Object.keys(this.store).length;

            resolve(undefined);
        });
    }

    removeItem(key: string): Promise<undefined> {
        return new Promise((resolve, reject) => {
            if (typeof key === 'undefined') {
                reject(
                    new Error(
                        'Uncaught TypeError: Failed to execute "removeItem" on "Storage": 1 argument required, but only 0 present.',
                    ),
                );
            }

            delete this.store[key];
            this.length = Object.keys(this.store).length;
            resolve(undefined);
        });
    }

    clear(): Promise<undefined> {
        return new Promise((resolve) => {
            this.store = {};
            this.length = 0;
            resolve(undefined);
        });
    }
}

export const getLocalStorageAsyncMock = (): any => {
    return new LocalStorageAsyncMock();
};
