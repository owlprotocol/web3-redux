import { assert } from 'chai';
import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';

import { name } from '../common';
import { createStore, StoreType } from '../../store';
import { create } from '../actions';
import { useByIdSingle, useByIdMany } from './index';
import Interface, { Id } from '../model/interface';
import { ZERO_ADDRESS } from '../../utils';

//eslint-disable-next-line @typescript-eslint/no-var-requires
const jsdom = require('mocha-jsdom');

describe(`${name}.hooks`, () => {
    jsdom({ url: 'http://localhost' });

    let store: StoreType;
    const networkId = '1337';

    let item: Interface;
    let id: Id;

    let wrapper: any;
    before(async () => {
        item = { id: '0', networkId, account: ZERO_ADDRESS };
        id = item.id;
    });

    beforeEach(() => {
        store = createStore();
        store.dispatch(create(item));
        wrapper = ({ children }: any) => <Provider store={store}> {children} </Provider>;
    });

    it('useByIdSingle', async () => {
        const { result } = renderHook(() => useByIdSingle(id), {
            wrapper,
        });

        assert.deepEqual(result.current, item);
        assert.equal(result.all.length, 1);
    });

    it('useByIdMany', async () => {
        const { result } = renderHook(() => useByIdMany([id]), {
            wrapper,
        });

        assert.deepEqual(result.current, [item]);
        assert.equal(result.all.length, 1);
    });
});
