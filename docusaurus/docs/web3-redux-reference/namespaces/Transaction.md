---
id: 'Transaction'
title: 'Namespace: Transaction'
sidebar_label: 'Transaction'
sidebar_position: 0
custom_edit_url: null
---

EVM transaction data module.

## Interfaces

-   [Transaction](../interfaces/Transaction.Transaction-1.md)
-   [TransactionId](../interfaces/Transaction.TransactionId.md)

## Actions Variables

-   [create](Transaction.md#create)
-   [fetch](Transaction.md#fetch)
-   [remove](Transaction.md#remove)
-   [update](Transaction.md#update)

## Other Variables

-   [CREATE](Transaction.md#create)
-   [FETCH](Transaction.md#fetch)
-   [REMOVE](Transaction.md#remove)
-   [UPDATE](Transaction.md#update)

## Actions Functions

-   [set](Transaction.md#set)

## Other Functions

-   [SET](Transaction.md#set)
-   [getId](Transaction.md#getid)
-   [isAction](Transaction.md#isaction)
-   [isCreateAction](Transaction.md#iscreateaction)
-   [isFetchAction](Transaction.md#isfetchaction)
-   [isReducerAction](Transaction.md#isreduceraction)
-   [isRemoveAction](Transaction.md#isremoveaction)
-   [isSagaAction](Transaction.md#issagaaction)
-   [isSetAction](Transaction.md#issetaction)
-   [isUpdateAction](Transaction.md#isupdateaction)
-   [validate](Transaction.md#validate)

## Selectors Functions

-   [reducer](Transaction.md#reducer)
-   [selectByFilter](Transaction.md#selectbyfilter)
-   [selectByIdMany](Transaction.md#selectbyidmany)
-   [selectByIdSingle](Transaction.md#selectbyidsingle)

## References

### getTransactionId

Renames and re-exports [getId](Transaction.md#getid)

---

### validateTransaction

Renames and re-exports [validate](Transaction.md#validate)

## Type aliases

### Action

Ƭ **Action**: [`ReducerAction`](Transaction.md#reduceraction)

#### Defined in

[src/transaction/actions/index.ts:17](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/index.ts#L17)

---

### CreateAction

Ƭ **CreateAction**: `ReturnType`<typeof [`create`](Transaction.md#create)\>

**`internal`**

#### Defined in

[src/transaction/actions/create.ts:13](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/create.ts#L13)

---

### FetchAction

Ƭ **FetchAction**: `ReturnType`<typeof [`fetch`](Transaction.md#fetch)\>

**`internal`**

#### Defined in

[src/transaction/actions/fetch.ts:11](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/fetch.ts#L11)

---

### ReducerAction

Ƭ **ReducerAction**: [`CreateAction`](Transaction.md#createaction) \| [`RemoveAction`](Transaction.md#removeaction) \| [`UpdateAction`](Transaction.md#updateaction) \| [`SetAction`](Transaction.md#setaction)

#### Defined in

[src/transaction/actions/index.ts:7](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/index.ts#L7)

---

### RemoveAction

Ƭ **RemoveAction**: `ReturnType`<typeof [`remove`](Transaction.md#remove)\>

**`internal`**

#### Defined in

[src/transaction/actions/remove.ts:13](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/remove.ts#L13)

---

### SagaAction

Ƭ **SagaAction**: [`FetchAction`](Transaction.md#fetchaction)

#### Defined in

[src/transaction/actions/index.ts:12](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/index.ts#L12)

---

### SetAction

Ƭ **SetAction**: `ReturnType`<typeof [`set`](Transaction.md#set)\>

**`internal`**

#### Defined in

[src/transaction/actions/set.ts:21](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/set.ts#L21)

---

### UpdateAction

Ƭ **UpdateAction**: `ReturnType`<typeof [`update`](Transaction.md#update)\>

**`internal`**

#### Defined in

[src/transaction/actions/update.ts:13](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/update.ts#L13)

## Actions Variables

### create

• **create**: `ActionCreatorWithPreparedPayload`<[payload: Transaction], `ModelWithId`<[`Transaction`](../interfaces/Transaction.Transaction-1.md)\>, `string`, `never`, `never`\>

#### Defined in

[src/transaction/actions/create.ts:8](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/create.ts#L8)

---

### fetch

• **fetch**: `ActionCreatorWithPayload`<[`TransactionId`](../interfaces/Transaction.TransactionId.md), `string`\>

#### Defined in

[src/transaction/actions/fetch.ts:8](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/fetch.ts#L8)

---

### remove

• **remove**: `ActionCreatorWithPreparedPayload`<[payload: TransactionId], [`TransactionId`](../interfaces/Transaction.TransactionId.md), `string`, `never`, `never`\>

#### Defined in

[src/transaction/actions/remove.ts:8](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/remove.ts#L8)

---

### update

• **update**: `ActionCreatorWithPreparedPayload`<[payload: Transaction], `ModelWithId`<[`Transaction`](../interfaces/Transaction.Transaction-1.md)\>, `string`, `never`, `never`\>

#### Defined in

[src/transaction/actions/update.ts:8](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/update.ts#L8)

---

## Other Variables

### CREATE

• **CREATE**: `string`

**`internal`**

#### Defined in

[src/transaction/actions/create.ts:6](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/create.ts#L6)

---

### FETCH

• **FETCH**: `string`

**`internal`**

#### Defined in

[src/transaction/actions/fetch.ts:6](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/fetch.ts#L6)

---

### REMOVE

• **REMOVE**: `string`

**`internal`**

#### Defined in

[src/transaction/actions/remove.ts:6](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/remove.ts#L6)

---

### UPDATE

• **UPDATE**: `string`

**`internal`**

#### Defined in

[src/transaction/actions/update.ts:6](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/update.ts#L6)

## Actions Functions

### set

▸ `Const` **set**(`payload`): `Object`

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `payload` | `SetActionInput` |

#### Returns

`Object`

| Name            | Type                                                                                                           |
| :-------------- | :------------------------------------------------------------------------------------------------------------- |
| `payload`       | { `id`: `string` ; `key`: keyof [`Transaction`](../interfaces/Transaction.Transaction-1.md) ; `value`: `any` } |
| `payload.id`    | `string`                                                                                                       |
| `payload.key`   | keyof [`Transaction`](../interfaces/Transaction.Transaction-1.md)                                              |
| `payload.value` | `any`                                                                                                          |
| `type`          | `string`                                                                                                       |

#### Defined in

[src/transaction/actions/set.ts:13](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/set.ts#L13)

---

## Other Functions

### SET

▸ `Const` **SET**(`key`): `string`

**`internal`**

#### Parameters

| Name  | Type                                                              |
| :---- | :---------------------------------------------------------------- |
| `key` | keyof [`Transaction`](../interfaces/Transaction.Transaction-1.md) |

#### Returns

`string`

#### Defined in

[src/transaction/actions/set.ts:5](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/set.ts#L5)

---

### getId

▸ **getId**(`id`): `string`

**`internal`**

#### Parameters

| Name | Type                                                          |
| :--- | :------------------------------------------------------------ |
| `id` | [`TransactionId`](../interfaces/Transaction.TransactionId.md) |

#### Returns

`string`

#### Defined in

[src/transaction/model/interface.ts:85](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/model/interface.ts#L85)

---

### isAction

▸ **isAction**(`action`): action is ReducerAction

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `action`      | `Object` |
| `action.type` | `string` |

#### Returns

action is ReducerAction

#### Defined in

[src/transaction/actions/index.ts:18](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/index.ts#L18)

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

[src/transaction/actions/create.ts:15](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/create.ts#L15)

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

[src/transaction/actions/fetch.ts:13](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/fetch.ts#L13)

---

### isReducerAction

▸ **isReducerAction**(`action`): action is ReducerAction

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `action`      | `Object` |
| `action.type` | `string` |

#### Returns

action is ReducerAction

#### Defined in

[src/transaction/actions/index.ts:8](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/index.ts#L8)

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

[src/transaction/actions/remove.ts:15](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/remove.ts#L15)

---

### isSagaAction

▸ **isSagaAction**(`action`): action is Object

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `action`      | `Object` |
| `action.type` | `string` |

#### Returns

action is Object

#### Defined in

[src/transaction/actions/index.ts:13](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/index.ts#L13)

---

### isSetAction

▸ `Const` **isSetAction**(`action`): `boolean`

**`internal`**

#### Parameters

| Name                  | Type                                                              |
| :-------------------- | :---------------------------------------------------------------- |
| `action`              | `Object`                                                          |
| `action.payload?`     | `Object`                                                          |
| `action.payload.key?` | keyof [`Transaction`](../interfaces/Transaction.Transaction-1.md) |
| `action.type`         | `string`                                                          |

#### Returns

`boolean`

#### Defined in

[src/transaction/actions/set.ts:23](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/set.ts#L23)

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

[src/transaction/actions/update.ts:15](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/actions/update.ts#L15)

---

### validate

▸ **validate**(`item`): `ModelWithId`<[`Transaction`](../interfaces/Transaction.Transaction-1.md)\>

**`internal`**

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `item` | [`Transaction`](../interfaces/Transaction.Transaction-1.md) |

#### Returns

`ModelWithId`<[`Transaction`](../interfaces/Transaction.Transaction-1.md)\>

#### Defined in

[src/transaction/model/interface.ts:90](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/model/interface.ts#L90)

---

## Selectors Functions

### reducer

▸ **reducer**(`sess`, `action`): `any`

#### Parameters

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `sess`   | `any`                                           |
| `action` | [`ReducerAction`](Transaction.md#reduceraction) |

#### Returns

`any`

#### Defined in

[src/transaction/reducer.ts:6](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/reducer.ts#L6)

---

### selectByFilter

▸ `Const` **selectByFilter**(`state`, `filter?`): [`Transaction`](../interfaces/Transaction.Transaction-1.md)[]

#### Parameters

| Name      | Type                                                                    |
| :-------- | :---------------------------------------------------------------------- |
| `state`   | `any`                                                                   |
| `filter?` | `Partial`<[`Transaction`](../interfaces/Transaction.Transaction-1.md)\> |

#### Returns

[`Transaction`](../interfaces/Transaction.Transaction-1.md)[]

#### Defined in

[src/transaction/selectors/selectByFilter.ts:10](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/selectors/selectByFilter.ts#L10)

---

### selectByIdMany

▸ **selectByIdMany**(`state`, `ids?`): ([`Transaction`](../interfaces/Transaction.Transaction-1.md) \| `null`)[]

#### Parameters

| Name    | Type                                                            |
| :------ | :-------------------------------------------------------------- |
| `state` | `any`                                                           |
| `ids?`  | [`TransactionId`](../interfaces/Transaction.TransactionId.md)[] |

#### Returns

([`Transaction`](../interfaces/Transaction.Transaction-1.md) \| `null`)[]

#### Defined in

[src/transaction/selectors/selectByIdMany.ts:6](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/selectors/selectByIdMany.ts#L6)

---

### selectByIdSingle

▸ **selectByIdSingle**(`state`, `id`): [`Transaction`](../interfaces/Transaction.Transaction-1.md) \| `undefined`

#### Parameters

| Name    | Type                                                                         |
| :------ | :--------------------------------------------------------------------------- |
| `state` | `any`                                                                        |
| `id`    | `undefined` \| [`TransactionId`](../interfaces/Transaction.TransactionId.md) |

#### Returns

[`Transaction`](../interfaces/Transaction.Transaction-1.md) \| `undefined`

#### Defined in

[src/transaction/selectors/selectByIdSingle.ts:5](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/transaction/selectors/selectByIdSingle.ts#L5)
