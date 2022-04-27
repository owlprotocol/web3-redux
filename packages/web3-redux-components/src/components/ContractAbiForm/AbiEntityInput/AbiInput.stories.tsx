import { ComponentStory, ComponentMeta } from '@storybook/react';
import AbiInput from '.';

export default {
    title: 'ContractAbiForm/AbiInput',
    component: AbiInput,
} as ComponentMeta<typeof AbiInput>;

const Template: ComponentStory<typeof AbiInput> = (args: any) => <AbiInput {...args} />;
export const Main = Template.bind({});

Main.args = {};
