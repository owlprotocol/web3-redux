import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger, PopoverBody, Box, useTheme } from '@chakra-ui/react';
import styled from '@emotion/styled';
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
            <PopoverContent w="200px" h="200px" _focus={false} border={0} bg="transparent">
                <Box
                    bg={themes.color5}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={'100%'}
                    w={'100%'}
                    borderRadius={12}
                >
                    <PopoverBody>
                        <Erc20QRGenerator address={address} />
                    </PopoverBody>
                </Box>
            </PopoverContent>
        </Popover>
    );
};

export default QRCodePopover;
