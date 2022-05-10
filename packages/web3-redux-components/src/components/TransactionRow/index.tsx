import { useTheme, Tr, Td, Th } from '@chakra-ui/react';

const Link = ({ to, children }: any) => (
    <a href={to} target="_blank" rel="noreferrer">
        {children}
    </a>
);

export interface Props {
    txHash?: string;
    method?: string;
    blockNumber?: number;
    age?: string;
    from?: string;
    to?: string;
    value?: string;
    fee?: string;
}
export const TransactionRow = ({ txHash, method, blockNumber, age, from, to, value, fee }: Props) => {
    const { themes } = useTheme();
    console.log(themes);

    return (
        <Tr key={txHash}>
            <Th scope="row" key="hash">
                <Td>
                    <Link to={`/tx/${txHash}`}>{txHash}</Link>
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

export default TransactionRow;
