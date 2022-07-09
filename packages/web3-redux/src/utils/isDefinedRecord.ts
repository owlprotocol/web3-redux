export function isDefinedRecord<T extends Record<string, any> = Record<string, any>>(t: Partial<T>): t is T {
    //Compound index
    if (Object.values(t).includes(undefined)) {
        //Missing index key, return undefined
        return false;
    }
    return true;
}

export default isDefinedRecord;
