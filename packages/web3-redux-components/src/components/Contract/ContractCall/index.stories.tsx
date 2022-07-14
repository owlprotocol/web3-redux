import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Contract, Abi, Network } from '@owlprotocol/web3-redux';
//import { addressERC721ArgType, networkIdArgType } from '../../../test/storybookArgs';
import { AbiItem } from '@owlprotocol/web3-redux/src/utils/web3-utils';
import ContractCall, { ContractCallProps } from '.';

export default {
    title: 'Contract/ContractCall',
    component: ContractCall,
} as ComponentMeta<typeof ContractCall>;

const Template: ComponentStory<typeof ContractCall> = (args: ContractCallProps) => <ContractCall {...args} />;

export const Main = Template.bind({});

Main.args = {
    networkId: '1337',
    method: 'getValue',
    address: '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0',
};
Main.argTypes = {
    //networkId: networkIdArgType,
    //address: addressERC721ArgType,
};

const abi = Abi.BlockNumberArtifact.abi as AbiItem[];
const bytecode = Abi.BlockNumberArtifact.bytecode;
const label = 'BlockNumber';

/*
Main.loaders = [
    async () => {
        const contract = await Contract.db.get({ networkId: '1337', label });
        const address = contract?.address;
        console.debug({ address });
        return { address };
    },
];
*/

Main.decorators = [
    (Story) => {
        const [accounts] = Network.hooks.useAccounts('1337', true);
        const from = accounts.length > 0 ? accounts[0] : undefined;
        const [contract] = Contract.hooks.useDeploy({ networkId: '1337', abi, bytecode, from, label }, undefined, true);
        console.debug({ address: contract?.address });

        return <Story />;
    },
];
