---
id: 'Block'
title: 'Namespace: Block'
sidebar_label: 'Block'
sidebar_position: 0
custom_edit_url: null
---

Comments on Block module

## Interfaces

-   [BlockHeader](../interfaces/Block.BlockHeader.md)
-   [BlockId](../interfaces/Block.BlockId.md)
-   [BlockTransaction](../interfaces/Block.BlockTransaction.md)

## Actions Variables

-   [create](Block.md#create)
-   [fetch](Block.md#fetch)
-   [remove](Block.md#remove)
-   [subscribe](Block.md#subscribe)
-   [unsubscribe](Block.md#unsubscribe)
-   [update](Block.md#update)

## Other Variables

-   [CREATE](Block.md#create)
-   [FETCH](Block.md#fetch)
-   [REMOVE](Block.md#remove)
-   [SUBSCRIBE](Block.md#subscribe)
-   [UNSUBSCRIBE](Block.md#unsubscribe)
-   [UPDATE](Block.md#update)

## Actions Functions

-   [set](Block.md#set)

## Hooks Functions

-   [useBlock](Block.md#useblock)
-   [useBlockSync](Block.md#useblocksync)

## Other Functions

-   [SET](Block.md#set)
-   [getId](Block.md#getid)
-   [getIdDeconstructed](Block.md#getiddeconstructed)
-   [isAction](Block.md#isaction)
-   [isCreateAction](Block.md#iscreateaction)
-   [isFetchAction](Block.md#isfetchaction)
-   [isReducerAction](Block.md#isreduceraction)
-   [isRemoveAction](Block.md#isremoveaction)
-   [isSagaAction](Block.md#issagaaction)
-   [isSetAction](Block.md#issetaction)
-   [isSubscribeAction](Block.md#issubscribeaction)
-   [isUnsubscribeAction](Block.md#isunsubscribeaction)
-   [isUpdateAction](Block.md#isupdateaction)
-   [reducer](Block.md#reducer)
-   [saga](Block.md#saga)
-   [validate](Block.md#validate)

## Selectors Functions

-   [selectByFilter](Block.md#selectbyfilter)
-   [selectByIdMany](Block.md#selectbyidmany)
-   [selectByIdSingle](Block.md#selectbyidsingle)

## References

### getBlockId

Renames and re-exports [getId](Block.md#getid)

---

### validateBlock

Renames and re-exports [validate](Block.md#validate)

## Type aliases

### Action

Ƭ **Action**: [`ReducerAction`](Block.md#reduceraction) \| [`SagaAction`](Block.md#sagaaction)

**`internal`**

#### Defined in

[src/block/actions/index.ts:24](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/index.ts#L24)

---

### CreateAction

Ƭ **CreateAction**: `ReturnType`<typeof [`create`](Block.md#create)\>

**`internal`**

#### Defined in

[src/block/actions/create.ts:12](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/create.ts#L12)

---

### FetchAction

Ƭ **FetchAction**: `ReturnType`<typeof [`fetch`](Block.md#fetch)\>

**`internal`**

#### Defined in

[src/block/actions/fetch.ts:22](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/fetch.ts#L22)

---

### ReducerAction

Ƭ **ReducerAction**: [`CreateAction`](Block.md#createaction) \| [`RemoveAction`](Block.md#removeaction) \| [`UpdateAction`](Block.md#updateaction) \| [`SetAction`](Block.md#setaction)

**`internal`**

#### Defined in

[src/block/actions/index.ts:10](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/index.ts#L10)

---

### RemoveAction

Ƭ **RemoveAction**: `ReturnType`<typeof [`remove`](Block.md#remove)\>

**`internal`**

#### Defined in

[src/block/actions/remove.ts:10](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/remove.ts#L10)

---

### SagaAction

Ƭ **SagaAction**: [`FetchAction`](Block.md#fetchaction) \| `SubscribeAction` \| `UnsubscribeAction`

**`internal`**

#### Defined in

[src/block/actions/index.ts:17](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/index.ts#L17)

---

### SetAction

Ƭ **SetAction**: `ReturnType`<typeof [`set`](Block.md#set)\>

**`internal`**

#### Defined in

[src/block/actions/set.ts:21](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/set.ts#L21)

---

### UpdateAction

Ƭ **UpdateAction**: `ReturnType`<typeof [`update`](Block.md#update)\>

**`internal`**

#### Defined in

[src/block/actions/update.ts:12](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/update.ts#L12)

## Actions Variables

### create

• **create**: `ActionCreatorWithPreparedPayload`<[payload: BlockHeader], `ModelWithId`<[`BlockTransaction`](../interfaces/Block.BlockTransaction.md)\>, `string`, `never`, `never`\>

#### Defined in

[src/block/actions/create.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/create.ts#L8)

---

### fetch

• **fetch**: `ActionCreatorWithPayload`<`FetchActionInput`, `string`\>

#### Defined in

[src/block/actions/fetch.ts:19](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/fetch.ts#L19)

---

### remove

• **remove**: `ActionCreatorWithPayload`<[`BlockId`](../interfaces/Block.BlockId.md), `string`\>

#### Defined in

[src/block/actions/remove.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/remove.ts#L8)

---

### subscribe

• **subscribe**: `ActionCreatorWithPayload`<`SubscribeActionInput`, `string`\>

#### Defined in

[src/block/actions/subscribe.ts:18](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/subscribe.ts#L18)

---

### unsubscribe

• **unsubscribe**: `ActionCreatorWithPayload`<`string`, `string`\>

#### Defined in

[src/block/actions/unsubscribe.ts:7](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/unsubscribe.ts#L7)

---

### update

• **update**: `ActionCreatorWithPreparedPayload`<[payload: BlockHeader], `ModelWithId`<[`BlockTransaction`](../interfaces/Block.BlockTransaction.md)\>, `string`, `never`, `never`\>

#### Defined in

[src/block/actions/update.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/update.ts#L8)

---

## Other Variables

### CREATE

• **CREATE**: `string`

**`internal`**

#### Defined in

[src/block/actions/create.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/create.ts#L6)

---

### FETCH

• **FETCH**: `string`

**`internal`**

#### Defined in

[src/block/actions/fetch.ts:5](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/fetch.ts#L5)

---

### REMOVE

• **REMOVE**: `string`

**`internal`**

#### Defined in

[src/block/actions/remove.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/remove.ts#L6)

---

### SUBSCRIBE

• **SUBSCRIBE**: `string`

**`internal`**

#### Defined in

[src/block/actions/subscribe.ts:5](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/subscribe.ts#L5)

---

### UNSUBSCRIBE

• **UNSUBSCRIBE**: `string`

**`internal`**

#### Defined in

[src/block/actions/unsubscribe.ts:5](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/unsubscribe.ts#L5)

---

### UPDATE

• **UPDATE**: `string`

**`internal`**

#### Defined in

[src/block/actions/update.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/update.ts#L6)

## Actions Functions

### set

▸ `Const` **set**(`payload`): `Object`

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `payload` | `SetActionInput` |

#### Returns

`Object`

| Name            | Type                                                                                                                                      |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`       | { `id`: [`BlockId`](../interfaces/Block.BlockId.md) ; `key`: keyof [`BlockHeader`](../interfaces/Block.BlockHeader.md) ; `value`: `any` } |
| `payload.id`    | [`BlockId`](../interfaces/Block.BlockId.md)                                                                                               |
| `payload.key`   | keyof [`BlockHeader`](../interfaces/Block.BlockHeader.md)                                                                                 |
| `payload.value` | `any`                                                                                                                                     |
| `type`          | `string`                                                                                                                                  |

#### Defined in

[src/block/actions/set.ts:14](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/set.ts#L14)

---

## Hooks Functions

### useBlock

▸ `Const` **useBlock**(`networkId`, `number`, `fetch?`, `returnTransactionObjects?`): `undefined` \| [`BlockTransaction`](../interfaces/Block.BlockTransaction.md)

Reads block from store and makes a call to fetch block.

#### Parameters

| Name                       | Type                    | Default value |
| :------------------------- | :---------------------- | :------------ |
| `networkId`                | `undefined` \| `string` | `undefined`   |
| `number`                   | `undefined` \| `number` | `undefined`   |
| `fetch`                    | `boolean` \| `"ifnull"` | `undefined`   |
| `returnTransactionObjects` | `boolean`               | `false`       |

#### Returns

`undefined` \| [`BlockTransaction`](../interfaces/Block.BlockTransaction.md)

#### Defined in

[src/block/hooks/useBlock.ts:11](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/hooks/useBlock.ts#L11)

---

### useBlockSync

▸ `Const` **useBlockSync**(`networkId`, `returnTransactionObjects?`): (`undefined` \| [`BlockHeader`](../interfaces/Block.BlockHeader.md)[] \| { `subscribe`: () => `void` ; `unsubscribe`: () => `void` })[]

Reads blocks for network and syncs data with a block subscription.

#### Parameters

| Name                       | Type                    | Default value |
| :------------------------- | :---------------------- | :------------ |
| `networkId`                | `undefined` \| `string` | `undefined`   |
| `returnTransactionObjects` | `boolean`               | `false`       |

#### Returns

(`undefined` \| [`BlockHeader`](../interfaces/Block.BlockHeader.md)[] \| { `subscribe`: () => `void` ; `unsubscribe`: () => `void` })[]

#### Defined in

[src/block/hooks/useBlockSync.ts:10](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/hooks/useBlockSync.ts#L10)

---

## Other Functions

### SET

▸ `Const` **SET**(`key`): `string`

**`internal`**

#### Parameters

| Name  | Type                                                      |
| :---- | :-------------------------------------------------------- |
| `key` | keyof [`BlockHeader`](../interfaces/Block.BlockHeader.md) |

#### Returns

`string`

#### Defined in

[src/block/actions/set.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/set.ts#L6)

---

### getId

▸ **getId**(`id`): `string`

**`internal`**

#### Parameters

| Name | Type                                        |
| :--- | :------------------------------------------ |
| `id` | [`BlockId`](../interfaces/Block.BlockId.md) |

#### Returns

`string`

#### Defined in

[src/block/model/id.ts:11](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/id.ts#L11)

---

### getIdDeconstructed

▸ **getIdDeconstructed**(`id`): [`BlockId`](../interfaces/Block.BlockId.md)

**`internal`**

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

[`BlockId`](../interfaces/Block.BlockId.md)

#### Defined in

[src/block/model/id.ts:18](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/id.ts#L18)

---

### isAction

▸ **isAction**(`action`): action is Action

**`internal`**

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `action`      | `Object` |
| `action.type` | `string` |

#### Returns

action is Action

#### Defined in

[src/block/actions/index.ts:26](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/index.ts#L26)

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

[src/block/actions/create.ts:14](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/create.ts#L14)

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

[src/block/actions/fetch.ts:24](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/fetch.ts#L24)

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

[src/block/actions/index.ts:12](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/index.ts#L12)

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

[src/block/actions/remove.ts:12](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/remove.ts#L12)

---

### isSagaAction

▸ **isSagaAction**(`action`): action is SagaAction

**`internal`**

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `action`      | `Object` |
| `action.type` | `string` |

#### Returns

action is SagaAction

#### Defined in

[src/block/actions/index.ts:19](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/index.ts#L19)

---

### isSetAction

▸ `Const` **isSetAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name                  | Type                                                      |
| :-------------------- | :-------------------------------------------------------- |
| `action`              | `Object`                                                  |
| `action.payload?`     | `Object`                                                  |
| `action.payload.key?` | keyof [`BlockHeader`](../interfaces/Block.BlockHeader.md) |
| `action.type`         | `string`                                                  |

#### Returns

action is Object

#### Defined in

[src/block/actions/set.ts:23](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/set.ts#L23)

---

### isSubscribeAction

▸ `Const` **isSubscribeAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/block/actions/subscribe.ts:22](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/subscribe.ts#L22)

---

### isUnsubscribeAction

▸ `Const` **isUnsubscribeAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/block/actions/unsubscribe.ts:11](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/unsubscribe.ts#L11)

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

[src/block/actions/update.ts:14](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/actions/update.ts#L14)

---

### reducer

▸ **reducer**(`sess`, `action`): `any`

**`internal`**

#### Parameters

| Name     | Type                                      |
| :------- | :---------------------------------------- |
| `sess`   | `any`                                     |
| `action` | [`ReducerAction`](Block.md#reduceraction) |

#### Returns

`any`

#### Defined in

[src/block/reducer.ts:9](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/reducer.ts#L9)

---

### saga

▸ **saga**(): `Generator`<`AllEffect`<`SagaGenerator`<`FixedTask`<`void`\>, `ForkEffect`<`void`\>\>\>, `void`, `unknown`\>

**`internal`**

#### Returns

`Generator`<`AllEffect`<`SagaGenerator`<`FixedTask`<`void`\>, `ForkEffect`<`void`\>\>\>, `void`, `unknown`\>

#### Defined in

[src/block/sagas/index.ts:7](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/sagas/index.ts#L7)

---

### validate

▸ **validate**(`item`): `ModelWithId`<[`BlockTransaction`](../interfaces/Block.BlockTransaction.md)\>

**`internal`**

#### Parameters

| Name   | Type                                                          |
| :----- | :------------------------------------------------------------ |
| `item` | [`BlockTransaction`](../interfaces/Block.BlockTransaction.md) |

#### Returns

`ModelWithId`<[`BlockTransaction`](../interfaces/Block.BlockTransaction.md)\>

#### Defined in

[src/block/model/interface.ts:9](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/interface.ts#L9)

---

## Selectors Functions

### selectByFilter

▸ `Const` **selectByFilter**(`state`, `filter`): [`BlockHeader`](../interfaces/Block.BlockHeader.md)[]

#### Parameters

| Name     | Type                                                                           |
| :------- | :----------------------------------------------------------------------------- |
| `state`  | `any`                                                                          |
| `filter` | `undefined` \| `Partial`<[`BlockHeader`](../interfaces/Block.BlockHeader.md)\> |

#### Returns

[`BlockHeader`](../interfaces/Block.BlockHeader.md)[]

#### Defined in

[src/block/selectors/selectByFilter.ts:10](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/selectors/selectByFilter.ts#L10)

---

### selectByIdMany

▸ **selectByIdMany**(`state`, `ids?`): ([`BlockTransaction`](../interfaces/Block.BlockTransaction.md) \| `undefined`)[]

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `state` | `any`                                         |
| `ids?`  | [`BlockId`](../interfaces/Block.BlockId.md)[] |

#### Returns

([`BlockTransaction`](../interfaces/Block.BlockTransaction.md) \| `undefined`)[]

#### Defined in

[src/block/selectors/selectByIdMany.ts:7](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/selectors/selectByIdMany.ts#L7)

---

### selectByIdSingle

▸ **selectByIdSingle**(`state`, `id`): [`BlockTransaction`](../interfaces/Block.BlockTransaction.md) \| `undefined`

#### Parameters

| Name    | Type                                                       |
| :------ | :--------------------------------------------------------- |
| `state` | `any`                                                      |
| `id`    | `undefined` \| [`BlockId`](../interfaces/Block.BlockId.md) |

#### Returns

[`BlockTransaction`](../interfaces/Block.BlockTransaction.md) \| `undefined`

#### Defined in

[src/block/selectors/selectByIdSingle.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/selectors/selectByIdSingle.ts#L6)
