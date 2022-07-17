import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import useAtPath from './useAtPath.js';
import { catAction } from '../actions/index.js';

/**
 * Reads IPFS content from store and makes a call to cat content.
 * @category Hooks
 * */
export const useIpfs = (path: string | undefined) => {
    const dispatch = useDispatch();

    const content = useAtPath(path);

    const dataExists = content?.data || false;
    const action = useMemo(() => {
        if (path && !dataExists) return catAction({ path });
    }, [path, dataExists]);

    useEffect(() => {
        if (action) dispatch(action);
    }, [dispatch, action]);

    return { contentId: content?.contentId, data: content?.data };
};

export default useIpfs;
