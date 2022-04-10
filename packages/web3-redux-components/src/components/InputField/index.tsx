import styled from 'styled-components';
import Icon from '../Icon';

const Wrapper = styled.div`
    background: #2c2c30;
    border-radius: 8px;
    height: 52px;
    padding: 16px;
    display: flex;
    align-items: center;

    > .icon {
        margin-right: 16px;
    }

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
    margin: 3px 0 0 3px;
`;

export interface Props {
    onChange: () => any;
    placeholder: string;
    hasError: boolean;
    icon: string;
}

const InputField = ({ icon, onChange, placeholder, hasError }: Props) => (
    <>
        <Wrapper>
            <Icon icon={icon} />
            <input type="text" onChange={onChange} placeholder={placeholder} />
        </Wrapper>
        {hasError && <ValidationMsg>*Invalid address</ValidationMsg>}
    </>
);

export default InputField;
