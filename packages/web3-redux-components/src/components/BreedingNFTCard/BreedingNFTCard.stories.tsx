import { ComponentStory, ComponentMeta } from '@storybook/react';
import BreedingNFTCard from '.';

export default {
    title: 'NFT/BreedingNFTCard',
    component: BreedingNFTCard,
} as ComponentMeta<typeof BreedingNFTCard>;

const Template: ComponentStory<typeof BreedingNFTCard> = (args: any) => <BreedingNFTCard {...args} />;

export const Main = Template.bind({});

Main.args = {
    itemName: 'NFT Name',
    generation: '3',
    generateTime: 600,
    assetPreviewSrc: '',
};
