---
id: 'Sync'
title: 'Namespace: Sync'
sidebar_label: 'Sync'
sidebar_position: 0
custom_edit_url: null
---

Comments on Sync module

## Interfaces

-   [BlockSync](../interfaces/Sync.BlockSync.md)
-   [EventSync](../interfaces/Sync.EventSync.md)
-   [TransactionSync](../interfaces/Sync.TransactionSync.md)

## Actions Variables

-   [create](Sync.md#create)
-   [remove](Sync.md#remove)
-   [update](Sync.md#update)

## Other Variables

-   [CREATE](Sync.md#create)
-   [REMOVE](Sync.md#remove)
-   [UPDATE](Sync.md#update)

## Actions

Create a Sync object from generic parameters Functions

-   [createSyncForActions](Sync.md#createsyncforactions)

## Other Functions

-   [isAction](Sync.md#isaction)
-   [isCreateAction](Sync.md#iscreateaction)
-   [isReducerAction](Sync.md#isreduceraction)
-   [isRemoveAction](Sync.md#isremoveaction)
-   [isUpdateAction](Sync.md#isupdateaction)
-   [reducer](Sync.md#reducer)

## Selectors Functions

-   [selectByIdExists](Sync.md#selectbyidexists)
-   [selectByIdMany](Sync.md#selectbyidmany)
-   [selectByIdSingle](Sync.md#selectbyidsingle)

## Type aliases

### Action

Ƭ **Action**: [`ReducerAction`](Sync.md#reduceraction)

**`internal`**

#### Defined in

[src/sync/actions/index.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/index.ts#L13)

---

### CreateAction

Ƭ **CreateAction**: `ReturnType`<typeof [`create`](Sync.md#create)\>

**`internal`**

#### Defined in

[src/sync/actions/create.ts:11](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/create.ts#L11)

---

### GenericSync

Ƭ **GenericSync**: [`EventSync`](../interfaces/Sync.EventSync.md) \| `"Block"` \| `"Transaction"` \| `number` \| `"once"`

#### Defined in

[src/sync/model/index.ts:9](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/model/index.ts#L9)

---

### ReducerAction

Ƭ **ReducerAction**: [`CreateAction`](Sync.md#createaction) \| [`RemoveAction`](Sync.md#removeaction) \| [`UpdateAction`](Sync.md#updateaction)

**`internal`**

#### Defined in

[src/sync/actions/index.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/index.ts#L6)

---

### RemoveAction

Ƭ **RemoveAction**: `ReturnType`<typeof [`remove`](Sync.md#remove)\>

**`internal`**

#### Defined in

[src/sync/actions/remove.ts:10](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/remove.ts#L10)

---

### Sync

Ƭ **Sync**: [`BlockSync`](../interfaces/Sync.BlockSync.md) \| [`TransactionSync`](../interfaces/Sync.TransactionSync.md) \| [`EventSync`](../interfaces/Sync.EventSync.md)

#### Defined in

[src/sync/model/index.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/model/index.ts#L6)

---

### UpdateAction

Ƭ **UpdateAction**: `ReturnType`<typeof [`update`](Sync.md#update)\>

**`internal`**

#### Defined in

[src/sync/actions/update.ts:11](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/update.ts#L11)

## Actions Variables

### create

• **create**: `ActionCreatorWithPayload`<[`Sync`](Sync.md#sync), `string`\>

#### Defined in

[src/sync/actions/create.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/create.ts#L8)

---

### remove

• **remove**: `ActionCreatorWithPayload`<`string`, `string`\>

#### Defined in

[src/sync/actions/remove.ts:7](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/remove.ts#L7)

---

### update

• **update**: `ActionCreatorWithPayload`<[`Sync`](Sync.md#sync), `string`\>

#### Defined in

[src/sync/actions/update.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/update.ts#L8)

---

## Other Variables

### CREATE

• **CREATE**: `string`

**`internal`**

#### Defined in

[src/sync/actions/create.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/create.ts#L6)

---

### REMOVE

• **REMOVE**: `string`

**`internal`**

#### Defined in

[src/sync/actions/remove.ts:5](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/remove.ts#L5)

---

### UPDATE

• **UPDATE**: `string`

**`internal`**

#### Defined in

[src/sync/actions/update.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/update.ts#L6)

## Actions

Create a Sync object from generic parameters Functions

### createSyncForActions

▸ **createSyncForActions**(`networkId`, `actions`, `sync`, `address`): [`Sync`](Sync.md#sync) \| `undefined`

#### Parameters

| Name        | Type                                 |
| :---------- | :----------------------------------- |
| `networkId` | `string`                             |
| `actions`   | `AnyAction`[]                        |
| `sync`      | [`GenericSync`](Sync.md#genericsync) |
| `address`   | `string`                             |

#### Returns

[`Sync`](Sync.md#sync) \| `undefined`

#### Defined in

[src/sync/model/index.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/model/index.ts#L13)

---

## Other Functions

### isAction

▸ **isAction**(`action`): action is ReducerAction

**`internal`**

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `action`      | `Object` |
| `action.type` | `string` |

#### Returns

action is ReducerAction

#### Defined in

[src/sync/actions/index.ts:15](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/index.ts#L15)

---

### isCreateAction

▸ `Const` **isCreateAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/sync/actions/create.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/create.ts#L13)

---

### isReducerAction

▸ **isReducerAction**(`action`): action is ReducerAction

**`internal`**

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `action`      | `Object` |
| `action.type` | `string` |

#### Returns

action is ReducerAction

#### Defined in

[src/sync/actions/index.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/index.ts#L8)

---

### isRemoveAction

▸ `Const` **isRemoveAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/sync/actions/remove.ts:12](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/remove.ts#L12)

---

### isUpdateAction

▸ `Const` **isUpdateAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/sync/actions/update.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/actions/update.ts#L13)

---

### reducer

▸ **reducer**(`sess`, `action`): `any`

#### Parameters

| Name     | Type                                     |
| :------- | :--------------------------------------- |
| `sess`   | `any`                                    |
| `action` | [`ReducerAction`](Sync.md#reduceraction) |

#### Returns

`any`

#### Defined in

[src/sync/reducer.ts:3](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/reducer.ts#L3)

---

## Selectors Functions

### selectByIdExists

▸ **selectByIdExists**(`state`, `id`): `boolean`

#### Parameters

| Name    | Type                    |
| :------ | :---------------------- |
| `state` | `any`                   |
| `id`    | `undefined` \| `string` |

#### Returns

`boolean`

#### Defined in

[src/sync/selector/selectByIdExists.ts:4](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/selector/selectByIdExists.ts#L4)

---

### selectByIdMany

▸ **selectByIdMany**(`state`, `ids?`): ([`Sync`](Sync.md#sync) \| `null`)[]

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `state` | `any`      |
| `ids?`  | `string`[] |

#### Returns

([`Sync`](Sync.md#sync) \| `null`)[]

#### Defined in

[src/sync/selector/selectByIdMany.ts:5](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/selector/selectByIdMany.ts#L5)

---

### selectByIdSingle

▸ **selectByIdSingle**(`state`, `id`): [`Sync`](Sync.md#sync) \| `undefined`

#### Parameters

| Name    | Type                    |
| :------ | :---------------------- |
| `state` | `any`                   |
| `id`    | `undefined` \| `string` |

#### Returns

[`Sync`](Sync.md#sync) \| `undefined`

#### Defined in

[src/sync/selector/selectByIdSingle.ts:5](https://github.com/leovigna/web3-redux/blob/cff01f0/src/sync/selector/selectByIdSingle.ts#L5)
