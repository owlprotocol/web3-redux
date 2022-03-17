import { Transaction } from '@owlprotocol/web3-redux';
import composeHooks from 'react-hooks-compose';
import { Link } from 'react-router-dom';
import { toBN, fromWei } from 'web3-utils';
import { RowContainer } from './styles';
import { shortenHash } from '../../utils';

export interface Props {
    networkId: string;
    hash: string;
}
export const useTransactionRow = ({ networkId, hash }: Props) => {
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

//['hash', 'method', 'blockNumber', 'age', 'from', 'to', 'value', 'fee'];
export interface PresenterProps {
    hash: string;
    method: string;
    blockNumber: number;
    from: string;
    to: string;
    value: string;
    fee: string;
}
export const TransactionRowPresenter = ({ hash, method, blockNumber, from, to, value, fee }: PresenterProps) => {
    return (
        <tr key={hash}>
            <th scope="row" key="hash">
                <RowContainer>
                    <Link to={`/tx/${hash}`}>{shortenHash(hash)}</Link>
                </RowContainer>
            </th>
            <th scope="row" key="method">
                <RowContainer className="method">{method}</RowContainer>
            </th>
            <th scope="row" key="blockNumber">
                <RowContainer>
                    <Link to={`/block/${blockNumber}`}>{blockNumber}</Link>
                </RowContainer>
            </th>
            {/*<th scope="row" key="age">
                <RowContainer>{age}</RowContainer>
            </th>*/}
            <th scope="row" key="from">
                <RowContainer>
                    <Link to={`/address/${from}`}>{from}</Link>
                </RowContainer>
            </th>
            <th scope="row" key="to">
                <RowContainer>
                    <Link to={`/address/${to}`}>{to}</Link>
                </RowContainer>
            </th>
            <th scope="row" key="value">
                <RowContainer>{value}</RowContainer>
            </th>
            <th scope="row" key="fee">
                <RowContainer>{fee}</RowContainer>
            </th>
        </tr>
    );
};

export const TransactionRow = composeHooks((props: Props) => ({
    useTransactionRow: () => useTransactionRow(props),
}))(TransactionRowPresenter) as (props: Props) => JSX.Element;
//@ts-expect-error
TransactionRow.displayName = 'TransactionRow';

export default TransactionRow;
