import { ComponentStory, ComponentMeta } from '@storybook/react';
import NFTItemCard from '.';

const Wrapper = (props: any) => {
    return <NFTItemCard {...props} />;
};

export default {
    title: 'REMOVE-ME',
    component: NFTItemCard,
} as ComponentMeta<typeof NFTItemCard>;

const Template: ComponentStory<typeof NFTItemCard> = (args: any) => <Wrapper {...args} />;

export const Main = Template.bind({});

Main.args = {
    itemName: '8250',
    tokenName: 'ERC721',
    generateTime: 600,
    assetPreviewSrc: '',
};
