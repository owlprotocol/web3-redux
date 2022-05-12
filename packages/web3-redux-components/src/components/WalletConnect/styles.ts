import styled from 'styled-components';

export const Wrapper = styled.div`
    display: inline-flex;
`;

export const AccountBalance = styled.div`
    background-color: ${(props) => props.theme.c2};
    height: 28px;
    min-width: 98px;
    padding: 7px;
    margin: 6px 0;
    border-radius: 3px 0 0 3px;
    font-size: 14px;
    line-height: 1;
    text-align: center;
`;

export const WrongNetwork = styled.div`
    background-color: ${(props) => props.theme.c2};
    border-radius: 3px;
    padding: 7px 10px;

    svg {
        width: 16px;
    }

    span {
        padding-left: 8px;
        line-height: 1;
    }
`;
