import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Contract, Abi, Network } from '@owlprotocol/web3-redux';
//import { addressERC721ArgType, networkIdArgType } from '../../../test/storybookArgs';
import { AbiItem } from '@owlprotocol/web3-redux/src/utils/web3-utils';
import { useEffect, useState } from 'react';
import ContractCall, { ContractCallProps } from '.';

export default {
    title: 'Contract/ContractCall',
    component: ContractCall,
} as ComponentMeta<typeof ContractCall>;

const Template: ComponentStory<typeof ContractCall> = (args: ContractCallProps) => <ContractCall {...args} />;

export const Main = Template.bind({});

Main.args = {
    networkId: '1337',
    method: 'getValue',
    //address: TestData.OZ_TEAM,
};
Main.argTypes = {
    //networkId: networkIdArgType,
    //address: addressERC721ArgType,
};

/*
Main.loaders = [
    async () => {
        const contracts = await Contract.db.where({ label: 'BlockNumber' });
        const contract = contracts && contracts?.length > 0 ? contracts[0] : undefined;
        let address: string;
        if (contract) address = contract.address;
        else {
            const network = await Network.db.get('1337');
            const web3 = network?.web3;
            const accounts = await web3.eth.getAccounts();
            const web3Contract = await new web3.eth.Contract(Abi.BlockNumber.abi as any)
                .deploy({
                    data: Abi.BlockNumber.bytecode,
                })
                .send({ from: accounts[0], gas: 1000000, gasPrice: '875000000' });
        }

        return { address };
    },
];
*/

const abi = Abi.BlockNumberArtifact.abi as AbiItem[];
const bytecode = Abi.BlockNumberArtifact.bytecode;
const label = 'BlockNumber';

Main.decorators = [
    (Story) => {
        const [accounts] = Network.hooks.useAccounts('1337');
        const from = accounts.length > 0 ? accounts[0] : undefined;
        const [contract] = Contract.hooks.useDeploy({ networkId: '1337', abi, bytecode, from, label }, undefined, true);
        console.debug(contract);
        return <Story />;
    },
];
