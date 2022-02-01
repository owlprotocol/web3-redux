import { AbiItem, keccak256 } from 'web3-utils';
import lodash from 'lodash';

export function getInterfaceIdentifierForAbi(abi: AbiItem[]): string {
    if (abi.length === 0) return '';

    const functionIdentifiers: string[] = abi.map((item) => getFunctionIdentifier(item));
    const identifier: string = getInterfaceIdentifier(functionIdentifiers);

    return identifier;
}

export function getFunctionIdentifier(item: AbiItem): string {
    const { name, inputs } = item;
    let finalStr = name + '(';

    if (!inputs || inputs.length === 0) return get4ByteIdentifier((finalStr += ')'));

    finalStr += lodash.map(inputs, 'type').join(',');
    finalStr += ')';

    return get4ByteIdentifier(finalStr);
}

export function getInterfaceIdentifier(functionIdentifiers: string[]): string {
    const binFunctionIdentifiers: string[] = functionIdentifiers.map((item) => hexTo4ByteBinary(item));
    const binIdentifier = binFunctionIdentifiers.reduce((prev, curr) => xor(prev, curr));
    const hexIdentifier: string = binaryTo4ByteHex(binIdentifier);

    return hexIdentifier;
}

export function get4ByteIdentifier(input: string): string {
    return keccak256(input).substring(0, 10);
}

export function hexTo4ByteBinary(hex: string) {
    return parseInt(hex, 16).toString(2).padStart(32, '0');
}

export function binaryTo4ByteHex(binary: string) {
    return parseInt(binary, 2).toString(16).padStart(8, '0');
}

//assumes input is in binary
export function xor(bin1: string, bin2: string): string {
    let finalBin = '';
    bin1.split('').forEach((char, i) => (char !== bin2.charAt(i) ? (finalBin += '1') : (finalBin += '0')));
    return finalBin;
}

export default getInterfaceIdentifierForAbi;
