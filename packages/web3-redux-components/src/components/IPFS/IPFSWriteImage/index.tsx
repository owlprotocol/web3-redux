import { IPFSCache } from '@owlprotocol/web3-redux';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
//import { Base64 } from 'js-base64';
import { FileUploadImage } from '../../FileUpload/index.js';
import { FileData } from '../../FileUpload/FileUploadButton/index.js';

//https://www.iana.org/assignments/media-types/media-types.xhtml#image
export interface Props {
    cid: string | undefined;
    mimeType?: 'image/*' | 'image/png' | 'image/jpeg' | 'image/svg+xml' | 'image/gif' | string;
    alt?: string;
}

export const IPFSWriteImage = ({ mimeType = 'image/*' }: Props) => {
    const dispatch = useDispatch();

    const onFileDataChange = useCallback(
        (data: FileData) => {
            if (!!data) {
                const dataArr = data as ArrayBuffer;
                console.debug(dataArr);
                const addFileAction = IPFSCache.actions.add({ file: dataArr });
                dispatch(addFileAction);
            }
        },
        [dispatch],
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (
        <>
            <FileUploadImage accept={mimeType} onFileDataChange={onFileDataChange} />
        </>
    );
};

export default IPFSWriteImage;
