import { Image } from '@chakra-ui/react';
import { IPFSCache } from '@owlprotocol/web3-redux';
import { useMemo } from 'react';
import { Base64 } from 'js-base64';

//https://www.iana.org/assignments/media-types/media-types.xhtml#image
export interface Props {
    cid: string | undefined;
    mimeType?: 'image/png' | 'image/jpeg' | 'image/svg+xml' | 'image/gif' | string;
    alt?: string;
}

export const IPFSReadImage = ({ cid, mimeType = 'image/png', alt = 'Loading...' }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data } = IPFSCache.hooks.useCat(cid);
    const dataUrl = useMemo(() => {
        if (data) {
            const data64 = Base64.fromUint8Array(data);
            const url = `data:${mimeType};base64,${data64}`;

            return url;
        }
    }, [data, mimeType]);

    return (
        <>
            <Image src={dataUrl} alt={alt} h={'100%'} w={'100%'} objectFit={'scale-down'} />
        </>
    );
};

export default IPFSReadImage;
