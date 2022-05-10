import { useTheme, Table, Thead, Tbody, Tr, TableContainer } from '@chakra-ui/react';
import { map } from 'lodash';
import { Contract } from '@owlprotocol/web3-redux';
import TransactionRow from '../TransactionRow';

const HEADER_LABELS = ['txn hash', 'method', 'block', 'age', 'from', 'to', 'value', 'txn fee'];

export interface Props {
    networkId: string;
    address: string;
}
export const TransactionsTable = ({ networkId, address }: Props) => {
    const { themes } = useTheme();
    console.log(themes);

    const transactions = Contract.useFetchTransactions(networkId, address);
    const hashList = map(transactions, 'hash');

    return (
        <TableContainer>
            <Table variant="striped">
                <Thead>
                    {HEADER_LABELS.map((header, key) => (
                        <Tr key={key}>{header}</Tr>
                    ))}
                </Thead>
                <Tbody>
                    {hashList.map((hash: string) => (
                        <TransactionRow networkId={networkId} hash={hash} key={hash} />
                    ))}
                </Tbody>

                {/* {hashList.length == 0 && (
                    <tr>
                        <div style={{ padding: '20px' }}>No Data Available</div>
                    </tr>
                )} */}
            </Table>
        </TableContainer>
    );
};

export default TransactionsTable;
