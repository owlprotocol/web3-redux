import { assert } from 'chai';
import { getInterfaceIdentifier } from './getInterfaceIdentifier';
import { AbiItem } from 'web3-utils';

describe('getInterfaceIdentifier', () => {
    it('ERC721Enumerable', () => {
        const abi: AbiItem[] = [
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'index',
                        type: 'uint256',
                    },
                ],
                name: 'tokenByIndex',
                outputs: [
                    {
                        internalType: 'uint256',
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'address',
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'index',
                        type: 'uint256',
                    },
                ],
                name: 'tokenOfOwnerByIndex',
                outputs: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'totalSupply',
                outputs: [
                    {
                        internalType: 'uint256',
                        name: '',
                        type: 'uint256',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
        ];

        assert.equal(getInterfaceIdentifier(abi), '780e9d63');
    });

    it('ERC721Metadata', () => {
        const abi: AbiItem[] = [
            {
                inputs: [],
                name: 'name',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [],
                name: 'symbol',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
            {
                inputs: [
                    {
                        internalType: 'uint256',
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'tokenURI',
                outputs: [
                    {
                        internalType: 'string',
                        name: '',
                        type: 'string',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
        ];

        assert.equal(getInterfaceIdentifier(abi), '5b5e139f');
    });

    it('ERC165', () => {
        const abi: AbiItem[] = [
            {
                inputs: [
                    {
                        internalType: 'bytes4',
                        name: 'interfaceId',
                        type: 'bytes4',
                    },
                ],
                name: 'supportsInterface',
                outputs: [
                    {
                        internalType: 'bool',
                        name: '',
                        type: 'bool',
                    },
                ],
                stateMutability: 'view',
                type: 'function',
            },
        ];

        assert.equal(getInterfaceIdentifier(abi), '01ffc9a7');
    });
});
