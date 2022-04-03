import styled from 'styled-components';
import Icon from '../Icon';

const Wrapper = styled.div`
    background: #1C1C24;
    border-radius: 12px;
    height: 346px;
    width: 264px;
    padding: 16px;
    box-shadow: inset 0px 1px 4px 0px rgb(95 99 109 / 57%);
    border: ${(props: any) => props.isSelected && '1px solid rgba(68, 71, 226, 1)'};
`;

const Item = styled.div`
    background: #2C2F33;
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

const Name = styled.div`
    color: #FFFFFF;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    padding: 6px;
    border: 2px solid #2D2D3A;
    box-sizing: border-box;
    border-radius: 12px;
    margin-bottom: 16px;
`;

const Avatar = styled.div`
    background: #2C2F33;
    margin-right: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    float: left;
`;

const Owner = styled.div`
    color: #92929D;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
`;

const Price = styled.div`
    color: #92929D;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
`;

export interface Props {
    itemName: string;
    owner: string;
    price: string;
    isSelected: boolean;
}

const SingleNFTInstance = ({ itemName, owner, price, isSelected }: Props) => (
    // @ts-ignore
    <Wrapper isSelected={isSelected}>
        <Item />
        <Name>{itemName}</Name>
        <Flex>
            <Owner>
                <Avatar />
                {owner}
            </Owner>
        </Flex>
        <Flex>
            <Price>{price} ETH</Price>
            <Icon icon="ETH" />
        </Flex>
    </Wrapper>
);

export default SingleNFTInstance;
