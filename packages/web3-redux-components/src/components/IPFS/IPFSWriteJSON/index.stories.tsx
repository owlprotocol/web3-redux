import { ComponentStory, ComponentMeta } from '@storybook/react';
import IPFSWriteJSON from '.';

export default {
    title: 'IPFS/IPFSWriteJSON',
    component: IPFSWriteJSON,
} as ComponentMeta<typeof IPFSWriteJSON>;

const Template: ComponentStory<typeof IPFSWriteJSON> = (args: any) => <IPFSWriteJSON {...args} />;
export const Main = Template.bind({});
Main.args = {};

Main.argTypes = {};
