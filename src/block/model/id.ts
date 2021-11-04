export interface IdDeconstructed {
    readonly networkId: string;
    readonly number: number;
}
export type Id = string;

export type IdArgs = IdDeconstructed | Id;
const SEPARATOR = '-';
export function getId(id: IdArgs): Id {
    if (typeof id === 'string') return id;
    const { networkId, number } = id;

    return [networkId, number].join(SEPARATOR);
}
export function getIdDeconstructed(id: IdArgs): IdDeconstructed {
    if (typeof id !== 'string') return id;

    const [networkId, number] = id.split(SEPARATOR); //Assumes separator not messed up
    return { networkId, number: parseInt(number) };
}
