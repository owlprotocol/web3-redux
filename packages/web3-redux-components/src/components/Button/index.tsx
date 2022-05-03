// import { Button, Box } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import styled from 'styled-components';
import Icon from '../Icon';

const Text = styled.span`
    font-size: 16px;
    margin-left: 12px;
`;

export interface Props {
    onClick: () => any;
    icon?: string;
    text?: string;
    w?: number | string;
    h?: number | string;
    iconW?: number | string;
    iconH?: number | string;
}

const OwlButton = ({ onClick, icon, text, w, h, iconW = '100%', iconH = '100%' }: Props) => {
    const clickHandler = () => {
        onClick && onClick();
    };

    return (
        // @ts-ignore
        // <Button onClick={clickHandler} w={w} h={h} bg="transparent" _hover={{ backgroundColor: 'transparent' }}>
        <Box display={'flex'} alignItems={'center'} as={'button'} onClick={clickHandler} w={w} h={h}>
            {icon && <Icon icon={icon} w={iconW} h={iconH} />}
            {text && <Text>{text}</Text>}
        </Box>
        // </Button>
    );
};

export default OwlButton;
