import { useTheme } from '@chakra-ui/react';
import styled from 'styled-components';
import Icon from '../Icon';
import OwlButton from '../Button';
import { shortenHash } from '../../utils';

const Wrapper: any = styled.div`
    background: ${(props: any) => props.color5};
    border-radius: 12px;
    width: 264px;
    padding: 16px 16px 12px 16px;
    box-shadow: inset 0px 1px 4px 0px rgb(95 99 109 / 57%);
    border: ${(props: any) => props.isSelected && '1px solid rgba(68, 71, 226, 1)'};
`;

const Item = styled.div`
    background: #2c2f33;
    border-radius: 12px;
    width: 100%;
    height: 196px;
    margin-bottom: 16px;
`;

const Flex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
`;

const FlexCenter = styled.div`
    display: flex;
    align-items: center;
    margin-right: -12px;
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

const Avatar = styled.div`
    background: #2c2f33;
    margin-right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    float: left;
`;

const OwnerAddress: any = styled.div`
    color: ${(props: any) => props.color9};
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
`;

const Price: any = styled.div`
    color: ${(props: any) => props.color9};
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
`;

export interface Props {
    itemName: string;
    ownerAddress: string;
    price: string;
    isSelected: boolean;
    token: string;
    handleFavorite: any;
}

const SingleNFTInstance = ({ itemName, ownerAddress, price, isSelected, token, handleFavorite }: Props) => {
    const { themes } = useTheme();

    return (
        // @ts-ignore
        <Wrapper isSelected={isSelected} color5={themes.color5}>
            <Item />
            <Name>{itemName}</Name>
            <Flex>
                <OwnerAddress color9={themes.color9}>
                    <Avatar />
                    {shortenHash(ownerAddress)}
                </OwnerAddress>
                <FlexCenter>
                    {!price && <Icon icon={token} />}
                    <OwlButton onClick={handleFavorite} icon="heart" w="0" h="0" />
                </FlexCenter>
            </Flex>
            {price && (
                <Flex>
                    <Price color9={themes.color9}>{price} ETH</Price>
                    <Icon icon="ETH" />
                </Flex>
            )}
        </Wrapper>
    );
};

export default SingleNFTInstance;
