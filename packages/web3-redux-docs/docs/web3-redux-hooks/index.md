---
sidebar_position: 0
---

# Hooks

To easily read/sync data, we recommend using the built-in hooks when possible to automatically combine selectors & action dispatchers.

## Contract

These hooks are for both Smart Contracts and Externally Owned Accounts.

### General Info

-   [useGetBalance](./0_Contract/5_useGetBalance.mdx): Get balance of address.
-   [useGetNonce](./0_Contract/6_useGetNonce.mdx): Get nonce (tx count) of address.
-   [useGetCode](./0_Contract/7_useGetCode.mdx): Get code at address. `0x` indicates an EOA.

### Smart Contract Data
-   [useContractCall](./0_Contract/0_useContractCall.mdx): Make a contract call.
-   [useEvents](./0_Contract/1_useEvents.mdx): Get past or sync contract event logs.

### Pre-configured Interfaces
-   [useERC20](./1_ERC20/0_useERC20.mdx): Popular token standard.
-   [useERC721](./2_ERC721/0_useERC721.mdx): Popular NFT standard.
-   [useERC1155](./3_ERC1155/0_useERC1155.mdx): Popular Multi-Token standard.
-   [useERC165](./4_ERC165/0_useERC165.mdx): Introspection standard to check if a contract supports an interface.

### Etherscan API
-   [useFetchAbi](./0_Contract/8_useFetchAbi.mdx): Fetch contract ABI using Etherscan API.
-   [useFetchTransactions](./7_Transaction/1_useFetchTransactions.mdx): Fetch transactions for address using Etherscan API.

## Block

-   [useBlock](./6_Block/0_useBlock.mdx): Fetch specific block by number or blockHash.
-   [useLatestBlock](./6_Block/1_useLatestBlock.mdx): Fetch latest block for network.
-   [useBlockSync](./6_Block/2_useBlockSync.mdx): Subscribe to new blocks.

## Transaction

-   [useTransaction](./7_Transaction/0_useTransaction.mdx): Fetch specific transaction by hash.

## Contract Event

-   [useGetPastLogs](./5_Event/0_useGetPastLogs.mdx): Fetch past logs using raw subscribe filter. Enables syncing event across multiple smart contracts efficiently.
-   [useGetAssets](./5_Event/1_useGetAssets.mdx): Fetch all tokenized assets for address.

## IPFS

-   [useIpfs](./IPFS.md#useIpfs): Fetch IPFS resource using content hash.
