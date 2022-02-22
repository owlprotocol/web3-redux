---
id: 'EthCall'
title: 'Namespace: EthCall'
sidebar_label: 'EthCall'
sidebar_position: 0
custom_edit_url: null
---

Comments on EthCall module

## Interfaces

-   [EthCall](../interfaces/EthCall.EthCall-1.md)
-   [EthCallId](../interfaces/EthCall.EthCallId.md)

## Actions Variables

-   [create](EthCall.md#create)
-   [fetch](EthCall.md#fetch)
-   [remove](EthCall.md#remove)
-   [update](EthCall.md#update)

## Other Variables

-   [CREATE](EthCall.md#create)
-   [FETCH](EthCall.md#fetch)
-   [REMOVE](EthCall.md#remove)
-   [UPDATE](EthCall.md#update)

## Actions Functions

-   [set](EthCall.md#set)

## Other Functions

-   [SET](EthCall.md#set)
-   [getId](EthCall.md#getid)
-   [getIdArgs](EthCall.md#getidargs)
-   [isAction](EthCall.md#isaction)
-   [isCreateAction](EthCall.md#iscreateaction)
-   [isFetchAction](EthCall.md#isfetchaction)
-   [isReducerAction](EthCall.md#isreduceraction)
-   [isRemoveAction](EthCall.md#isremoveaction)
-   [isSagaAction](EthCall.md#issagaaction)
-   [isSetAction](EthCall.md#issetaction)
-   [isUpdateAction](EthCall.md#isupdateaction)
-   [reducer](EthCall.md#reducer)
-   [validate](EthCall.md#validate)

## Selectors Functions

-   [selectByFilter](EthCall.md#selectbyfilter)
-   [selectByIdExists](EthCall.md#selectbyidexists)
-   [selectByIdMany](EthCall.md#selectbyidmany)
-   [selectByIdSingle](EthCall.md#selectbyidsingle)

## References

### getEthCallId

Renames and re-exports [getId](EthCall.md#getid)

---

### getEthCallIdArgs

Renames and re-exports [getIdArgs](EthCall.md#getidargs)

---

### validateEthCall

Renames and re-exports [validate](EthCall.md#validate)

## Type aliases

### Action

Ƭ **Action**: [`ReducerAction`](EthCall.md#reduceraction)

**`internal`**

#### Defined in

[src/ethcall/actions/index.ts:22](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/index.ts#L22)

---

### CreateAction

Ƭ **CreateAction**: `ReturnType`<typeof [`create`](EthCall.md#create)\>

**`internal`**

#### Defined in

[src/ethcall/actions/create.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/create.ts#L13)

---

### FetchAction

Ƭ **FetchAction**: `ReturnType`<typeof [`fetch`](EthCall.md#fetch)\>

**`internal`**

#### Defined in

[src/ethcall/actions/fetch.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/fetch.ts#L13)

---

### ReducerAction

Ƭ **ReducerAction**: [`CreateAction`](EthCall.md#createaction) \| [`RemoveAction`](EthCall.md#removeaction) \| [`UpdateAction`](EthCall.md#updateaction) \| [`SetAction`](EthCall.md#setaction)

**`internal`**

#### Defined in

[src/ethcall/actions/index.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/index.ts#L8)

---

### RemoveAction

Ƭ **RemoveAction**: `ReturnType`<typeof [`remove`](EthCall.md#remove)\>

**`internal`**

#### Defined in

[src/ethcall/actions/remove.ts:20](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/remove.ts#L20)

---

### SagaAction

Ƭ **SagaAction**: [`FetchAction`](EthCall.md#fetchaction)

**`internal`**

#### Defined in

[src/ethcall/actions/index.ts:15](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/index.ts#L15)

---

### SetAction

Ƭ **SetAction**: `ReturnType`<typeof [`set`](EthCall.md#set)\>

**`internal`**

#### Defined in

[src/ethcall/actions/set.ts:21](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/set.ts#L21)

---

### UpdateAction

Ƭ **UpdateAction**: `ReturnType`<typeof [`update`](EthCall.md#update)\>

**`internal`**

#### Defined in

[src/ethcall/actions/update.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/update.ts#L13)

## Actions Variables

### create

• **create**: `ActionCreatorWithPreparedPayload`<[payload: EthCall], `ModelWithId`<[`EthCall`](../interfaces/EthCall.EthCall-1.md)\>, `string`, `never`, `never`\>

#### Defined in

[src/ethcall/actions/create.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/create.ts#L8)

---

### fetch

• **fetch**: `ActionCreatorWithPreparedPayload`<[payload: EthCall], `ModelWithId`<[`EthCall`](../interfaces/EthCall.EthCall-1.md)\>, `string`, `never`, `never`\>

#### Defined in

[src/ethcall/actions/fetch.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/fetch.ts#L8)

---

### remove

• **remove**: `ActionCreatorWithPreparedPayload`<[payload: EthCallId], { `data`: `string` ; `defaultBlock?`: `number` \| `"latest"` ; `from`: `undefined` \| `string` ; `gas?`: `number` ; `networkId`: `string` ; `to`: `string` }, `string`, `never`, `never`\>

#### Defined in

[src/ethcall/actions/remove.ts:9](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/remove.ts#L9)

---

### update

• **update**: `ActionCreatorWithPreparedPayload`<[payload: EthCall], `ModelWithId`<[`EthCall`](../interfaces/EthCall.EthCall-1.md)\>, `string`, `never`, `never`\>

#### Defined in

[src/ethcall/actions/update.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/update.ts#L8)

---

## Other Variables

### CREATE

• **CREATE**: `string`

**`internal`**

#### Defined in

[src/ethcall/actions/create.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/create.ts#L6)

---

### FETCH

• **FETCH**: `string`

**`internal`**

#### Defined in

[src/ethcall/actions/fetch.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/fetch.ts#L6)

---

### REMOVE

• **REMOVE**: `string`

**`internal`**

#### Defined in

[src/ethcall/actions/remove.ts:7](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/remove.ts#L7)

---

### UPDATE

• **UPDATE**: `string`

**`internal`**

#### Defined in

[src/ethcall/actions/update.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/update.ts#L6)

## Actions Functions

### set

▸ `Const` **set**(`payload`): `Object`

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `payload` | `SetActionInput` |

#### Returns

`Object`

| Name            | Type                                                                                               |
| :-------------- | :------------------------------------------------------------------------------------------------- |
| `payload`       | { `id`: `string` ; `key`: keyof [`EthCall`](../interfaces/EthCall.EthCall-1.md) ; `value`: `any` } |
| `payload.id`    | `string`                                                                                           |
| `payload.key`   | keyof [`EthCall`](../interfaces/EthCall.EthCall-1.md)                                              |
| `payload.value` | `any`                                                                                              |
| `type`          | `string`                                                                                           |

#### Defined in

[src/ethcall/actions/set.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/set.ts#L13)

---

## Other Functions

### SET

▸ `Const` **SET**(`key`): `string`

**`internal`**

#### Parameters

| Name  | Type                                                  |
| :---- | :---------------------------------------------------- |
| `key` | keyof [`EthCall`](../interfaces/EthCall.EthCall-1.md) |

#### Returns

`string`

#### Defined in

[src/ethcall/actions/set.ts:5](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/set.ts#L5)

---

### getId

▸ **getId**(`id`): `string`

**`internal`**

#### Parameters

| Name | Type                                              |
| :--- | :------------------------------------------------ |
| `id` | [`EthCallId`](../interfaces/EthCall.EthCallId.md) |

#### Returns

`string`

#### Defined in

[src/ethcall/model/interface.ts:58](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/model/interface.ts#L58)

---

### getIdArgs

▸ **getIdArgs**(`id`): [`EthCallId`](../interfaces/EthCall.EthCallId.md)

**`internal`**

#### Parameters

| Name | Type                                              |
| :--- | :------------------------------------------------ |
| `id` | [`EthCallId`](../interfaces/EthCall.EthCallId.md) |

#### Returns

[`EthCallId`](../interfaces/EthCall.EthCallId.md)

#### Defined in

[src/ethcall/model/interface.ts:42](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/model/interface.ts#L42)

---

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

[src/ethcall/actions/index.ts:24](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/index.ts#L24)

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

[src/ethcall/actions/create.ts:15](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/create.ts#L15)

---

### isFetchAction

▸ `Const` **isFetchAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/ethcall/actions/fetch.ts:15](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/fetch.ts#L15)

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

[src/ethcall/actions/index.ts:10](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/index.ts#L10)

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

[src/ethcall/actions/remove.ts:22](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/remove.ts#L22)

---

### isSagaAction

▸ **isSagaAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `action`      | `Object` |
| `action.type` | `string` |

#### Returns

action is Object

#### Defined in

[src/ethcall/actions/index.ts:17](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/index.ts#L17)

---

### isSetAction

▸ `Const` **isSetAction**(`action`): `boolean`

**`internal`**

#### Parameters

| Name                  | Type                                                  |
| :-------------------- | :---------------------------------------------------- |
| `action`              | `Object`                                              |
| `action.payload?`     | `Object`                                              |
| `action.payload.key?` | keyof [`EthCall`](../interfaces/EthCall.EthCall-1.md) |
| `action.type`         | `string`                                              |

#### Returns

`boolean`

#### Defined in

[src/ethcall/actions/set.ts:23](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/set.ts#L23)

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

[src/ethcall/actions/update.ts:15](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/actions/update.ts#L15)

---

### reducer

▸ **reducer**(`sess`, `action`): `any`

**`internal`**

#### Parameters

| Name     | Type                                        |
| :------- | :------------------------------------------ |
| `sess`   | `any`                                       |
| `action` | [`ReducerAction`](EthCall.md#reduceraction) |

#### Returns

`any`

#### Defined in

[src/ethcall/reducer.ts:7](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/reducer.ts#L7)

---

### validate

▸ **validate**(`item`): `ModelWithId`<[`EthCall`](../interfaces/EthCall.EthCall-1.md)\>

**`internal`**

#### Parameters

| Name   | Type                                            |
| :----- | :---------------------------------------------- |
| `item` | [`EthCall`](../interfaces/EthCall.EthCall-1.md) |

#### Returns

`ModelWithId`<[`EthCall`](../interfaces/EthCall.EthCall-1.md)\>

#### Defined in

[src/ethcall/model/interface.ts:69](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/model/interface.ts#L69)

---

## Selectors Functions

### selectByFilter

▸ `Const` **selectByFilter**(`state`, `filter`): [`EthCall`](../interfaces/EthCall.EthCall-1.md)[]

#### Parameters

| Name     | Type                                                                       |
| :------- | :------------------------------------------------------------------------- |
| `state`  | `any`                                                                      |
| `filter` | `undefined` \| `Partial`<[`EthCall`](../interfaces/EthCall.EthCall-1.md)\> |

#### Returns

[`EthCall`](../interfaces/EthCall.EthCall-1.md)[]

#### Defined in

[src/ethcall/selectors/selectByFilter.ts:9](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/selectors/selectByFilter.ts#L9)

---

### selectByIdExists

▸ **selectByIdExists**(`state`, `id`): `boolean`

#### Parameters

| Name    | Type                                                             |
| :------ | :--------------------------------------------------------------- |
| `state` | `any`                                                            |
| `id`    | `undefined` \| [`EthCallId`](../interfaces/EthCall.EthCallId.md) |

#### Returns

`boolean`

#### Defined in

[src/ethcall/selectors/selectByIdExists.ts:5](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/selectors/selectByIdExists.ts#L5)

---

### selectByIdMany

▸ **selectByIdMany**(`state`, `ids?`): ([`EthCall`](../interfaces/EthCall.EthCall-1.md) \| `null`)[]

#### Parameters

| Name    | Type                                                |
| :------ | :-------------------------------------------------- |
| `state` | `any`                                               |
| `ids?`  | [`EthCallId`](../interfaces/EthCall.EthCallId.md)[] |

#### Returns

([`EthCall`](../interfaces/EthCall.EthCall-1.md) \| `null`)[]

#### Defined in

[src/ethcall/selectors/selectByIdMany.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/selectors/selectByIdMany.ts#L6)

---

### selectByIdSingle

▸ **selectByIdSingle**(`state`, `id`): [`EthCall`](../interfaces/EthCall.EthCall-1.md) \| `undefined`

#### Parameters

| Name    | Type                                                                         |
| :------ | :--------------------------------------------------------------------------- |
| `state` | `any`                                                                        |
| `id`    | `undefined` \| `string` \| [`EthCallId`](../interfaces/EthCall.EthCallId.md) |

#### Returns

[`EthCall`](../interfaces/EthCall.EthCall-1.md) \| `undefined`

#### Defined in

[src/ethcall/selectors/selectByIdSingle.ts:5](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/selectors/selectByIdSingle.ts#L5)
