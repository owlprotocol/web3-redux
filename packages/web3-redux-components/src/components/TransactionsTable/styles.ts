import styled from 'styled-components';

export const Wrapper = styled.div`
    .table {
        color: #70797b;
        font-weight: 500;
        font-size: 18px;
        line-height: 28px;
        overflow-x: scroll;
    }

    .table > thead {
        background-color: #ffffff;
        color: #70797b;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
        text-transform: capitalize;
        border-top-color: #cde7ec;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 12px;
        white-space: nowrap;
    }

    .table > :not(:first-child) {
        border: 0;
    }

    .table > tbody > tr:nth-of-type(odd) > * {
        background: #eaf4f4;
    }

    .table > tbody > tr:nth-of-type(even) > * {
        background: #fafafa;
    }

    tbody:before {
        content: '-';
        display: block;
        line-height: 0.5em;
        color: transparent;
    }

    .table > :not(caption) > * > * {
        box-shadow: none;
    }

    .method {
        background-color: #fff;
        border-radius: 8px;
        margin: 0;
        padding: 0 10px;
    }
`;
