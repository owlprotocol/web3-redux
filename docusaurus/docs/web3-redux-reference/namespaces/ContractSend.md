---
id: 'ContractSend'
title: 'Namespace: ContractSend'
sidebar_label: 'ContractSend'
sidebar_position: 0
custom_edit_url: null
---

Comments on ContractSend module

## Enumerations

-   [ContractSendStatus](../enums/ContractSend.ContractSendStatus.md)

## Interfaces

-   [ContractSend](../interfaces/ContractSend.ContractSend-1.md)
-   [ContractSendId](../interfaces/ContractSend.ContractSendId.md)

## Actions Variables

-   [create](ContractSend.md#create)
-   [remove](ContractSend.md#remove)
-   [update](ContractSend.md#update)

## Other Variables

-   [CREATE](ContractSend.md#create)
-   [REMOVE](ContractSend.md#remove)
-   [UPDATE](ContractSend.md#update)

## Actions Functions

-   [set](ContractSend.md#set)

## Other Functions

-   [SET](ContractSend.md#set)
-   [getId](ContractSend.md#getid)
-   [isAction](ContractSend.md#isaction)
-   [isCreateAction](ContractSend.md#iscreateaction)
-   [isReducerAction](ContractSend.md#isreduceraction)
-   [isRemoveAction](ContractSend.md#isremoveaction)
-   [isSetAction](ContractSend.md#issetaction)
-   [isUpdateAction](ContractSend.md#isupdateaction)
-   [reducer](ContractSend.md#reducer)
-   [validate](ContractSend.md#validate)

## Selectors Functions

-   [selectByFilter](ContractSend.md#selectbyfilter)
-   [selectByIdExists](ContractSend.md#selectbyidexists)
-   [selectByIdMany](ContractSend.md#selectbyidmany)
-   [selectByIdSingle](ContractSend.md#selectbyidsingle)

## References

### getContractSendId

Renames and re-exports [getId](ContractSend.md#getid)

---

### validateContractSend

Renames and re-exports [validate](ContractSend.md#validate)

## Type aliases

### Action

Ƭ **Action**: [`ReducerAction`](ContractSend.md#reduceraction)

**`internal`**

#### Defined in

[src/contractsend/actions/index.ts:14](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/index.ts#L14)

---

### CreateAction

Ƭ **CreateAction**: `ReturnType`<typeof [`create`](ContractSend.md#create)\>

**`internal`**

#### Defined in

[src/contractsend/actions/create.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/create.ts#L13)

---

### ReducerAction

Ƭ **ReducerAction**: [`CreateAction`](ContractSend.md#createaction) \| [`RemoveAction`](ContractSend.md#removeaction) \| [`UpdateAction`](ContractSend.md#updateaction) \| [`SetAction`](ContractSend.md#setaction)

**`internal`**

#### Defined in

[src/contractsend/actions/index.ts:7](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/index.ts#L7)

---

### RemoveAction

Ƭ **RemoveAction**: `ReturnType`<typeof [`remove`](ContractSend.md#remove)\>

**`internal`**

#### Defined in

[src/contractsend/actions/remove.ts:11](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/remove.ts#L11)

---

### SetAction

Ƭ **SetAction**: `ReturnType`<typeof [`set`](ContractSend.md#set)\>

**`internal`**

#### Defined in

[src/contractsend/actions/set.ts:21](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/set.ts#L21)

---

### UpdateAction

Ƭ **UpdateAction**: `ReturnType`<typeof [`update`](ContractSend.md#update)\>

**`internal`**

#### Defined in

[src/contractsend/actions/update.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/update.ts#L13)

## Actions Variables

### create

• **create**: `ActionCreatorWithPreparedPayload`<[payload: ContractSend], `ModelWithId`<[`ContractSend`](../interfaces/ContractSend.ContractSend-1.md)\>, `string`, `never`, `never`\>

#### Defined in

[src/contractsend/actions/create.ts:8](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/create.ts#L8)

---

### remove

• **remove**: `ActionCreatorWithPayload`<[`ContractSendId`](../interfaces/ContractSend.ContractSendId.md), `string`\>

#### Defined in

[src/contractsend/actions/remove.ts:8](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/remove.ts#L8)

---

### update

• **update**: `ActionCreatorWithPreparedPayload`<[payload: ContractSend], `ModelWithId`<[`ContractSend`](../interfaces/ContractSend.ContractSend-1.md)\>, `string`, `never`, `never`\>

#### Defined in

[src/contractsend/actions/update.ts:8](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/update.ts#L8)

---

## Other Variables

### CREATE

• **CREATE**: `string`

**`internal`**

#### Defined in

[src/contractsend/actions/create.ts:6](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/create.ts#L6)

---

### REMOVE

• **REMOVE**: `string`

**`internal`**

#### Defined in

[src/contractsend/actions/remove.ts:6](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/remove.ts#L6)

---

### UPDATE

• **UPDATE**: `string`

**`internal`**

#### Defined in

[src/contractsend/actions/update.ts:6](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/update.ts#L6)

## Actions Functions

### set

▸ `Const` **set**(`payload`): `Object`

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `payload` | `SetActionInput` |

#### Returns

`Object`

| Name            | Type                                                                                                              |
| :-------------- | :---------------------------------------------------------------------------------------------------------------- |
| `payload`       | { `id`: `string` ; `key`: keyof [`ContractSend`](../interfaces/ContractSend.ContractSend-1.md) ; `value`: `any` } |
| `payload.id`    | `string`                                                                                                          |
| `payload.key`   | keyof [`ContractSend`](../interfaces/ContractSend.ContractSend-1.md)                                              |
| `payload.value` | `any`                                                                                                             |
| `type`          | `string`                                                                                                          |

#### Defined in

[src/contractsend/actions/set.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/set.ts#L13)

---

## Other Functions

### SET

▸ `Const` **SET**(`key`): `string`

**`internal`**

#### Parameters

| Name  | Type                                                                 |
| :---- | :------------------------------------------------------------------- |
| `key` | keyof [`ContractSend`](../interfaces/ContractSend.ContractSend-1.md) |

#### Returns

`string`

#### Defined in

[src/contractsend/actions/set.ts:5](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/set.ts#L5)

---

### getId

▸ **getId**(`id`): `string`

**`internal`**

#### Parameters

| Name | Type                                                             |
| :--- | :--------------------------------------------------------------- |
| `id` | [`ContractSendId`](../interfaces/ContractSend.ContractSendId.md) |

#### Returns

`string`

#### Defined in

[src/contractsend/model/interface.ts:83](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/model/interface.ts#L83)

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

[src/contractsend/actions/index.ts:16](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/index.ts#L16)

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

[src/contractsend/actions/create.ts:15](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/create.ts#L15)

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

[src/contractsend/actions/index.ts:9](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/index.ts#L9)

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

[src/contractsend/actions/remove.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/remove.ts#L13)

---

### isSetAction

▸ `Const` **isSetAction**(`action`): `boolean`

**`internal`**

#### Parameters

| Name                  | Type                                                                 |
| :-------------------- | :------------------------------------------------------------------- |
| `action`              | `Object`                                                             |
| `action.payload?`     | `Object`                                                             |
| `action.payload.key?` | keyof [`ContractSend`](../interfaces/ContractSend.ContractSend-1.md) |
| `action.type`         | `string`                                                             |

#### Returns

`boolean`

#### Defined in

[src/contractsend/actions/set.ts:23](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/set.ts#L23)

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

[src/contractsend/actions/update.ts:15](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/actions/update.ts#L15)

---

### reducer

▸ **reducer**(`sess`, `action`): `any`

**`internal`**

#### Parameters

| Name     | Type                                             |
| :------- | :----------------------------------------------- |
| `sess`   | `any`                                            |
| `action` | [`ReducerAction`](ContractSend.md#reduceraction) |

#### Returns

`any`

#### Defined in

[src/contractsend/reducer.ts:7](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/reducer.ts#L7)

---

### validate

▸ **validate**(`item`): `ModelWithId`<[`ContractSend`](../interfaces/ContractSend.ContractSend-1.md)\>

**`internal`**

#### Parameters

| Name   | Type                                                           |
| :----- | :------------------------------------------------------------- |
| `item` | [`ContractSend`](../interfaces/ContractSend.ContractSend-1.md) |

#### Returns

`ModelWithId`<[`ContractSend`](../interfaces/ContractSend.ContractSend-1.md)\>

#### Defined in

[src/contractsend/model/interface.ts:97](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/model/interface.ts#L97)

---

## Selectors Functions

### selectByFilter

▸ `Const` **selectByFilter**(`state`, `filter`): [`ContractSend`](../interfaces/ContractSend.ContractSend-1.md)[]

#### Parameters

| Name     | Type                                                                                      |
| :------- | :---------------------------------------------------------------------------------------- |
| `state`  | `any`                                                                                     |
| `filter` | `undefined` \| `Partial`<[`ContractSend`](../interfaces/ContractSend.ContractSend-1.md)\> |

#### Returns

[`ContractSend`](../interfaces/ContractSend.ContractSend-1.md)[]

#### Defined in

[src/contractsend/selectors/selectByFilter.ts:9](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/selectors/selectByFilter.ts#L9)

---

### selectByIdExists

▸ **selectByIdExists**(`state`, `id`): `boolean`

#### Parameters

| Name    | Type                                                                            |
| :------ | :------------------------------------------------------------------------------ |
| `state` | `any`                                                                           |
| `id`    | `undefined` \| [`ContractSendId`](../interfaces/ContractSend.ContractSendId.md) |

#### Returns

`boolean`

#### Defined in

[src/contractsend/selectors/selectByIdExists.ts:5](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/selectors/selectByIdExists.ts#L5)

---

### selectByIdMany

▸ **selectByIdMany**(`state`, `ids?`): ([`ContractSend`](../interfaces/ContractSend.ContractSend-1.md) \| `null`)[]

#### Parameters

| Name    | Type                                                               |
| :------ | :----------------------------------------------------------------- |
| `state` | `any`                                                              |
| `ids?`  | [`ContractSendId`](../interfaces/ContractSend.ContractSendId.md)[] |

#### Returns

([`ContractSend`](../interfaces/ContractSend.ContractSend-1.md) \| `null`)[]

#### Defined in

[src/contractsend/selectors/selectByIdMany.ts:6](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/selectors/selectByIdMany.ts#L6)

---

### selectByIdSingle

▸ **selectByIdSingle**(`state`, `id`): [`ContractSend`](../interfaces/ContractSend.ContractSend-1.md) \| `undefined`

#### Parameters

| Name    | Type                                                                            |
| :------ | :------------------------------------------------------------------------------ |
| `state` | `any`                                                                           |
| `id`    | `undefined` \| [`ContractSendId`](../interfaces/ContractSend.ContractSendId.md) |

#### Returns

[`ContractSend`](../interfaces/ContractSend.ContractSend-1.md) \| `undefined`

#### Defined in

[src/contractsend/selectors/selectByIdSingle.ts:5](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contractsend/selectors/selectByIdSingle.ts#L5)
