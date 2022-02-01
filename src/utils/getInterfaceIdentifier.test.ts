import { assert } from 'chai';
import {
    getInterfaceIdentifierForAbi,
    getFunctionIdentifier,
    hexTo4ByteBinary,
    binaryTo4ByteHex,
    xor,
    getInterfaceIdentifier,
} from './getInterfaceIdentifier';
import { ERC165Abi, ERC721EnumerableAbi, ERC721MetadataAbi } from './abis';

describe('getInterfaceIdentifierForAbi', () => {
    it('ERC165', () => {
        assert.equal(getInterfaceIdentifierForAbi(ERC165Abi), '01ffc9a7');
    });

    it('ERC721Enumerable', () => {
        assert.equal(getInterfaceIdentifierForAbi(ERC721EnumerableAbi), '780e9d63');
    });

    it('ERC721Metadata', () => {
        assert.equal(getInterfaceIdentifierForAbi(ERC721MetadataAbi), '5b5e139f');
    });
});

describe('getFunctionIdentifier', () => {
    it('supportsInterface', () => {
        assert.equal(getFunctionIdentifier(ERC165Abi[0]), 'supportsInterface(bytes4)');
    });

    it('tokenByIndex', () => {
        assert.equal(getFunctionIdentifier(ERC721EnumerableAbi[0]), 'tokenByIndex(uint256)');
    });

    it('name', () => {
        assert.equal(getFunctionIdentifier(ERC721MetadataAbi[0]), 'name()');
    });
});

describe('getInterfaceIdentifier', () => {
    it('ERC165', () => {
        const binFunctionIdentifiers: string[] = ['00000001111111111100100110100111'];

        assert.equal(getInterfaceIdentifier(binFunctionIdentifiers), '00000001111111111100100110100111');
    });

    it('ERC721Enumerable', () => {
        const binFunctionIdentifiers: string[] = [
            '01001111011011001100110011100111',
            '00101111011101000101110001011001',
            '00011000000101100000110111011101',
        ];

        assert.equal(getInterfaceIdentifier(binFunctionIdentifiers), '01111000000011101001110101100011');
    });

    it('ERC721Metadata', () => {
        const binFunctionIdentifiers: string[] = [
            '00000110111111011101111000000011',
            '10010101110110001001101101000001',
            '11001000011110110101011011011101',
        ];

        assert.equal(getInterfaceIdentifier(binFunctionIdentifiers), '01011011010111100001001110011111');
    });
});

describe('hexTo4ByteBinary', () => {
    it('01ffc9a7', () => {
        assert.equal(hexTo4ByteBinary('01ffc9a7'), '00000001111111111100100110100111');
    });

    it('5b5e139f', () => {
        assert.equal(hexTo4ByteBinary('5b5e139f'), '01011011010111100001001110011111');
    });
});

describe('binaryTo4ByteHex', () => {
    it('00000001111111111100100110100111', () => {
        assert.equal(binaryTo4ByteHex('00000001111111111100100110100111'), '01ffc9a7');
    });

    it('01011011010111100001001110011111', () => {
        assert.equal(binaryTo4ByteHex('01011011010111100001001110011111'), '5b5e139f');
    });
});

describe('xor', () => {
    it('01000101, 1000101', () => {
        assert.equal(xor('01000101', '1000101'), '11001111');
    });

    it('same number', () => {
        assert.equal(xor('100100101010010100010', '100100101010010100010'), '000000000000000000000');
    });
});
