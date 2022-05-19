import { ComponentStory, ComponentMeta } from '@storybook/react';
import AbiItemInput, { Props } from '.';

export default {
    title: 'ContractAbi/AbiItemInput',
    component: AbiItemInput,
} as ComponentMeta<typeof AbiItemInput>;

const Template: ComponentStory<typeof AbiItemInput> = (args: Props) => <AbiItemInput {...args} />;
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
