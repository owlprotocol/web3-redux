import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContractAbiForm from '.';

export default {
    title: 'ContractInteraction/ContractAbiForm',
    component: ContractAbiForm,
} as ComponentMeta<typeof ContractAbiForm>;

const Template: ComponentStory<typeof ContractAbiForm> = (args: any) => <ContractAbiForm {...args} />;
export const Main = Template.bind({});

Main.args = {};
