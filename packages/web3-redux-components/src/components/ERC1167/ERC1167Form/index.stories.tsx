import { ComponentStory, ComponentMeta } from '@storybook/react';
import ERC1167FactoryForm from '.';

export default {
    title: 'ERC/ERC1167FactoryForm',
    component: ERC1167FactoryForm,
} as ComponentMeta<typeof ERC1167FactoryForm>;

const Template: ComponentStory<typeof ERC1167FactoryForm> = (args: any) => <ERC1167FactoryForm {...args} />;

export const Main = Template.bind({});
Main.args = {
    networkId: '1',
    implementationInitializer: 'transfer',
};
