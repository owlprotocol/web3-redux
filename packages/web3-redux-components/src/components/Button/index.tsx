import { useState } from 'react';
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
    const [isActive, setActive] = useState(false);
    const clickHandler = () => {
        setActive(!isActive);
        onClick && onClick();
    };

    return (
        // @ts-ignore
        <Button onClick={clickHandler}>
            {icon && <Icon icon={isActive ? `${icon}.active` : icon} />}
            {text && <Text>{text}</Text>}
        </Button>
    );
};

export default OwlButton;
