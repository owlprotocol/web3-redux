import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Contract, Abi, Network } from '@owlprotocol/web3-redux';
import { AbiItem } from '@owlprotocol/web3-redux/src/utils/web3-utils';
import { useEffect } from 'react';
import { ContractWithObjects } from '@owlprotocol/web3-redux/src/contract/model';
import type { BlockNumber } from '@owlprotocol/web3-redux/src/abis';
import ContractEventsTable, { ContractEventsTableProps } from '.';

const abi = Abi.BlockNumberArtifact.abi as AbiItem[];
const bytecode = Abi.BlockNumberArtifact.bytecode;
const label = 'BlockNumber';
const eventName = 'NewValue';

export default {
    title: 'Contract/ContractEventsTable',
    component: ContractEventsTable,
} as ComponentMeta<typeof ContractEventsTable>;

const Template: ComponentStory<typeof ContractEventsTable> = (args: ContractEventsTableProps) => (
    <ContractEventsTable {...args} />
);

export const Main = Template.bind({});

Main.args = {
    networkId: '1337',
    address: '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0',
    eventName,
};

Main.decorators = [
    (Story) => {
        const [accounts] = Network.hooks.useAccounts('1337', true);
        const from = accounts.length > 0 ? accounts[0] : undefined;
        const [contract] = Contract.hooks.useDeploy({ networkId: '1337', abi, bytecode, from, label }, undefined, true);
        const web3Contract = (contract as ContractWithObjects | undefined)?.web3Contract as BlockNumber | undefined;

        useEffect(() => {
            if (web3Contract && from) web3Contract.methods.setValue('42').send({ gas: 1000000, from });
        }, [web3Contract, from]);
        console.debug({ address: contract?.address });

        return <Story />;
    },
];
