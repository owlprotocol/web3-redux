import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: ${(props) => props.theme.c2};
    width: 100%;
    max-width: 190px;
    height: 40px;
    color: #fff;
    border-radius: 4px;
    font-size: 16px;
    position: relative;
    cursor: pointer;

    .Dropdown-control {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        padding: 0 12px;
    }

    .Dropdown-menu {
        background-color: ${(props) => props.theme.c2};
        max-width: 190px;
        box-shadow: 0px 4px 14px rgba(18, 18, 18, 0.68);
        border-radius: 4px;
        padding: 12px;
        position: absolute;
        z-index: 11;
    }

    .list-item {
        display: flex;
        align-items: center;

        &:not(:last-of-type) {
            margin-bottom: 22px;
        }

        &:hover {
            opacity: 0.7;
        }

        span {
            &:first-of-type {
                margin-right: 12px;
            }

            &:last-of-type {
                font-size: 14px;
                font-weight: bold;
            }
        }

        .icon {
            margin-right: 12px;
        }
    }
`;
