import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WalletDropdown } from './index';

export default {
    title: 'Wallet/WalletDropdown',
    component: WalletDropdown,
} as ComponentMeta<typeof WalletDropdown>;

const Template: ComponentStory<typeof WalletDropdown> = (props) => <WalletDropdown {...props} />;

export const Main = Template.bind({});
