import { assert } from 'chai';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { useNetworkId } from './useNetworkId.js';
import { name } from '../common.js';
import { createStore, StoreType } from '../../store.js';
import { setNetworkId } from '../actions/index.js';

describe(`${name}/hooks/useNetworkId.test.tsx`, () => {
    let store: StoreType;
    let wrapper: any;

    beforeEach(() => {
        store = createStore();
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useNetworkId', () => {
        it('()', () => {
            store.dispatch(setNetworkId('1'));
            const { result } = renderHook(() => useNetworkId(), {
                wrapper,
            });

            assert.equal(result.current[0], '1', 'result.current');
            act(() => {
                result.current[1]('2');
            });
            assert.equal(result.current[0], '2', 'result.current');
        });
    });
});
