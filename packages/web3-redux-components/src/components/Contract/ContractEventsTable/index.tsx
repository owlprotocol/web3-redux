import { Badge, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Contract } from '@owlprotocol/web3-redux';

export interface ContractEventsTableProps {
    networkId: string | undefined;
    address: string | undefined;
    eventName: string | undefined;
}

const THEAD_LABELS = ['name', 'blockNumber', 'logIndex', 'returnValues'];
export const ContractEventsTable = ({ networkId, address, eventName }: ContractEventsTableProps) => {
    const [events, options] = Contract.hooks.useEvents(networkId, address, eventName, undefined, {
        past: true,
        limit: 50,
    });
    const { error } = options;

    if (error) return <>Error: {error.message}</>;
    else
        return (
            <Table variant="unstyled">
                <Thead>
                    <Tr>
                        {THEAD_LABELS.map((header, key) => (
                            <Th textTransform={'capitalize'} key={key}>
                                {header}
                            </Th>
                        ))}
                    </Tr>
                </Thead>
                <br />
                <Tbody>
                    {events?.map((e) => {
                        const { blockNumber, logIndex, returnValues } = e;

                        return (
                            <Tr key={`${blockNumber}-${logIndex}`}>
                                <Th>
                                    <Td p={0}>
                                        <Badge textTransform={'capitalize'}>{eventName}</Badge>
                                    </Td>
                                </Th>
                                <Th>
                                    <Td p={0}>{blockNumber}</Td>
                                </Th>
                                <Th>
                                    <Td p={0}>{logIndex}</Td>
                                </Th>
                                <Th>
                                    <Td p={0}>{JSON.stringify(returnValues)}</Td>
                                </Th>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        );
};

export default ContractEventsTable;
