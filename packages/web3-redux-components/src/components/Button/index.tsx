import { Box, useTheme } from '@chakra-ui/react';
import Icon from '../Icon';

export interface Props {
    onClick: () => any;
    icon?: string | undefined | null;
    text?: string | undefined | null;
    w?: number | string;
    h?: number | string;
    iconW?: number | string;
    iconH?: number | string;
    bg?: string;
    color?: string;
    borderRadius?: number;
}

const OwlButton = ({
    onClick,
    icon = null,
    text = null,
    w,
    h,
    iconW = '20px',
    iconH = '20px',
    bg = 'transparent',
    color,
    borderRadius,
}: Props) => {
    const { themes } = useTheme();
    const defaultColor = themes.color4;

    const clickHandler = () => {
        onClick && onClick();
    };

    return (
        <Box
            display={'flex'}
            alignItems={'center'}
            as={'button'}
            onClick={clickHandler}
            w={w}
            h={h}
            bg={bg}
            p={3}
            pt={2}
            pb={2}
            color={color || defaultColor}
            borderRadius={borderRadius}
        >
            {icon && <Icon icon={icon} w={iconW} h={iconH} mr={2} />}
            {text && (
                <Box w="100%" textAlign={icon ? 'left' : 'center'} fontSize="16px" textTransform={'capitalize'}>
                    {text}
                </Box>
            )}
        </Box>
    );
};

export default OwlButton;
