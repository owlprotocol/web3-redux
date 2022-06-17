import useIpfs from './useIpfs.js';
import useHttpGet from '../../http/hooks/useHttpGet.js';

/**
 * Get content for URI depending on protocol
 * @category Hooks
 * */
export const useURI = (uriPath: string | undefined) => {
    const uri = uriPath ? new URL(uriPath) : undefined;
    //Check Protocol
    //If IPFS
    const isIpfsURI = uri?.protocol === 'ipfs:';
    const ipfsUri = isIpfsURI ? uriPath?.replace('ipfs://', '') : undefined;
    const { data: ipfsContent, contentId } = useIpfs(ipfsUri);

    //console.debug({ uri, tokenURI, protocol: uri?.protocol })
    //If HTTP(S)
    const isHttpURI = uri?.protocol === 'http:' || uri?.protocol === 'https:';
    const httpURI = isHttpURI ? uriPath : undefined;
    const [httpContent] = useHttpGet(httpURI);

    const content = ipfsContent ?? httpContent;
    return [content, { contentId }];
};
