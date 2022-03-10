import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectIpfs, selectPathHash } from '../selectors/index.js';
import { fetchIpfs as fetchIpfsAction } from '../actions/index.js';

/**
 * Reads IPFS content from store and makes a call to fetch content.
 * @category Hooks
 * */
export const useIpfs = (path: string | undefined, fetch = 'ifnull' as 'ifnull' | true | false) => {
    const dispatch = useDispatch();

    const pathHash = useSelector((state) => selectPathHash(state, path));
    const content = useSelector((state) => selectIpfs(state, pathHash));

    const dataExists = content?.data || false;
    const action = useMemo(() => {
        if (path && ((fetch === 'ifnull' && !dataExists) || fetch === true)) {
            return fetchIpfsAction(path);
        }
    }, [path, fetch, dataExists]);

    useEffect(() => {
        if (action) dispatch(action);
    }, [dispatch, action]);

    return { contentId: pathHash, data: content?.data };
};

export default useIpfs;
