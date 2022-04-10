import React from 'react';
import styled from 'styled-components';

const Button = styled.button``;

const Wrapper = styled.div`
    background: #2c2c30;
    border-radius: 8px;
    height: 52px;
    padding: 16px;
    display: flex;
    align-items: center;

    input {
        background: transparent;
        border: 0;
        width: 100%;
        color: #fff;
    }
`;

const ValidationMsg = styled.div`
    color: rgba(255, 4, 32, 0.64);
    font-weight: 400;
    font-size: 14px;
    margin: 1px 0 0 18px;
`;

export interface Props {
    onChange: () => any;
}

const AddressInput = ({ onChange }: Props) => (
    <>
        <Wrapper>
            <input type="text" onChange={onChange} placeholder="Enter address" />
            <Button />
            <Button />
        </Wrapper>
        <ValidationMsg>*Invalid address</ValidationMsg>
    </>
);

export default AddressInput;
