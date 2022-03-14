import { Contract } from '@owlprotocol/web3-redux';
import composeHooks from 'react-hooks-compose';
import { Wrapper } from './styles';

export interface Props {
    networkId: string;
    address: string;
}
export const useContractCode = ({ networkId, address }: Props) => {
    const bytecode = Contract.useGetCode(networkId, address);
    return { bytecode };
};

export interface PresenterProps {
    bytecode: string;
}
export const ContractCodePresenter = ({ bytecode }: PresenterProps) => {
    return (
        <>
            <Wrapper>{bytecode}</Wrapper>
        </>
    );
};

export const ContractCode = composeHooks((props: Props) => ({
    useContractCode: () => useContractCode(props),
}))(ContractCodePresenter) as (props: Props) => JSX.Element;

export default ContractCode;
