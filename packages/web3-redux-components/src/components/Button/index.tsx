import { Button } from '@chakra-ui/react';
import styled from 'styled-components';
import Icon from '../Icon';

const Text = styled.span`
    font-size: 16px;
`;

export interface Props {
    onClick: () => any;
    icon: string;
    text: string;
}

const OwlButton = ({ onClick, icon, text }: Props) => {
    const clickHandler = () => {
        onClick && onClick();
    };

    return (
        // @ts-ignore
        <Button onClick={clickHandler} bg="transparent">
            {icon && <Icon icon={icon} />}
            {text && <Text>{text}</Text>}
        </Button>
    );
};

export default OwlButton;
