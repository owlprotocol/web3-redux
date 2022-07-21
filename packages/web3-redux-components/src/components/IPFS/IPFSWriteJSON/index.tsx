import { Button } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IPFSCache } from '@owlprotocol/web3-redux';
import FileUploadButton, { FileData } from '../../FileUpload/FileUploadButton/index.js';

//https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
export const IPFSWriteJSON = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dispatch = useDispatch();

    const [fileJson, setFileData] = useState<FileData>();

    const onClickIPFS = useCallback(() => {
        if (fileJson) {
            const fileData = JSON.stringify(fileJson);
            dispatch(IPFSCache.actions.add({ file: fileData }));
        }
    }, [dispatch, fileJson]);

    return (
        <>
            <FileUploadButton accept="application/json" onFileDataChange={setFileData} />
            <Button onClick={onClickIPFS}>Upload IPFS</Button>
        </>
    );
};

export default IPFSWriteJSON;
