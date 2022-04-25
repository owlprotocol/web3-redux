import { useState } from 'react';
import styled from 'styled-components';
import { Popover, PopoverContent, PopoverTrigger, PopoverBody, useTheme } from '@chakra-ui/react';
import { ReactComponent as QRIcon } from './assets/qr.svg';
import { ReactComponent as QRHoverIcon } from './assets/qr-hover.svg';
import { ReactComponent as QRSelectedIcon } from './assets/qr-selected.svg';
import Erc20QRGenerator from '../Erc20QRGenerator';

export interface Props {
    address: string;
}

const QRbutton = styled.button`
    width: 28px;
    height: 28px;
    margin-right: 16px;

    svg {
        font-size: 28px;
    }
`;

const QRPopup: any = styled.div`
    background: ${(props: any) => props.color5};
    border-radius: 8px;
    padding: 12px;
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const QRCodePopover = ({ address }: Props) => {
    const { themes } = useTheme();
    const [isHovered, setHovered] = useState(false);
    const [isSelected, setSelected] = useState(false);

    return (
        <Popover closeOnBlur={false} onClose={() => setSelected(false)} placement="bottom">
            <PopoverTrigger>
                <QRbutton
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => setSelected(true)}
                >
                    {isSelected ? <QRSelectedIcon /> : isHovered ? <QRHoverIcon /> : <QRIcon />}
                </QRbutton>
            </PopoverTrigger>

            {/* @ts-ignore */}
            <PopoverContent w="240px" h="240px" _focus={false} border="1px" bg="transparent">
                <QRPopup color5={themes.color5}>
                    <PopoverBody>
                        <Erc20QRGenerator address={address} />
                    </PopoverBody>
                </QRPopup>
            </PopoverContent>
        </Popover>
    );
};

export default QRCodePopover;
