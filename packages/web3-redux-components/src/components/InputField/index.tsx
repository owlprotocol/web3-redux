import { Input, useTheme } from '@chakra-ui/react';
import styled from 'styled-components';
import Icon from '../Icon';

const Wrapper: any = styled.div`
    background: ${(props: any) => props.color6};
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

        &:focus {
            outline: none;
            border: 0;
        }
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
    errMsg?: string;
    icon?: string;
}

const InputField = ({ icon, onChange, placeholder, errMsg }: Props) => {
    const { themes } = useTheme();

    return (
        <>
            <Wrapper color6={themes.color6}>
                {icon && <Icon icon={icon} w={'20px'} h={'20px'} />}
                <Input
                    type="text"
                    onChange={onChange}
                    placeholder={placeholder}
                    color={themes.color8}
                    _placeholder={{ color: themes.color8 }}
                    bg={themes.color6}
                    w={'100%'}
                    p={0}
                />
            </Wrapper>
            {errMsg && <ValidationMsg>*{errMsg}</ValidationMsg>}
        </>
    );
};

export default InputField;
