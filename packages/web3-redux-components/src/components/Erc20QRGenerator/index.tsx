import { useEffect } from 'react';
import styled from '@emotion/styled';
import EthereumQRPlugin from 'ethereum-qr-code';

export interface Props {
    address: string;
}

const Wrapper = styled.div`
    background: #fff;
    box-sizing: border-box;
    border-radius: 8px;
    width: 190px;
    height: 190px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Erc20QRGenerator = ({ address }: Props) => {
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

    return <Wrapper id="qr-code" />;
};

export default Erc20QRGenerator;
