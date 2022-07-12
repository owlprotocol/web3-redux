import { IPFSCache } from '@owlprotocol/web3-redux';
import { useMemo } from 'react';
import { Buffer } from 'buffer';

//https://www.iana.org/assignments/media-types/media-types.xhtml#image
export interface Props {
    cid: string | undefined;
    //mimeType?: 'application/json';
}

export const IPFSReadJSON = ({ cid }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data } = IPFSCache.hooks.useCat(cid);

    const dataTxt = useMemo(() => {
        if (!!data) {
            return Buffer.from(data).toString('utf-8');
        }
    }, [data]);

    return <>{dataTxt}</>;
};

export default IPFSReadJSON;
