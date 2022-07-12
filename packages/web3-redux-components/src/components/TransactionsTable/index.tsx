import { useTheme, TableContainer, Table, Thead, Tbody, Tr, Td, Th, Badge } from '@chakra-ui/react';
import styled from '@emotion/styled';

const TableWrapper = styled.div`
    table tr:nth-child(odd) {
        background-color: #1c1c24;
    }

    table tr:nth-child(even) {
        background-color: #2c2c30;
    }
`;

const THEAD_LABELS = ['txn hash', 'method', 'block', 'age', 'from', 'to', 'value', 'txn fee'];

const ExternalLink = ({ to, children }: any) => (
    <a href={to} target="_blank" rel="noreferrer">
        {children}
    </a>
);

export interface ItemProps {
    txHash?: string;
    method?: string;
    blockNumber?: number;
    age?: string;
    from?: string;
    to?: string;
    value?: string;
    fee?: string;
}
export interface Props {
    items?: ItemProps[];
}
export const TransactionsTable = ({ items = [] }: Props) => {
    const { themes } = useTheme();

    return (
        <TableWrapper>
            <TableContainer color={themes.color9}>
                <Table variant="unstyled">
                    <Thead>
                        <Tr bg={themes.color5}>
                            {THEAD_LABELS.map((header, key) => (
                                <Th textTransform={'capitalize'} key={key}>
                                    {header}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <br />
                    <Tbody>
                        {items.map((item, idx) => {
                            const { txHash, method, blockNumber, age, from, to, value, fee } = item;

                            return (
                                <Tr key={idx}>
                                    <Td>
                                        <ExternalLink to={`/tx/${txHash}`}>{txHash}</ExternalLink>
                                    </Td>

                                    <Td>
                                        <Badge textTransform={'capitalize'}>{method}</Badge>
                                    </Td>

                                    <Td>
                                        <ExternalLink to={`/block/${blockNumber}`}>{blockNumber}</ExternalLink>
                                    </Td>

                                    <Td>{age}</Td>

                                    <Td>
                                        <ExternalLink to={`/address/${from}`}>{from}</ExternalLink>
                                    </Td>

                                    <Td>
                                        <ExternalLink to={`/address/${to}`}>{to}</ExternalLink>
                                    </Td>

                                    <Td>{value}</Td>

                                    <Td>{fee}</Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </TableWrapper>
    );
};

export default TransactionsTable;
