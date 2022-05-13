import { ComponentStory, ComponentMeta } from '@storybook/react';
import AbiInput, { Props } from '.';

export default {
    title: 'ContractInteraction/ContractAbiForm/AbiInput',
    component: AbiInput,
} as ComponentMeta<typeof AbiInput>;

const Template: ComponentStory<typeof AbiInput> = (args: Props) => <AbiInput {...args} />;
export const Address = Template.bind({});
Address.args = {
    name: 'account',
    type: 'address',
};

export const Boolean = Template.bind({});
Boolean.args = {
    name: 'enable',
    type: 'boolean',
};

export const Uint256 = Template.bind({});
Uint256.args = {
    name: 'value',
    type: 'uint256',
};
