import { ComponentStory, ComponentMeta } from '@storybook/react';
import { WalletConnect, WalletConnectPresenter, PresenterProps } from './index.js';
import { networkIdArgType } from '../../test/storybookArgs.js';

export default {
    title: 'Wallet/WalletConnect',
    component: WalletConnect,
} as ComponentMeta<typeof WalletConnect>;

const MainTemplate: ComponentStory<typeof WalletConnect> = (args) => <WalletConnect {...args} />;
export const Main = MainTemplate.bind({});
Main.argTypes = {
    networkId: networkIdArgType,
};

const PresenterTemplate: ComponentStory<typeof WalletConnectPresenter> = (args) => <WalletConnectPresenter {...args} />;
export const PresenterMain = PresenterTemplate.bind({});

const args: PresenterProps = {
    showBalance: false,
    balance: '100',
};

PresenterMain.args = args;
PresenterMain.argTypes = {
    networkId: networkIdArgType,
};
