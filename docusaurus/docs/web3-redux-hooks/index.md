## Hooks

To easily read/sync data, we recommend using the built-in hooks when possible to automatically combine selectors & action dispatchers.

**EVM Blockchain**

-   [useBlock](../web3-redux-reference/namespaces/Block.md#useBlock): Fetch specific block.
-   [useLatestBlock](../web3-redux-reference/namespaces/Network.md#useLatestBlock): Fetch latest block (TBD currently just fetches latest block in store and does not query network).
-   [useBlockSync](../web3-redux-reference/namespaces/Block.md#useBlockSync): Subscribe to new blocks.
-   [useTransaction](../web3-redux-reference/namespaces/Transaction.md#useTransaction): Fetch specific transaction.

**Smart Contracts / Externally Owned Accounts**

-   [useGetBalance](../web3-redux-reference/namespaces/Contract.md#useGetBalance): Get balance of address.
-   [useGetNonce](../web3-redux-reference/namespaces/Contract.md#useGetNonce): Get nonce (tx count) of address.
-   [useGetCode](../web3-redux-reference/namespaces/Contract.md#useGetCode): Get code of address. `0x` indicates an EOA.
-   [useContractCall](../web3-redux-reference/namespaces/Contract.md#useContractCall): Make a contract call.
-   [useEvents](../web3-redux-reference/namespaces/Contract.md#useEvents): Get past or sync contract event logs.
-   [useSupportsInterface](../web3-redux-reference/namespaces/Contract.md#useSupportsInterface): Check if contract supports interface using ERC165.
-   [useERC20](../web3-redux-reference/namespaces/Contract.md#useERC20): Common ERC20 contract calls and events.
-   [useERC721](../web3-redux-reference/namespaces/Contract.md#useERC721): Common ERC721 contract calls and events.
-   [useERC1155](../web3-redux-reference/namespaces/Contract.md#useERC1155): Common ERC1155 contract calls and events.

**IPFS**

-   [useIpfs](../web3-redux-reference/namespaces/Ipfs.md#useIpfs): Fetch IPFS resource using content hash.

**Etherscan API**

-   [useFetchAbi](../web3-redux-reference/namespaces/Contract.md#useFetchAbi): Fetch contract ABI using Etherscan API.
-   [useFetchTransactions](../web3-redux-reference/namespaces/Contract.md#useFetchTransaction): Fetch transactions for address using Etherscan API.

**Experimental**

-   [useGetPastLogs](../web3-redux-reference/namespaces/ContractEvent.md#useGetPastLogs): Fetch past logs using raw subscribe filter. Enables syncing event across multiple smart contracts efficiently. (TBD)
-   [useGetAssets](../web3-redux-reference/namespaces/ContractEvent.md#useGetAssets): Fetch all ERC20/ERC721/ERC1155 `Transfer` events associated with an `address` to get a theoretical subset of all assets that `address` potentially owns. Not guaranteed to work with non-interface compliant assets but offers an alternative to off-chain indexing. **(TBD)**
