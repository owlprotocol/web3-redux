---
id: 'Sync.TransactionSync'
title: 'Interface: TransactionSync'
sidebar_label: 'TransactionSync'
custom_edit_url: null
---

[Sync](../namespaces/Sync.md).TransactionSync

Sync middleware to handle [Transaction](./Transaction.Transaction-1) CREATE/UPDATE actions.

## Hierarchy

-   `BaseSync`

    ↳ **`TransactionSync`**

## Properties

### actions

• **actions**: `AnyAction`[]

Actions to dispatch when triggered

#### Inherited from

BaseSync.actions

#### Defined in

[src/sync/model/BaseSync.ts:15](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/sync/model/BaseSync.ts#L15)

---

### id

• `Optional` **id**: `string`

Used to index in redux-orm.

#### Inherited from

BaseSync.id

#### Defined in

[src/sync/model/BaseSync.ts:9](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/sync/model/BaseSync.ts#L9)

---

### matchFrom

• `Optional` **matchFrom**: `string`

#### Defined in

[src/sync/model/TransactionSync.ts:9](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/sync/model/TransactionSync.ts#L9)

---

### matchTo

• `Optional` **matchTo**: `string`

#### Defined in

[src/sync/model/TransactionSync.ts:10](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/sync/model/TransactionSync.ts#L10)

---

### networkId

• **networkId**: `string`

Network Id to filter on

#### Inherited from

BaseSync.networkId

#### Defined in

[src/sync/model/BaseSync.ts:13](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/sync/model/BaseSync.ts#L13)

---

### type

• **type**: `"Transaction"`

#### Overrides

BaseSync.type

#### Defined in

[src/sync/model/TransactionSync.ts:8](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/sync/model/TransactionSync.ts#L8)
