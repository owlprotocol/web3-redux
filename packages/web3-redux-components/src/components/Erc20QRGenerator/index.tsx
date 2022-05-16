import { useEffect } from 'react';
import { Box, useTheme } from '@chakra-ui/react';
import EthereumQRPlugin from 'ethereum-qr-code';

export interface Props {
    address: string;
}

const Erc20QRGenerator = ({ address }: Props) => {
    const { themes } = useTheme();

    useEffect(() => {
        const config = {
            to: address,
        };

        const qr = new EthereumQRPlugin();
        try {
            qr.toCanvas(config, { selector: '#qr-code' });
        } catch (err) {
            console.log(err);
        }
    });

    return (
        <Box
            id="qr-code"
            bg={themes.color7}
            borderRadius={8}
            w={'180px'}
            h={'180px'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
        />
    );
};

export default Erc20QRGenerator;
