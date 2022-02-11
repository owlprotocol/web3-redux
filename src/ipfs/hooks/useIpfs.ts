import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle as selectIpfs } from '../selectors';
import { fetchIpfs as fetchIpfsAction } from '../actions';

/**
 * Reads IPFS content from store and makes a call to fetch content.
 * @category Hooks
 * */
export const useIpfs = (contentId: string | undefined, fetch = 'ifnull' as 'ifnull' | true | false) => {
    const dispatch = useDispatch();

    const content = useSelector((state) => selectIpfs(state, contentId));
    const action = useMemo(() => {
        if (contentId && ((fetch === 'ifnull' && !content) || fetch === true)) {
            return fetchIpfsAction({ contentId });
        }
    }, [content, fetch]);

    useEffect(() => {
        if (action) dispatch(action);
    }, [dispatch, action]);

    return content?.data;
};

export default useIpfs;
