import { assert } from 'chai';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { ADDRESS_0, ADDRESS_1 } from '../../test/data';
import { name } from '../common';
import { createStore, StoreType } from '../../store';
import useAccount from './useAccount';
import { setAccount } from '../actions';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}/hooks/useAccount.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    beforeEach(() => {
        ({ store } = createStore());
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
