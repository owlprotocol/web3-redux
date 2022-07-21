import { assert } from 'chai';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import { useAccount } from './useAccount.js';
import { ADDRESS_0, ADDRESS_1 } from '../../test/data.js';
import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';
import { setAccount } from '../actions/index.js';

describe(`${name}/hooks/useAccount.test.tsx`, () => {
    let store: StoreType;
    let wrapper: any;

    beforeEach(() => {
        store = createStore();
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useAccount', () => {
        it('()', () => {
            store.dispatch(setAccount(ADDRESS_0));
            const { result } = renderHook(() => useAccount(), {
                wrapper,
            });

            assert.equal(result.current[0], ADDRESS_0, 'result.current');
            act(() => {
                result.current[1](ADDRESS_1);
            });
            assert.equal(result.current[0], ADDRESS_1, 'result.current');
        });
    });
});
