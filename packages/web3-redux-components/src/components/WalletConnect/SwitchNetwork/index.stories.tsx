import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SwitchNetwork } from './index/index.js';
import { networkIdArgType } from '../../../test/storybookArgs.js';

export default {
    title: 'Wallet/SwitchNetwork',
    component: SwitchNetwork,
} as ComponentMeta<typeof SwitchNetwork>;

const MainTemplate: ComponentStory<typeof SwitchNetwork> = (args) => <SwitchNetwork {...args} />;
export const Main = MainTemplate.bind({});
Main.argTypes = {
    networkId: networkIdArgType,
};
