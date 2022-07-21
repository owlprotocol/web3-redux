import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ipfsHashdArgType, mimeTypeArgType } from '../../../test/storybookArgs.js';
import IPFSReadImage from '.';

export default {
    title: 'IPFS/IPFSReadImage',
    component: IPFSReadImage,
} as ComponentMeta<typeof IPFSReadImage>;

const Template: ComponentStory<typeof IPFSReadImage> = (args: any) => <IPFSReadImage {...args} />;
export const Main = Template.bind({});
Main.args = {
    cid: ipfsHashdArgType.options[0],
    mimeType: mimeTypeArgType.options[0],
};
Main.argTypes = {
    cid: ipfsHashdArgType,
    mimeType: mimeTypeArgType,
};
