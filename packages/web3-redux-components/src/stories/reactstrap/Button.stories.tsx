import { ComponentStory, ComponentMeta } from '@storybook/react';
import { expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import { Button } from 'reactstrap';

export default {
    title: 'Reactstrap/Button',
    component: Button,
    argTypes: {
        onClick: { action: 'clicked' },
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>primary</Button>;
export const Primary = Template.bind({});

//https://storybook.js.org/docs/react/essentials/interactions
Primary.play = async ({ args, canvasElement }: any) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalled();
};
