---
id: 'Network'
title: 'Namespace: Network'
sidebar_label: 'Network'
sidebar_position: 0
custom_edit_url: null
---

Comments on Network module

## Interfaces

-   [Network](../interfaces/Network.Network-1.md)

## Actions Variables

-   [create](Network.md#create)
-   [getBlockNumber](Network.md#getblocknumber)
-   [getChainId](Network.md#getchainid)
-   [remove](Network.md#remove)
-   [update](Network.md#update)

## Other Variables

-   [CREATE](Network.md#create)
-   [GET_BLOCK_NUMBER](Network.md#get_block_number)
-   [GET_CHAIN_ID](Network.md#get_chain_id)
-   [REMOVE](Network.md#remove)
-   [UPDATE](Network.md#update)

## Actions Functions

-   [set](Network.md#set)

## Hooks Functions

-   [useLatestBlock](Network.md#uselatestblock)
-   [useLatestBlockNumber](Network.md#uselatestblocknumber)

## Other Functions

-   [SET](Network.md#set)
-   [isAction](Network.md#isaction)
-   [isCreateAction](Network.md#iscreateaction)
-   [isGetBlockNumberAction](Network.md#isgetblocknumberaction)
-   [isGetChainIdAction](Network.md#isgetchainidaction)
-   [isReducerAction](Network.md#isreduceraction)
-   [isRemoveAction](Network.md#isremoveaction)
-   [isSetAction](Network.md#issetaction)
-   [isUpdateAction](Network.md#isupdateaction)
-   [reducer](Network.md#reducer)

## Selectors Functions

-   [selectBlocks](Network.md#selectblocks)
-   [selectByFilter](Network.md#selectbyfilter)
-   [selectByIdExists](Network.md#selectbyidexists)
-   [selectByIdMany](Network.md#selectbyidmany)
-   [selectByIdSingle](Network.md#selectbyidsingle)
-   [selectContracts](Network.md#selectcontracts)
-   [selectLatestBlock](Network.md#selectlatestblock)
-   [selectLatestBlockNumber](Network.md#selectlatestblocknumber)
-   [selectTransactions](Network.md#selecttransactions)

## Type aliases

### Action

Ƭ **Action**: [`ReducerAction`](Network.md#reduceraction)

**`internal`**

#### Defined in

[src/network/actions/index.ts:16](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/index.ts#L16)

---

### CreateAction

Ƭ **CreateAction**: `ReturnType`<typeof [`create`](Network.md#create)\>

**`internal`**

#### Defined in

[src/network/actions/create.ts:18](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/create.ts#L18)

---

### GetBlockNumberAction

Ƭ **GetBlockNumberAction**: `ReturnType`<typeof [`getBlockNumber`](Network.md#getblocknumber)\>

**`internal`**

#### Defined in

[src/network/actions/getBlockNumber.ts:12](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/getBlockNumber.ts#L12)

---

### GetChainIdAction

Ƭ **GetChainIdAction**: `ReturnType`<typeof [`getChainId`](Network.md#getchainid)\>

**`internal`**

#### Defined in

[src/network/actions/getChainId.ts:13](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/getChainId.ts#L13)

---

### ReducerAction

Ƭ **ReducerAction**: [`CreateAction`](Network.md#createaction) \| [`RemoveAction`](Network.md#removeaction) \| [`UpdateAction`](Network.md#updateaction) \| [`SetAction`](Network.md#setaction)

**`internal`**

#### Defined in

[src/network/actions/index.ts:9](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/index.ts#L9)

---

### RemoveAction

Ƭ **RemoveAction**: `ReturnType`<typeof [`remove`](Network.md#remove)\>

**`internal`**

#### Defined in

[src/network/actions/remove.ts:12](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/remove.ts#L12)

---

### SetAction

Ƭ **SetAction**: `ReturnType`<typeof [`set`](Network.md#set)\>

**`internal`**

#### Defined in

[src/network/actions/set.ts:21](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/set.ts#L21)

---

### UpdateAction

Ƭ **UpdateAction**: `ReturnType`<typeof [`update`](Network.md#update)\>

**`internal`**

#### Defined in

[src/network/actions/update.ts:18](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/update.ts#L18)

## Actions Variables

### create

• **create**: `ActionCreatorWithPreparedPayload`<[payload: Network], [`Network`](../interfaces/Network.Network-1.md), `string`, `never`, `never`\>

#### Defined in

[src/network/actions/create.ts:10](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/create.ts#L10)

---

### getBlockNumber

• **getBlockNumber**: `ActionCreatorWithPreparedPayload`<[payload: string], `string`, `string`, `never`, `never`\>

#### Defined in

[src/network/actions/getBlockNumber.ts:7](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/getBlockNumber.ts#L7)

---

### getChainId

• **getChainId**: `ActionCreatorWithPreparedPayload`<[payload: default], `default`, `string`, `never`, `never`\>

#### Defined in

[src/network/actions/getChainId.ts:8](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/getChainId.ts#L8)

---

### remove

• **remove**: `ActionCreatorWithPreparedPayload`<[payload: string], `string`, `string`, `never`, `never`\>

#### Defined in

[src/network/actions/remove.ts:7](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/remove.ts#L7)

---

### update

• **update**: `ActionCreatorWithPreparedPayload`<[payload: Network], [`Network`](../interfaces/Network.Network-1.md), `string`, `never`, `never`\>

#### Defined in

[src/network/actions/update.ts:10](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/update.ts#L10)

---

## Other Variables

### CREATE

• **CREATE**: `string`

**`internal`**

#### Defined in

[src/network/actions/create.ts:8](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/create.ts#L8)

---

### GET_BLOCK_NUMBER

• **GET_BLOCK_NUMBER**: `string`

**`internal`**

#### Defined in

[src/network/actions/getBlockNumber.ts:5](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/getBlockNumber.ts#L5)

---

### GET_CHAIN_ID

• **GET_CHAIN_ID**: `string`

**`internal`**

#### Defined in

[src/network/actions/getChainId.ts:6](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/getChainId.ts#L6)

---

### REMOVE

• **REMOVE**: `string`

**`internal`**

#### Defined in

[src/network/actions/remove.ts:5](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/remove.ts#L5)

---

### UPDATE

• **UPDATE**: `string`

**`internal`**

#### Defined in

[src/network/actions/update.ts:8](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/update.ts#L8)

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
| `payload`       | { `id`: `string` ; `key`: keyof [`Network`](../interfaces/Network.Network-1.md) ; `value`: `any` } |
| `payload.id`    | `string`                                                                                           |
| `payload.key`   | keyof [`Network`](../interfaces/Network.Network-1.md)                                              |
| `payload.value` | `any`                                                                                              |
| `type`          | `string`                                                                                           |

#### Defined in

[src/network/actions/set.ts:13](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/set.ts#L13)

---

## Hooks Functions

### useLatestBlock

▸ **useLatestBlock**(`networkId`): `undefined` \| [`BlockTransaction`](../interfaces/Block.BlockTransaction.md)

#### Parameters

| Name        | Type                    |
| :---------- | :---------------------- |
| `networkId` | `undefined` \| `string` |

#### Returns

`undefined` \| [`BlockTransaction`](../interfaces/Block.BlockTransaction.md)

#### Defined in

[src/network/hooks/useLatestBlock.ts:6](https://github.com/leovigna/web3-redux/blob/be15552/src/network/hooks/useLatestBlock.ts#L6)

---

### useLatestBlockNumber

▸ **useLatestBlockNumber**(`networkId`): `undefined` \| `number`

#### Parameters

| Name        | Type                    |
| :---------- | :---------------------- |
| `networkId` | `undefined` \| `string` |

#### Returns

`undefined` \| `number`

#### Defined in

[src/network/hooks/useLatestBlockNumber.ts:6](https://github.com/leovigna/web3-redux/blob/be15552/src/network/hooks/useLatestBlockNumber.ts#L6)

---

## Other Functions

### SET

▸ `Const` **SET**(`key`): `string`

**`internal`**

#### Parameters

| Name  | Type                                                  |
| :---- | :---------------------------------------------------- |
| `key` | keyof [`Network`](../interfaces/Network.Network-1.md) |

#### Returns

`string`

#### Defined in

[src/network/actions/set.ts:5](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/set.ts#L5)

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

[src/network/actions/index.ts:18](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/index.ts#L18)

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

[src/network/actions/create.ts:20](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/create.ts#L20)

---

### isGetBlockNumberAction

▸ `Const` **isGetBlockNumberAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/network/actions/getBlockNumber.ts:14](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/getBlockNumber.ts#L14)

---

### isGetChainIdAction

▸ `Const` **isGetChainIdAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/network/actions/getChainId.ts:15](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/getChainId.ts#L15)

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

[src/network/actions/index.ts:11](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/index.ts#L11)

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

[src/network/actions/remove.ts:14](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/remove.ts#L14)

---

### isSetAction

▸ **isSetAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name                  | Type                                                  |
| :-------------------- | :---------------------------------------------------- |
| `action`              | `Object`                                              |
| `action.payload?`     | `Object`                                              |
| `action.payload.key?` | keyof [`Network`](../interfaces/Network.Network-1.md) |
| `action.type`         | `string`                                              |

#### Returns

action is Object

#### Defined in

[src/network/actions/set.ts:23](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/set.ts#L23)

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

[src/network/actions/update.ts:20](https://github.com/leovigna/web3-redux/blob/be15552/src/network/actions/update.ts#L20)

---

### reducer

▸ **reducer**(`sess`, `action`): `any`

**`internal`**

#### Parameters

| Name     | Type                                        |
| :------- | :------------------------------------------ |
| `sess`   | `any`                                       |
| `action` | [`ReducerAction`](Network.md#reduceraction) |

#### Returns

`any`

#### Defined in

[src/network/reducer.ts:11](https://github.com/leovigna/web3-redux/blob/be15552/src/network/reducer.ts#L11)

---

## Selectors Functions

### selectBlocks

▸ **selectBlocks**(`state`, `id`): `undefined` \| [`BlockHeader`](../interfaces/Block.BlockHeader.md)[]

#### Parameters

| Name    | Type                    |
| :------ | :---------------------- |
| `state` | `any`                   |
| `id`    | `undefined` \| `string` |

#### Returns

`undefined` \| [`BlockHeader`](../interfaces/Block.BlockHeader.md)[]

#### Defined in

[src/network/selectors/selectBlocks.ts:9](https://github.com/leovigna/web3-redux/blob/be15552/src/network/selectors/selectBlocks.ts#L9)

---

### selectByFilter

▸ `Const` **selectByFilter**(`state`, `filter`): [`Network`](../interfaces/Network.Network-1.md)[]

#### Parameters

| Name     | Type                                                                       |
| :------- | :------------------------------------------------------------------------- |
| `state`  | `any`                                                                      |
| `filter` | `undefined` \| `Partial`<[`Network`](../interfaces/Network.Network-1.md)\> |

#### Returns

[`Network`](../interfaces/Network.Network-1.md)[]

#### Defined in

[src/network/selectors/selectByFilter.ts:9](https://github.com/leovigna/web3-redux/blob/be15552/src/network/selectors/selectByFilter.ts#L9)

---

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

[src/network/selectors/selectByIdExists.ts:4](https://github.com/leovigna/web3-redux/blob/be15552/src/network/selectors/selectByIdExists.ts#L4)

---

### selectByIdMany

▸ **selectByIdMany**(`state`, `ids?`): ([`Network`](../interfaces/Network.Network-1.md) \| `null`)[]

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `state` | `any`      |
| `ids?`  | `string`[] |

#### Returns

([`Network`](../interfaces/Network.Network-1.md) \| `null`)[]

#### Defined in

[src/network/selectors/selectByIdMany.ts:6](https://github.com/leovigna/web3-redux/blob/be15552/src/network/selectors/selectByIdMany.ts#L6)

---

### selectByIdSingle

▸ **selectByIdSingle**(`state`, `id`): [`Network`](../interfaces/Network.Network-1.md) \| `undefined`

#### Parameters

| Name    | Type                    |
| :------ | :---------------------- |
| `state` | `any`                   |
| `id`    | `undefined` \| `string` |

#### Returns

[`Network`](../interfaces/Network.Network-1.md) \| `undefined`

#### Defined in

[src/network/selectors/selectByIdSingle.ts:5](https://github.com/leovigna/web3-redux/blob/be15552/src/network/selectors/selectByIdSingle.ts#L5)

---

### selectContracts

▸ **selectContracts**(`state`, `id`): `undefined` \| [`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\>[]

#### Parameters

| Name    | Type                    |
| :------ | :---------------------- |
| `state` | `any`                   |
| `id`    | `undefined` \| `string` |

#### Returns

`undefined` \| [`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\>[]

#### Defined in

[src/network/selectors/selectContracts.ts:9](https://github.com/leovigna/web3-redux/blob/be15552/src/network/selectors/selectContracts.ts#L9)

---

### selectLatestBlock

▸ **selectLatestBlock**(`state`, `id`): `undefined` \| [`BlockTransaction`](../interfaces/Block.BlockTransaction.md)

#### Parameters

| Name    | Type                    |
| :------ | :---------------------- |
| `state` | `any`                   |
| `id`    | `undefined` \| `string` |

#### Returns

`undefined` \| [`BlockTransaction`](../interfaces/Block.BlockTransaction.md)

#### Defined in

[src/network/selectors/selectLatestBlock.ts:5](https://github.com/leovigna/web3-redux/blob/be15552/src/network/selectors/selectLatestBlock.ts#L5)

---

### selectLatestBlockNumber

▸ **selectLatestBlockNumber**(`state`, `id`): `undefined` \| `number`

#### Parameters

| Name    | Type                    |
| :------ | :---------------------- |
| `state` | `any`                   |
| `id`    | `undefined` \| `string` |

#### Returns

`undefined` \| `number`

#### Defined in

[src/network/selectors/selectLatestBlockNumber.ts:4](https://github.com/leovigna/web3-redux/blob/be15552/src/network/selectors/selectLatestBlockNumber.ts#L4)

---

### selectTransactions

▸ **selectTransactions**(`state`, `id`): `undefined` \| [`Transaction`](../interfaces/Transaction.Transaction-1.md)[]

#### Parameters

| Name    | Type                    |
| :------ | :---------------------- |
| `state` | `any`                   |
| `id`    | `undefined` \| `string` |

#### Returns

`undefined` \| [`Transaction`](../interfaces/Transaction.Transaction-1.md)[]

#### Defined in

[src/network/selectors/selectTransactions.ts:9](https://github.com/leovigna/web3-redux/blob/be15552/src/network/selectors/selectTransactions.ts#L9)
