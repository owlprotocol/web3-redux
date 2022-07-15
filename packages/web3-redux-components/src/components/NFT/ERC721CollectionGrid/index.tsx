import { Grid, GridItem } from '@chakra-ui/react';
import { Contract } from '@owlprotocol/web3-redux';
//import ERC1155Instance from '../ERC1155Instance';

export interface ContractEventsTableProps {
    networkId: string | undefined;
    address: string | undefined;
    eventName: string | undefined;
}

export const ERC721CollectionGrid = ({ networkId, address }: ContractEventsTableProps) => {
    const [tokenIds, options] = Contract.hooks.useERC721TokenIds(networkId, address, { past: true });
    const { error } = options;
    console.debug({ tokenIds });

    if (error) return <>Error: {error.message}</>;
    else
        return (
            <Grid templateColumns={{ sm: 'repeat(4, 1fr)' }} gap={6}>
                <GridItem>
                    {tokenIds.map((id) => {
                        return <>{id}</>; ///<ERC1155Instance />
                    })}
                </GridItem>
            </Grid>
        );
};

export default ERC721CollectionGrid;
