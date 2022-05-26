import { useTheme, Button } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Ipfs } from '@owlprotocol/web3-redux';

export const IPFSButton = () => {
    const { themes } = useTheme();
    const dispatch = useDispatch();

    const onClick = useCallback(() => {
        const payload = { message: 'Test' };
        dispatch(Ipfs.putCBOR(payload));
    }, [dispatch]);

    return (
        <Button onClick={onClick} color={themes.color4} bg={themes.color6}>
            Create IPFS
        </Button>
    );
};

export default IPFSButton;
