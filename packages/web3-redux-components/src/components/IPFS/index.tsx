import { Button } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Ipfs } from '@owlprotocol/web3-redux';

export const IPFSButton = () => {
    const dispatch = useDispatch();

    const onClick = useCallback(() => {
        const payload = { message: 'Test' };
        dispatch(Ipfs.putCBOR(payload));
    }, [dispatch]);

    return <Button onClick={onClick}>Create IPFS</Button>;
};

export default IPFSButton;
