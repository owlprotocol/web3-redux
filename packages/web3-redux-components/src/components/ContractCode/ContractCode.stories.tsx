import { ComponentStory, ComponentMeta } from '@storybook/react';
import { networkIdArgType, addressArgType } from '../../test/storybookArgs.js';
import { ContractCode, Props } from '.';

const Template: ComponentStory<typeof ContractCode> = (args: any) => <ContractCode {...args} />;
export const Main = Template.bind({});
const Args: Props = {
    networkId: networkIdArgType.options[0],
    address: addressArgType.options[0],
};
Main.args = Args;
Main.argTypes = {
    networkId: networkIdArgType,
    address: addressArgType,
};

export default {
    title: 'Contract/ContractCode',
    component: ContractCode,
} as ComponentMeta<typeof ContractCode>;
