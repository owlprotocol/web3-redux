---
sidebar_position: 3.3
---

# Contract - Pre-Configured Interfaces

These hooks are designed to optimize fetching data from popular ERC interfaces. No ABI is required for these hooks as they contain presets. Optimizations take into account the event logs of the interface to refresh calls only when required.

## ERC20 - Token

Popular token standard. Common [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) contract calls and events.

```tsx
const { name, symbol, decimals, totalSupply, balanceOf } = Contract.useERC20(networkId, address, balanceOfAddress);
```

**Reference:** [Contract.useERC20](../web3-redux-reference/namespaces/Contract.md#useerc20)

**Alias:** [Contract.useToken](../web3-redux-reference/namespaces/Contract.md#usetoken)

## ERC721 - Non Fungible Token (NFT)

Popular NFT standard. Common [ERC721](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md) contract calls and events.

```tsx
const { name, symbol, tokenURI, metadata, ownerOf } = Contract.useERC721(networkId, address, tokenId);
```

**Reference:** [Contract.useERC721](../web3-redux-reference/namespaces/Contract.md#useerc721)

**Alias:** [Contract.useNFT](../web3-redux-reference/namespaces/Contract.md#usenft)

## ERC1155 - Multi-Token

Popular Multi-Token standard. Common [ERC1155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md) contract calls and events.

```tsx
const { uri, balanceOf } = Contract.useERC1155(networkId, address, balanceOfAddress, balanceOfTokenId);
```

**Reference:** [Contract.useERC1155](../web3-redux-reference/namespaces/Contract.md#useerc1155)

**Alias:** [Contract.useMultiToken](../web3-redux-reference/namespaces/Contract.md#usemultitoken)

## ERC165 - Introspection

Check if contract supports an interface using [ERC165](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md).

```tsx
const interfaceSupported: boolean = Contract.useERC165(networkId, address, interfaceId);
```

**Reference:** [Contract.useERC165](../web3-redux-reference/namespaces/Contract.md#useerc165)

**Alias:** [Contract.useSupportsInterface](../web3-redux-reference/namespaces/Contract.md#usesupportsinterface)
