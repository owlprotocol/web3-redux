import { Button, Input } from '@chakra-ui/react';
import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
///import { Ipfs } from '@owlprotocol/web3-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

//https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
export const IPFSWriteJSON = () => {
    const dispatch = useDispatch();
    const inputRef = useRef<any>();

    const onFileChange = useCallback((event) => {
        const file = event.target.files[0];
        console.debug(file);
    }, []);

    const onFileUpload = useCallback(() => {
        const payload = { message: 'Test' };
        console.log(payload);
        inputRef.current?.click();
        //dispatch(Ipfs.putCBOR(payload));
    }, [dispatch]);

    return (
        <>
            <Input ref={inputRef} type="file" style={{ display: 'none' }} onChange={onFileChange} />
            <Button onClick={onFileUpload} leftIcon={<FontAwesomeIcon icon={faUpload} />}>
                Upload
            </Button>
        </>
    );
};

export default IPFSWriteJSON;
