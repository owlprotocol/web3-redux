import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { create as createNetwork } from '../../network/actions';

import { name } from '../common';
import { networkId } from '../../test/data';
import { createStore, StoreType } from '../../store';
import { create } from '../actions';

import useFetchTransactions from './useFetchTransactions';
import { ETHERSCAN_API_KEY } from '../../environment';
import { expectThrowsAsync } from '../../utils';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}/hooks/useFetchTransactions.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    const address = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; //WETH Contract

    beforeEach(() => {
        ({ store } = createStore());
        store.dispatch(
            createNetwork({
                networkId,
                explorerApiUrl: 'https://api.etherscan.io/api',
                explorerApiKey: ETHERSCAN_API_KEY,
            }),
        );
        store.dispatch(create({ networkId, address }));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useFetchTransactions', () => {
        it('(networkId, address)', async () => {
            const { result, waitForNextUpdate } = renderHook(() => useFetchTransactions(networkId, address), {
                wrapper,
            });

            await waitForNextUpdate();
            assert.equal(result.current.length, 10, 'result.current.length');
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});
