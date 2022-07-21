import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger, PopoverBody, Box, IconButton, useTheme } from '@chakra-ui/react';
import Erc20QRGenerator from '../Erc20QRGenerator/index.js';
import Icon from '../Icon/index.js';

export interface Props {
    address: string;
}

const QRCodePopover = ({ address }: Props) => {
    const { themes } = useTheme();
    const [isHovered, setHovered] = useState(false);
    const [isSelected, setSelected] = useState(false);

    return (
        <Popover closeOnBlur={false} onClose={() => setSelected(false)} placement="bottom">
            <PopoverTrigger>
                <IconButton
                    aria-label="a QR code"
                    bg={'transparent'}
                    _hover={{ bg: 'transparent' }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => setSelected(true)}
                    icon={
                        isSelected ? (
                            <Icon icon="QRSelected" />
                        ) : isHovered ? (
                            <Icon icon="QRHover" />
                        ) : (
                            <Icon icon="QR" />
                        )
                    }
                />
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
