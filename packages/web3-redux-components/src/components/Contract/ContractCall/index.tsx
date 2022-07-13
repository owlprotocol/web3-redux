import { Contract } from '@owlprotocol/web3-redux';

export interface ContractCallProps {
    networkId: string | undefined;
    address: string | undefined;
    method: string | undefined;
    args?: any[];
}

export const ContractCall = ({ networkId, address, method, args }: ContractCallProps) => {
    const [returnValue, options] = Contract.hooks.useContractCall(networkId, address, method, args);
    console.debug({ returnValue, options });
    return <>Return Value: {returnValue} </>;
};

export default ContractCall;
