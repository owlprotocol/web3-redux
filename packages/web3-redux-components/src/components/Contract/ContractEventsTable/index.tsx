import { Contract } from '@owlprotocol/web3-redux';

export interface ContractEventsTableProps {
    networkId: string | undefined;
    address: string | undefined;
    eventName: string | undefined;
}

export const ContractEventsTable = ({ networkId, address, eventName }: ContractEventsTableProps) => {
    const [events, options] = Contract.hooks.useEvents(networkId, address, eventName, undefined, { past: true });
    const { error } = options;

    if (error) return <>Error: {error.message}</>;
    else return <>Events: {JSON.stringify(events)} </>;
};

export default ContractEventsTable;
