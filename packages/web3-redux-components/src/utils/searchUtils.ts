/**
 * Return the matching path for any search term
 * @param searchTerm search term can be Block number / Block hash / Transaction / Address.
 */
export const getSearchUrlWithTerm = (searchTerm: string) => {
    if (validateBlockNumber(searchTerm)) {
        return `/block/${searchTerm}/`;
    } else if (validateTransactionHash(searchTerm)) {
        return `/tx/${searchTerm}`;
    } else if (validateAddress(searchTerm)) {
        return `/address/${searchTerm}/`;
    } else {
        return '/error';
    }
};

/**
 * Regex test to check if search term is positive number (including zero)
 * @param string
 * @returns boolean indicating if it is a positive number or not
 */
export const validateBlockNumber = (string: string) => {
    const regexExp = /^[0-9]*$/;
    return regexExp.test(string);
};

/**
 * Regex test to check if search term is a valid ethereum address (including zero)
 * @param string
 * @returns a boolean of whether the term is an address or not
 */
export const validateAddress = (string: string) => {
    if (string.length !== 42) return false;
    return validateHex(string);
};

/**
 * Simple regex test to ensure a string is valid ERC20 hash
 * @param string
 * @returns boolean indicates if hash is valid or not
 */
export const validateTransactionHash = (string: string) => {
    if (string.length !== 66) return false;
    return validateHex(string);
};

const validateHex = (string: string) => {
    const hexChars = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    if (string.substring(0, 2) !== '0x') return false;
    for (let i = 2; i < string.length; i++) {
        if (!hexChars.includes(string.charAt(i).toLowerCase())) return false;
    }
    return true;
};
