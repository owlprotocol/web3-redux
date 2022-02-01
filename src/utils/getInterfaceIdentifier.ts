import { AbiItem, keccak256 } from 'web3-utils';

export function getInterfaceIdentifierForAbi(abi: AbiItem[]): string {
    if (abi.length === 0) return '';

    const functionIdentifiers: string[] = abi.map((item) => getFunctionIdentifier(item));
    const binFunctionIdentifiers: string[] = functionIdentifiers.map((item) =>
        hexTo4ByteBinary(keccak256(item).substring(0, 10)),
    );
    const binIdentifier: string = getInterfaceIdentifier(binFunctionIdentifiers);
    const hexIdentifier: string = binaryTo4ByteHex(binIdentifier);

    return hexIdentifier;
}

export function getFunctionIdentifier(item: AbiItem): string {
    const { name, inputs } = item;
    let finalStr = name + '(';

    if (!inputs || inputs.length === 0) return (finalStr += ')');

    finalStr += inputs[0].type;
    for (let i = 1; i < inputs.length; i++) {
        finalStr += ',' + inputs[i].type;
    }
    finalStr += ')';

    return finalStr;
}

export function getInterfaceIdentifier(functionIdentifiers: string[]): string {
    return functionIdentifiers.reduce((prev, curr) => xor(prev, curr));
}

export function hexTo4ByteBinary(hex: string) {
    return parseInt(hex, 16).toString(2).padStart(32, '0');
}

export function binaryTo4ByteHex(binary: string) {
    return parseInt(binary, 2).toString(16).padStart(8, '0');
}

export function xor(bin1: string, bin2: string): string {
    let finalBin = '';
    for (let i = 0; i < bin1.length; i++) {
        if (bin1.charAt(i) !== bin2.charAt(i)) finalBin += '1';
        else finalBin += '0';
    }
    return finalBin;
}

export default getInterfaceIdentifierForAbi;
