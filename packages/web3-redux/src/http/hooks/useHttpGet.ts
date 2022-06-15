import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectByIdSingle } from '../selectors';
import { httpGet as httpGetAction } from '../actions/index.js';

/**
 * Get content for HTTP URI
 * @category Hooks
 * */
export const useHttpGet = (uri: string | undefined) => {
    const dispatch = useDispatch();
    const httpRequest = useSelector((state) => selectByIdSingle(state, uri));
    const dataExists = !!httpRequest?.data;

    useEffect(() => {
        //Get http api content
        if (uri && !dataExists) dispatch(httpGetAction({ url: uri }));
    }, [uri, dataExists]);

    return [httpRequest?.data];
};

export default useHttpGet;
