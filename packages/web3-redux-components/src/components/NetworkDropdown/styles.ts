import styled from 'styled-components';

export const DropdownContent = styled.div`
    .list-item {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        transition: 0.3s ease;
        padding: 3px 5px;

        &:hover {
            background-color: ${(props) => props.theme.c6};
            border-radius: 3px;
        }
    }

    .icon {
        margin-right: 8px;
    }
`;

export const ActiveChainDot = styled.div`
    width: 8px;
    height: 8px;
    min-height: 8px;
    min-width: 8px;
    margin-top: 2px;
    margin-left: auto;
    border-radius: 50%;
    position: relative;
    background-color: rgb(1, 241, 19);
`;
