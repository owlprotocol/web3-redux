import { ComponentStory, ComponentMeta } from '@storybook/react';
import { networkIdArgType } from '../../../test/storybookArgs.js';
import { SwitchNetwork } from './index.js';

export default {
    title: 'Wallet/SwitchNetwork',
    component: SwitchNetwork,
} as ComponentMeta<typeof SwitchNetwork>;

const MainTemplate: ComponentStory<typeof SwitchNetwork> = (args) => <SwitchNetwork {...args} />;
export const Main = MainTemplate.bind({});
Main.argTypes = {
    networkId: networkIdArgType,
};
