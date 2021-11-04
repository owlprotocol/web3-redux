export type Id = string;
export interface Interface {
    readonly id: string;
    readonly networkId?: string | undefined;
    readonly account?: string | undefined;
}

export default Interface;
