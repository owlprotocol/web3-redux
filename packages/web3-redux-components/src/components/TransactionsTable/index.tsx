import { useTheme, TableContainer, Table, Thead, Tbody, Tr, Td, Th } from '@chakra-ui/react';

const THEAD_LABELS = ['txn hash', 'method', 'block', 'age', 'from', 'to', 'value', 'txn fee'];
const DEF = {
    txHash: '0x4bd5480860b3e28391c0506b0e99aae1f5163df5f88db0c80e3b4b567a1caf3f',
    method: 'Approve',
    blockNumber: 14724278,
    age: '3 days 22 hrs ago',
    from: '0x35b051a09ce7136202ed7ad858849f1e0f11ed8d',
    to: 'USDC: USDC Token',
    value: '0 Ether',
    fee: '0.002669500796',
};

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
export const TransactionTable = ({ items = [DEF, DEF, DEF, DEF, DEF, DEF, DEF, DEF, DEF] }) => {
    const { themes } = useTheme();

    return (
        <TableContainer>
            <Table variant="simple">
                <Thead bg={themes.color5}>
                    {THEAD_LABELS.map((header, key) => (
                        <Tr key={key}>
                            <Th color={themes.color9} textTransform={'capitalize'}>
                                {header}
                            </Th>
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {items.map((item) => {
                        const { txHash, method, blockNumber, age, from, to, value, fee } = item;

                        return (
                            <Tr key={txHash}>
                                <Th>
                                    <Td>
                                        <ExternalLink to={`/tx/${txHash}`}>{txHash}</ExternalLink>
                                    </Td>
                                </Th>
                                <Th>
                                    <Td className="method">{method}</Td>
                                </Th>
                                <Th>
                                    <Td>
                                        <ExternalLink to={`/block/${blockNumber}`}>{blockNumber}</ExternalLink>
                                    </Td>
                                </Th>
                                <Th>
                                    <Td>{age}</Td>
                                </Th>
                                <Th>
                                    <Td>
                                        <ExternalLink to={`/address/${from}`}>{from}</ExternalLink>
                                    </Td>
                                </Th>
                                <Th>
                                    <Td>
                                        <ExternalLink to={`/address/${to}`}>{to}</ExternalLink>
                                    </Td>
                                </Th>
                                <Th>
                                    <Td>{value}</Td>
                                </Th>
                                <Th>
                                    <Td>{fee}</Td>
                                </Th>
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default TransactionTable;
