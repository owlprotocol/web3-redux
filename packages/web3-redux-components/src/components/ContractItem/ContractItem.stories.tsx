import { ComponentStory, ComponentMeta } from '@storybook/react';
import ContractItem from '.';

export default {
    title: 'ContractManager/ContractItem',
    component: ContractItem,
} as ComponentMeta<typeof ContractItem>;

const Template: ComponentStory<typeof ContractItem> = (args: any) => <ContractItem {...args} />;
export const Main = Template.bind({});

Main.args = {
    network: 'Ethereum',
    address: '0x008C4072055eE146a94256e9f7C63602f17D9066',
    label: 'Owl Minter',
    interfaces: ['IERC20', 'IERC721', 'IERC1155'],
    isFavorite: true,
};
