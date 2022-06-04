import { ComponentStory, ComponentMeta } from '@storybook/react';
import FileUploadImage from '.';

export default {
    title: 'IPFS/FileUploadImage',
    component: FileUploadImage,
} as ComponentMeta<typeof FileUploadImage>;

const Template: ComponentStory<typeof FileUploadImage> = (args: any) => <FileUploadImage {...args} />;
export const Main = Template.bind({});
Main.args = {};

Main.argTypes = {};
