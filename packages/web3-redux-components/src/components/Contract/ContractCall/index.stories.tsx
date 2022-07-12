import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestData } from '@owlprotocol/web3-redux';
import { addressERC721ArgType, networkIdArgType } from '../../../test/storybookArgs';
import ContractCall from '.';

export default {
    title: 'Contract/ContractCall',
    component: ContractCall,
} as ComponentMeta<typeof ContractCall>;

const Template: ComponentStory<typeof ContractCall> = (args: any) => <ContractCall {...args} />;

export const Main = Template.bind({});

Main.args = {
    networkId: networkIdArgType.options[0],
    address: TestData.OZ_TEAM,
};
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressERC721ArgType,
};
