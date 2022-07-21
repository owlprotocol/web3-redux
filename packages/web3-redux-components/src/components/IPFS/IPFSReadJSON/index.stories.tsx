import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ipfsHashdArgType } from '../../../test/storybookArgs.js';
import IPFSReadJSON from '.';

export default {
    title: 'IPFS/IPFSReadJSON',
    component: IPFSReadJSON,
} as ComponentMeta<typeof IPFSReadJSON>;

const Template: ComponentStory<typeof IPFSReadJSON> = (args: any) => <IPFSReadJSON {...args} />;
export const Main = Template.bind({});
Main.args = {
    cid: ipfsHashdArgType.options[0],
};
Main.argTypes = {
    cid: ipfsHashdArgType,
};
