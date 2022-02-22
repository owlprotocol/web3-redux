## Contract Call Sync

`web3-redux` offers enhanced customizability of contract call syncing to avoid unecessary rpc calls. Contract call syncing is achieved by refreshing contract calls based on a set of parameters. To initiate contract call syncing, one must first dispatch a ContractCallAction.

There are 4 types of contract call syncing:

-   `once`: Call contract method once
-   `Block`: Call contract and refresh every block.
    `Event`: (TDB)
-   `Transaction`: Call contract and refresh every time a block includes a transaction to the contract.

Note: Both block sync and transaction sync require an existing block subscription to be first created.

By default we use Transaction syncing. See [Advanced/Optimising Contract Call Sync](#custom-contract-call-syncing) for more info.
