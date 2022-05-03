import { ComponentStory, ComponentMeta } from '@storybook/react';
import AbiInput, { Props } from '.';

export default {
    title: 'ContractInteraction/ContractAbiForm/AbiInput',
    component: AbiInput,
} as ComponentMeta<typeof AbiInput>;

const Template: ComponentStory<typeof AbiInput> = (args: Props) => <AbiInput {...args} />;
export const Main = Template.bind({});

Main.args = {
    type: 'address',
};
