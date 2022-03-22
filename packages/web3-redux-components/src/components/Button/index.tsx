import { useState } from 'react';
import Icon from '../Icon';
import styled from 'styled-components';

const Wrapper = styled.div`
    border-radius: 50%;
    width: 30px;
    height: 30px;
    background-color: rgba(44, 44, 48, 1);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Text = styled.span`
    font-size: 16px;
`;

export interface Props {
    onClick: () => any;
    icon: string;
    text: string;
}

const Button = ({ onClick, icon, text }: Props) => {
    const [isActive, setActive] = useState(false);
    const clickHandler = () => {
        setActive(!isActive);
        onClick && onClick();
    }

    return (
        // @ts-ignore
        <Wrapper onClick={clickHandler}>
            {icon && <Icon icon={isActive ? `${icon}.active` : icon} />}
            {text && <Text>{text}</Text>}
        </Wrapper>
    );
}

export default Button;
