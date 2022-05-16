import { useTheme, Badge } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Icon from '../Icon';

const Wrapper: any = styled.div`
    background: ${(props: any) => props.color5};
    border-radius: 12px;
    width: 264px;
    padding: 16px;
    box-shadow: inset 0px 1px 4px 0px rgb(95 99 109 / 57%);
    border: ${(props: any) => props.isSelected && '1px solid rgba(68, 71, 226, 1)'};
`;

const Flex: any = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${(props: any) => props.centered && 'space-between'};
`;

const BoxWrapper: any = styled.div`
    background-color: #1c1c24;
    box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.25);
    border: 6px solid;
    border-color: ${(props: any) => props.color6};
    padding: 7px 12px;
    border-radius: 12px;
`;

const Name = styled.div`
    color: #ffffff;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    padding: 6px;
    border: 2px solid #2d2d3a;
    box-sizing: border-box;
    border-radius: 12px;
    margin-bottom: 16px;
`;

const Value: any = styled.div`
    color: ${(props: any) => props.color9};
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
`;

const Price: any = styled.div`
    color: ${(props: any) => props.color9};
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
`;

export interface Props {
    token: string;
    value: string;
    dollarValue: string;
    isSelected: boolean;
}

const TokenSlot = ({ token, value, dollarValue, isSelected }: Props) => {
    const { themes } = useTheme();

    return (
        // @ts-ignore
        <Wrapper isSelected={isSelected} color5={themes.color5}>
            <Name>{token}</Name>
            <BoxWrapper color6={themes.color6}>
                <Flex centered>
                    <Value color9={themes.color9}>{value}</Value>
                    <Flex>
                        <Icon icon="ETH" w="20px" h="20px" />
                        &nbsp;&nbsp;
                        <Badge>{token}</Badge>
                    </Flex>
                </Flex>
                <Flex>
                    <Price color9={themes.color9}>{dollarValue}$</Price>
                </Flex>
            </BoxWrapper>
        </Wrapper>
    );
};

export default TokenSlot;
