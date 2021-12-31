/** A global singleton config object.
 * Can be extended to store any key-value pairs.
 */
export interface Config {
    /* Id in store. Default is 0. */
    readonly id: string;
    /* Selected blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks.
     */
    readonly networkId?: string | undefined;
    /* Selected account */
    readonly account?: string | undefined;
    /* Arbitrary config values */
    readonly [key: string]: any;
}

export default Config;
