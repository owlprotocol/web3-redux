import { Button } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Ipfs } from '@owlprotocol/web3-redux';
import FileUploadButton from '../../FileUploadButton';

//https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
export const IPFSWriteJSON = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dispatch = useDispatch();

    const [fileData, setFileData] = useState<string | null>();

    const onClickIPFS = useCallback(() => {
        dispatch(Ipfs.putCBOR(fileData));
    }, [dispatch, fileData]);

    return (
        <>
            <FileUploadButton accept="application/json" onFileDataChange={setFileData} />
            <Button onClick={onClickIPFS}>Upload IPFS</Button>
        </>
    );
};

export default IPFSWriteJSON;
