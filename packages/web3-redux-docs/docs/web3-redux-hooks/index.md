---
sidebar_position: 0
---

# Hooks

To easily read/sync data, we recommend using the built-in hooks when possible to automatically combine selectors & action dispatchers.

## Block

-   [useBlock](./Block.md#useBlock): Fetch specific block by number or blockHash.
-   [useLatestBlock](./Block.md#useLatestBlock): Fetch latest block for network.
-   [useBlockSync](./Block.md#useBlockSync): Subscribe to new blocks.

## Transaction

-   [useTransaction](./Transaction.md#useTransaction): Fetch specific transaction by hash.

## Contract

These hooks are for both Smart Contracts and Externally Owned Accounts.

**General Info**

-   [useGetBalance](./Contract_Info.md#useGetBalance): Get balance of address.
-   [useGetNonce](./Contract_Info.md#useGetNonce): Get nonce (tx count) of address.
-   [useGetCode](./Contract_Info.md#useGetCode): Get code at address. `0x` indicates an EOA.
    **Smart Contract Data**
-   [useContractCall](./Contract_Data.md#useContractCall): Make a contract call.
-   [useEvents](./Contract_Data.md#useEvents): Get past or sync contract event logs.
    **Pre-configured Interfaces**
-   [useERC20](./Contract_Interfaces.md#useERC20): Popular token standard.
-   [useERC721](./Contract_Interfaces.md#useERC721): Popular NFT standard.
-   [useERC1155](./Contract_Interfaces.md#useERC1155): Popular Multi-Token standard.
-   [useERC165](./Contract_Interfaces.md#useERC165): Introspection standard to check if a contract supports an interface.
    **Etherscan API**
-   [useFetchAbi](./Contract_Etherscan.md#useFetchAbi): Fetch contract ABI using Etherscan API.
-   [useFetchTransactions](./Contract_Etherscan.md#useFetchTransaction): Fetch transactions for address using Etherscan API.

## Contract Event

-   [useGetPastLogs](./ContractEvent.md#useGetPastLogs): Fetch past logs using raw subscribe filter. Enables syncing event across multiple smart contracts efficiently.
-   [useGetAssets](./ContractEvent.md#useGetAssets): Fetch all tokenized assets for address.

## IPFS

-   [useIpfs](./IPFS.md#useIpfs): Fetch IPFS resource using content hash.
