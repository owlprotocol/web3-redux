import { useTheme, Tr, Td, Th } from '@chakra-ui/react';
import { Transaction } from '@owlprotocol/web3-redux';
import composeHooks from 'react-hooks-compose';
import { Link } from 'react-router-dom';
import { shortenHash, toBN, fromWei } from '../../utils';

export interface Props {
    networkId: string;
    hash: string;
}
export const useTransactionRow = ({ networkId, hash }: Props) => {
    const { themes } = useTheme();
    console.log(themes);

    const transaction = Transaction.useTransaction(networkId, hash);
    const { blockNumber, from, to, value } = transaction ?? {};

    //TODO
    const method = hash.substring(0, 6);
    //const age = 'placeholder';

    //TODO: gasUsed ?
    const gas = transaction?.gas ? toBN(transaction.gas) : toBN(0);
    const gasPrice = transaction?.gasPrice ? toBN(transaction.gasPrice) : toBN(0);
    const fee = fromWei(gas.mul(gasPrice));
    return { method, blockNumber, from, to, value, fee };
};

export interface PresenterProps {
    hash?: string;
    method?: string;
    blockNumber?: number;
    age?: string;
    from?: string;
    to?: string;
    value?: string;
    fee?: string;
}
export const TransactionRowPresenter = ({ hash, method, blockNumber, age, from, to, value, fee }: PresenterProps) => {
    return (
        <Tr key={hash}>
            <Th scope="row" key="hash">
                <Td>
                    <Link to={`/tx/${hash}`}>{shortenHash(hash || '')}</Link>
                </Td>
            </Th>
            <Th scope="row" key="method">
                <Td className="method">{method}</Td>
            </Th>
            <Th scope="row" key="blockNumber">
                <Td>
                    <Link to={`/block/${blockNumber}`}>{blockNumber}</Link>
                </Td>
            </Th>
            <Th scope="row" key="age">
                <Td>{age}</Td>
            </Th>
            <Th scope="row" key="from">
                <Td>
                    <Link to={`/address/${from}`}>{from}</Link>
                </Td>
            </Th>
            <Th scope="row" key="to">
                <Td>
                    <Link to={`/address/${to}`}>{to}</Link>
                </Td>
            </Th>
            <Th scope="row" key="value">
                <Td>{value}</Td>
            </Th>
            <Th scope="row" key="fee">
                <Td>{fee}</Td>
            </Th>
        </Tr>
    );
};

export const TransactionRow = composeHooks((props: Props) => ({
    useTransactionRow: () => useTransactionRow(props),
}))(TransactionRowPresenter) as (props: Props) => JSX.Element;
//@ts-expect-error
TransactionRow.displayName = 'TransactionRow';

export default TransactionRow;
