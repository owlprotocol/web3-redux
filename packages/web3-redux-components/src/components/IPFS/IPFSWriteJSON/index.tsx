import { Button } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
///import { Ipfs } from '@owlprotocol/web3-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

export const IPFSWriteJSON = () => {
    const dispatch = useDispatch();

    const onClick = useCallback(() => {
        const payload = { message: 'Test' };
        console.log(payload);
        //dispatch(Ipfs.putCBOR(payload));
    }, [dispatch]);

    return (
        <Button onClick={onClick} leftIcon={<FontAwesomeIcon icon={faUpload} />}>
            Upload
        </Button>
    );
};

export default IPFSWriteJSON;
