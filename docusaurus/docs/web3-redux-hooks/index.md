## Hooks

To easily read/sync data, we recommend using the built-in hooks when possible to automatically combine selectors & action dispatchers.

**EVM Blockchain**

-   [useBlock](./modules/Block#useBlock): Fetch specific block.
-   [useLatestBlock](./modules/Network#useLatestBlock): Fetch latest block (TBD currently just fetches latest block in store and does not query network).
-   [useBlockSync](./modules/Block#useBlockSync): Subscribe to new blocks.
-   [useTransaction](./modules/Transaction#useTransaction): Fetch specific transaction.

**Smart Contracts / Externally Owned Accounts**

-   [useGetBalance](./modules/Contract#useGetBalance): Get balance of address.
-   [useGetNonce](./modules/Contract#useGetNonce): Get nonce (tx count) of address.
-   [useGetCode](./modules/Contract#useGetCode): Get code of address. `0x` indicates an EOA.
-   [useContractCall](./modules/Contract#useContractCall): Make a contract call.
-   [useEvents](./modules/Contract#useEvents): Get past or sync contract event logs.
-   [useSupportsInterface](./modules/Contract#useSupportsInterface): Check if contract supports interface using ERC165.
-   [useERC20](./modules/Contract#useERC20): Common ERC20 contract calls and events.
-   [useERC721](./modules/Contract#useERC721): Common ERC721 contract calls and events.
-   [useERC1155](./modules/Contract#useERC1155): Common ERC1155 contract calls and events.

**IPFS**

-   [useIpfs](./modules/Ipfs#useIpfs): Fetch IPFS resource using content hash.

**Etherscan API**

-   [useFetchAbi](./modules/Contract#useFetchAbi): Fetch contract ABI using Etherscan API.
-   [useFetchTransactions](./modules/Contract#useFetchTransaction): Fetch transactions for address using Etherscan API.

**Experimental**

-   [useGetPastLogs](./modules/ContractEvent#useGetPastLogs): Fetch past logs using raw subscribe filter. Enables syncing event across multiple smart contracts efficiently. (TBD)
-   [useGetAssets](./modules/ContractEvent#useGetAssets): Fetch all ERC20/ERC721/ERC1155 `Transfer` events associated with an `address` to get a theoretical subset of all assets that `address` potentially owns. Not guaranteed to work with non-interface compliant assets but offers an alternative to off-chain indexing. **(TBD)**
