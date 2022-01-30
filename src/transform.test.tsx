import { create as createNetwork } from './network/actions';

import { createStore, StoreType } from './store';
import { LocalStorageAsyncMock } from './test/localstorageAsync';
import { network1 } from './test/data';

describe('redux-persist test', () => {
    const localStorage = new LocalStorageAsyncMock();
    let store: StoreType;

    beforeEach(() => {
        store = createStore({ persistStorage: localStorage });
    });

    it('test redux-persist', () => {
        store.dispatch(createNetwork(network1));
        console.debug(localStorage);
    });
});
