import { ComponentStory, ComponentMeta } from '@storybook/react';
import FileDropzone, { Props } from '.';

const Wrapper = (props: any) => {
    return <FileDropzone {...props} />;
};

const Template: ComponentStory<typeof FileDropzone> = (args: any) => <Wrapper {...args} />;

export const Main = Template.bind({});

const args: Props = {
    previewURL: 'http://placehold.jp/228x196.png',
};

Main.args = args;

export default {
    title: 'File Handling/FileDropzone',
    component: FileDropzone,
} as ComponentMeta<typeof FileDropzone>;
