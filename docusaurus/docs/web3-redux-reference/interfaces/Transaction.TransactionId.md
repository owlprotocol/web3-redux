---
id: 'Transaction.TransactionId'
title: 'Interface: TransactionId'
sidebar_label: 'TransactionId'
custom_edit_url: null
---

[Transaction](../namespaces/Transaction.md).TransactionId

Transaction id components

## Hierarchy

-   **`TransactionId`**

    ↳ [`Transaction`](Transaction.Transaction-1.md)

## Properties

### hash

• `Readonly` **hash**: `string`

Transaction hash.

Should be unique to blockchain if using proper replay protection but we still use `networkId` just in case.
This is also consistent with how other data in the store is indexed by network.

#### Defined in

[src/transaction/model/interface.ts:15](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L15)

---

### networkId

• `Readonly` **networkId**: `string`

Blockchain network id.
See [chainlist](https://chainlist.org/) for a list of networks.

#### Defined in

[src/transaction/model/interface.ts:10](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L10)
