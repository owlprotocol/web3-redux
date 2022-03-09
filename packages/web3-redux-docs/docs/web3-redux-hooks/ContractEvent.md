---
sidebar_position: 4
---

# ContractEvent

These hooks are designed to fetch raw contract event logs without the `Contract` abstraction. This can enable additional optimization in certain scenarios (eg. fetching logs from multiple contracts).

## useGetPastLogs

Fetch past logs using raw subscribe filter. Enables syncing event across multiple smart contracts efficiently.

**Reference:** [ContractEvent.useGetPastLogs](../web3-redux-reference/namespaces/ContractEvent.md#usegetpastlogs)

:::warning
This hook is experimental.
:::

## useGetAssets

Fetch all tokenized assets for address.
This is achieved by getting all ERC20/ERC721/ERC1155 `Transfer` events associated with an `address` to get a theoretical subset of all assets that `address` potentially owns. Not guaranteed to work with non-interface compliant assets but offers an alternative to off-chain indexing.

**Reference:** [ContractEvent.useGetAssets](../web3-redux-reference/namespaces/ContractEvent.md#usegetassets)

:::warning
This hook is experimental.
:::
