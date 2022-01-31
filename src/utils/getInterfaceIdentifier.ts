import { AbiItem, keccak256 } from 'web3-utils';

export function getInterfaceIdentifier(abi: AbiItem[]): string {
    if (abi.length === 0) return '';

    let first;
    let identifier = '';
    let curr;

    for (const abiItem of abi) {
        const { name, inputs } = abiItem;
        let finalStr = name + '(';

        if (!inputs || inputs.length === 0) finalStr += ')';
        else {
            finalStr += inputs[0].type;
            for (let i = 1; i < inputs.length; i++) {
                finalStr += ',' + inputs[i].type;
            }
            finalStr += ')';
        }

        if (abi.length === 1) return keccak256(finalStr).substring(2, 10);

        curr = hexToBinary(keccak256(finalStr).substring(0, 10));
        if (identifier) identifier = xor(identifier, curr);
        else if (first) identifier = xor(first, curr);
        else first = curr;
    }
    return parseInt(identifier, 2).toString(16);
}

function hexToBinary(hex: string) {
    return parseInt(hex, 16).toString(2).padStart(32, '0');
}

function xor(bin1: string, bin2: string): string {
    let finalBin = '';
    for (let i = 0; i < bin1.length; i++) {
        if (bin1.charAt(i) !== bin2.charAt(i)) finalBin += '1';
        else finalBin += '0';
    }
    return finalBin;
}

export default getInterfaceIdentifier;
