import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectIpfs } from '../selectors/index.js';
import { cat2 as catAction } from '../actions/index.js';

/**
 * Reads IPFS content from store and makes a call to fetch content.
 * @category Hooks
 * */
export const useCat = (path: string | undefined) => {
    const dispatch = useDispatch();

    const content = useSelector((state) => selectIpfs(state, path));

    const dataExists = !!content?.data;
    const action = useMemo(() => {
        if (path && !dataExists) {
            return catAction({ path });
        }
    }, [path, dataExists]);

    useEffect(() => {
        if (action) dispatch(action);
    }, [dispatch, action]);

    return { contentId: path, data: content?.data };
};

export default useCat;
