---
id: 'Sync.EventSync'
title: 'Interface: EventSync'
sidebar_label: 'EventSync'
custom_edit_url: null
---

[Sync](../namespaces/Sync.md).EventSync

Sync middleware to handle [ContractEvent](./ContractEvent.ContractEvent-1) CREATE/UPDATE actions.

## Hierarchy

-   `BaseSync`

    ↳ **`EventSync`**

## Properties

### actions

• **actions**: `AnyAction`[]

Actions to dispatch when triggered

#### Inherited from

BaseSync.actions

#### Defined in

[src/sync/model/BaseSync.ts:15](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/sync/model/BaseSync.ts#L15)

---

### id

• `Optional` **id**: `string`

Used to index in redux-orm.

#### Inherited from

BaseSync.id

#### Defined in

[src/sync/model/BaseSync.ts:9](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/sync/model/BaseSync.ts#L9)

---

### matchAddress

• **matchAddress**: `string`

#### Defined in

[src/sync/model/EventSync.ts:8](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/sync/model/EventSync.ts#L8)

---

### matchName

• **matchName**: `string`

#### Defined in

[src/sync/model/EventSync.ts:9](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/sync/model/EventSync.ts#L9)

---

### matchReturnValues

• `Optional` **matchReturnValues**: { `[k: string]`: `any`; } \| { `[k: string]`: `any`; }[]

#### Defined in

[src/sync/model/EventSync.ts:10](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/sync/model/EventSync.ts#L10)

---

### networkId

• **networkId**: `string`

Network Id to filter on

#### Inherited from

BaseSync.networkId

#### Defined in

[src/sync/model/BaseSync.ts:13](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/sync/model/BaseSync.ts#L13)

---

### type

• **type**: `"Event"`

#### Overrides

BaseSync.type

#### Defined in

[src/sync/model/EventSync.ts:7](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/sync/model/EventSync.ts#L7)
