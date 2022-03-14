import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WalletConnect } from './index';

export default {
    title: 'Wallet/WalletConnect',
    component: WalletConnect,
} as ComponentMeta<typeof WalletConnect>;

const MainTemplate: ComponentStory<typeof WalletConnect> = (args) => <WalletConnect {...args} />;
export const Main = MainTemplate.bind({});
