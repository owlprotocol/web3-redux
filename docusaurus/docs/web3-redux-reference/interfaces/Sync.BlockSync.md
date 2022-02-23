---
id: 'Sync.BlockSync'
title: 'Interface: BlockSync'
sidebar_label: 'BlockSync'
custom_edit_url: null
---

[Sync](../namespaces/Sync.md).BlockSync

Sync middleware to handle [BlockHeader](Block.BlockHeader.md) CREATE/UPDATE actions.

## Hierarchy

-   `BaseSync`

    ↳ **`BlockSync`**

## Properties

### actions

• **actions**: `AnyAction`[]

Actions to dispatch when triggered

#### Inherited from

BaseSync.actions

#### Defined in

[src/sync/model/BaseSync.ts:15](https://github.com/leovigna/web3-redux/blob/be15552/src/sync/model/BaseSync.ts#L15)

---

### id

• `Optional` **id**: `string`

Used to index in redux-orm.

#### Inherited from

BaseSync.id

#### Defined in

[src/sync/model/BaseSync.ts:9](https://github.com/leovigna/web3-redux/blob/be15552/src/sync/model/BaseSync.ts#L9)

---

### matchBlockNumberModulo

• `Optional` **matchBlockNumberModulo**: `number`

#### Defined in

[src/sync/model/BlockSync.ts:8](https://github.com/leovigna/web3-redux/blob/be15552/src/sync/model/BlockSync.ts#L8)

---

### networkId

• **networkId**: `string`

Network Id to filter on

#### Inherited from

BaseSync.networkId

#### Defined in

[src/sync/model/BaseSync.ts:13](https://github.com/leovigna/web3-redux/blob/be15552/src/sync/model/BaseSync.ts#L13)

---

### type

• **type**: `"Block"`

#### Overrides

BaseSync.type

#### Defined in

[src/sync/model/BlockSync.ts:7](https://github.com/leovigna/web3-redux/blob/be15552/src/sync/model/BlockSync.ts#L7)
