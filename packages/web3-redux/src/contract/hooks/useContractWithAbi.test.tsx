import { assert } from 'chai';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { useContractWithAbi } from './useContractWithAbi.js';
import { IERC20 } from '../../abis/index.js';

import { name } from '../common.js';
import { networkId, ADDRESS_0 } from '../../test/data.js';
import { createStore, StoreType } from '../../store.js';

import { expectThrowsAsync } from '../../test/index.js';

import jsdom from 'mocha-jsdom';

describe(`${name}/hooks/useContractWithAbi.test.tsx`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    let wrapper: any;

    beforeEach(async () => {
        ({ store } = createStore());
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    describe('useContractWithAbi()', async () => {
        it('default', async () => {
            const { result, waitForNextUpdate } = renderHook(
                () => useContractWithAbi(networkId, ADDRESS_0, IERC20.abi as any),
                {
                    wrapper,
                },
            );

            //https://react-hooks-testing-library.com/reference/api#act
            //https://reactjs.org/docs/test-utils.html#act
            const value = result.current;
            assert.isDefined(value, 'result.current[0] undefined! Contract not created');
            assert.equal(result.all.length, 2, 'result.length != 2'); //[[undefined,], [contract,]]
            //No additional re-renders frm background tasks
            await expectThrowsAsync(waitForNextUpdate, 'Timed out in waitForNextUpdate after 1000ms.');
        });
    });
});