import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { httpGet as httpGetAction } from '../actions/index.js';
import HTTPCacheCRUD from '../crud.js';

/**
 * Get content for HTTP URI
 * @category Hooks
 * */
export const useHttpGet = (uri: string | undefined) => {
    const dispatch = useDispatch();
    const httpRequest = HTTPCacheCRUD.hooks.useGet({ id: uri });
    const data = httpRequest == 'loading' ? undefined : httpRequest?.data;
    const dataExists = !!data;

    useEffect(() => {
        //Get http api content
        if (uri && !dataExists) dispatch(httpGetAction({ url: uri }));
    }, [uri, dataExists]);

    return [data];
};

export default useHttpGet;
