import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContractAbiPage from '.';

export default {
    title: 'ContractAbi/ContractAbiPage',
    component: ContractAbiPage,
} as ComponentMeta<typeof ContractAbiPage>;

const Template: ComponentStory<typeof ContractAbiPage> = (args: any) => <ContractAbiPage {...args} />;
export const Main = Template.bind({});

Main.args = {
    networkId: '1',
};
