---
id: 'ContractEvent'
title: 'Namespace: ContractEvent'
sidebar_label: 'ContractEvent'
sidebar_position: 0
custom_edit_url: null
---

Comments on ContractEvent module

## Interfaces

-   [ContractEvent](../interfaces/ContractEvent.ContractEvent-1.md)
-   [ContractEventId](../interfaces/ContractEvent.ContractEventId.md)
-   [ReturnValues](../interfaces/ContractEvent.ReturnValues.md)

## Actions Variables

-   [create](ContractEvent.md#create)
-   [getPastLogs](ContractEvent.md#getpastlogs)
-   [remove](ContractEvent.md#remove)
-   [subscribeLogs](ContractEvent.md#subscribelogs)
-   [unsubscribeLogs](ContractEvent.md#unsubscribelogs)
-   [update](ContractEvent.md#update)

## Actions

Get all assets (ERC20,ERC721,ERC1155) that &#x60;address&#x60; has received/sent.
Note this assumes the contracts use the standard event signatures for the interfaces.
It is also possible that some returned addresses might NOT be one of the above
interfaces but simply implement one of event signatures. Variables

-   [getAssets](ContractEvent.md#getassets)

## Other Variables

-   [CREATE](ContractEvent.md#create)
-   [GET_ASSETS](ContractEvent.md#get_assets)
-   [GET_PAST_LOGS](ContractEvent.md#get_past_logs)
-   [REMOVE](ContractEvent.md#remove)
-   [SUBSCRIBE_LOGS](ContractEvent.md#subscribe_logs)
-   [UNSUBSCRIBE_LOGS](ContractEvent.md#unsubscribe_logs)
-   [UPDATE](ContractEvent.md#update)

## Actions Functions

-   [set](ContractEvent.md#set)

## Other Functions

-   [SET](ContractEvent.md#set)
-   [getId](ContractEvent.md#getid)
-   [getIdDeconstructed](ContractEvent.md#getiddeconstructed)
-   [isAction](ContractEvent.md#isaction)
-   [isCreateAction](ContractEvent.md#iscreateaction)
-   [isGetAssetsAction](ContractEvent.md#isgetassetsaction)
-   [isGetPastLogsAction](ContractEvent.md#isgetpastlogsaction)
-   [isReducerAction](ContractEvent.md#isreduceraction)
-   [isRemoveAction](ContractEvent.md#isremoveaction)
-   [isSetAction](ContractEvent.md#issetaction)
-   [isSubscribeLogsAction](ContractEvent.md#issubscribelogsaction)
-   [isUnsubscribeLogsAction](ContractEvent.md#isunsubscribelogsaction)
-   [isUpdateAction](ContractEvent.md#isupdateaction)
-   [reducer](ContractEvent.md#reducer)
-   [validate](ContractEvent.md#validate)

## Selectors Functions

-   [selectByIdExists](ContractEvent.md#selectbyidexists)
-   [selectByIdMany](ContractEvent.md#selectbyidmany)
-   [selectByIdSingle](ContractEvent.md#selectbyidsingle)

## References

### getContractEventId

Renames and re-exports [getId](ContractEvent.md#getid)

---

### validateContractEvent

Renames and re-exports [validate](ContractEvent.md#validate)

## Type aliases

### Action

Ƭ **Action**: [`ReducerAction`](ContractEvent.md#reduceraction)

**`internal`**

#### Defined in

[src/contractevent/actions/index.ts:18](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/index.ts#L18)

---

### CreateAction

Ƭ **CreateAction**: `ReturnType`<typeof [`create`](ContractEvent.md#create)\>

**`internal`**

#### Defined in

[src/contractevent/actions/create.ts:12](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/create.ts#L12)

---

### GetAssetsAction

Ƭ **GetAssetsAction**: `ReturnType`<typeof [`getAssets`](ContractEvent.md#getassets)\>

**`internal`**

#### Defined in

[src/contractevent/actions/getAssets.ts:23](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/getAssets.ts#L23)

---

### GetPastLogsAction

Ƭ **GetPastLogsAction**: `ReturnType`<typeof [`getPastLogs`](ContractEvent.md#getpastlogs)\>

**`internal`**

#### Defined in

[src/contractevent/actions/getPastLogs.ts:62](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/getPastLogs.ts#L62)

---

### ReducerAction

Ƭ **ReducerAction**: [`CreateAction`](ContractEvent.md#createaction) \| [`RemoveAction`](ContractEvent.md#removeaction) \| [`UpdateAction`](ContractEvent.md#updateaction) \| [`SetAction`](ContractEvent.md#setaction)

**`internal`**

#### Defined in

[src/contractevent/actions/index.ts:11](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/index.ts#L11)

---

### RemoveAction

Ƭ **RemoveAction**: `ReturnType`<typeof [`remove`](ContractEvent.md#remove)\>

**`internal`**

#### Defined in

[src/contractevent/actions/remove.ts:11](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/remove.ts#L11)

---

### SetAction

Ƭ **SetAction**: `ReturnType`<typeof [`set`](ContractEvent.md#set)\>

**`internal`**

#### Defined in

[src/contractevent/actions/set.ts:21](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/set.ts#L21)

---

### SubscribeLogsAction

Ƭ **SubscribeLogsAction**: `ReturnType`<typeof [`subscribeLogs`](ContractEvent.md#subscribelogs)\>

**`internal`**

#### Defined in

[src/contractevent/actions/subscribeLogs.ts:41](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/subscribeLogs.ts#L41)

---

### UnsubscribeLogsAction

Ƭ **UnsubscribeLogsAction**: `ReturnType`<typeof [`unsubscribeLogs`](ContractEvent.md#unsubscribelogs)\>

**`internal`**

#### Defined in

[src/contractevent/actions/unsubscribeLogs.ts:41](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/unsubscribeLogs.ts#L41)

---

### UpdateAction

Ƭ **UpdateAction**: `ReturnType`<typeof [`update`](ContractEvent.md#update)\>

**`internal`**

#### Defined in

[src/contractevent/actions/update.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/update.ts#L13)

## Actions Variables

### create

• **create**: `ActionCreatorWithPreparedPayload`<[payload: ContractEvent<ReturnValues\>], `ModelWithId`<[`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<[`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md)\>\>, `string`, `never`, `never`\>

#### Defined in

[src/contractevent/actions/create.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/create.ts#L8)

---

### getPastLogs

• **getPastLogs**: `ActionCreatorWithPreparedPayload`<[payload: GetPastLogsActionInput], { `address`: `undefined` \| `string` \| `string`[] ; `fromBlock`: `number` ; `networkId`: `string` ; `toBlock`: `number` \| `"latest"` ; `topics?`: (`null` \| `string` \| `string`[])[] }, `string`, `never`, `never`\>

**`link`** https://web3js.readthedocs.io/en/v1.7.0/web3-eth.html#getpastlogs
Get past logs using raw filter.

#### Defined in

[src/contractevent/actions/getPastLogs.ts:22](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/getPastLogs.ts#L22)

---

### remove

• **remove**: `ActionCreatorWithPayload`<[`ContractEventId`](../interfaces/ContractEvent.ContractEventId.md), `string`\>

#### Defined in

[src/contractevent/actions/remove.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/remove.ts#L8)

---

### subscribeLogs

• **subscribeLogs**: `ActionCreatorWithPreparedPayload`<[payload: LogsSubscription], { `address`: `undefined` \| `string` \| `string`[] ; `networkId`: `string` ; `topics?`: (`null` \| `string` \| `string`[])[] }, `string`, `never`, `never`\>

**`link`** https://web3js.readthedocs.io/en/v1.7.0/web3-eth.html#getpastlogs
Get past logs using raw filter.

#### Defined in

[src/contractevent/actions/subscribeLogs.ts:15](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/subscribeLogs.ts#L15)

---

### unsubscribeLogs

• **unsubscribeLogs**: `ActionCreatorWithPreparedPayload`<[payload: LogsSubscription], { `address`: `undefined` \| `string` \| `string`[] ; `networkId`: `string` ; `topics?`: (`null` \| `string` \| `string`[])[] }, `string`, `never`, `never`\>

**`link`** https://web3js.readthedocs.io/en/v1.7.0/web3-eth.html#getpastlogs
Get past logs using raw filter.

#### Defined in

[src/contractevent/actions/unsubscribeLogs.ts:15](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/unsubscribeLogs.ts#L15)

---

### update

• **update**: `ActionCreatorWithPreparedPayload`<[payload: ContractEvent<ReturnValues\>], `ModelWithId`<[`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<[`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md)\>\>, `string`, `never`, `never`\>

#### Defined in

[src/contractevent/actions/update.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/update.ts#L8)

---

## Actions

Get all assets (ERC20,ERC721,ERC1155) that &#x60;address&#x60; has received/sent.
Note this assumes the contracts use the standard event signatures for the interfaces.
It is also possible that some returned addresses might NOT be one of the above
interfaces but simply implement one of event signatures. Variables

### getAssets

• **getAssets**: `ActionCreatorWithPreparedPayload`<[payload: GetAssetsActionInput], { `address`: `string` ; `networkId`: `string` = payload.networkId }, `string`, `never`, `never`\>

#### Defined in

[src/contractevent/actions/getAssets.ts:19](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/getAssets.ts#L19)

---

## Other Variables

### CREATE

• **CREATE**: `string`

**`internal`**

#### Defined in

[src/contractevent/actions/create.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/create.ts#L6)

---

### GET_ASSETS

• **GET_ASSETS**: `string`

**`internal`**

#### Defined in

[src/contractevent/actions/getAssets.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/getAssets.ts#L6)

---

### GET_PAST_LOGS

• **GET_PAST_LOGS**: `string`

**`internal`**

#### Defined in

[src/contractevent/actions/getPastLogs.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/getPastLogs.ts#L8)

---

### REMOVE

• **REMOVE**: `string`

**`internal`**

#### Defined in

[src/contractevent/actions/remove.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/remove.ts#L6)

---

### SUBSCRIBE_LOGS

• **SUBSCRIBE_LOGS**: `string`

**`internal`**

#### Defined in

[src/contractevent/actions/subscribeLogs.ts:9](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/subscribeLogs.ts#L9)

---

### UNSUBSCRIBE_LOGS

• **UNSUBSCRIBE_LOGS**: `string`

**`internal`**

#### Defined in

[src/contractevent/actions/unsubscribeLogs.ts:9](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/unsubscribeLogs.ts#L9)

---

### UPDATE

• **UPDATE**: `string`

**`internal`**

#### Defined in

[src/contractevent/actions/update.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/update.ts#L6)

## Actions Functions

### set

▸ `Const` **set**(`payload`): `Object`

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `payload` | `SetActionInput` |

#### Returns

`Object`

| Name            | Type                                                                                                                                                                                 |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`       | { `id`: `string` ; `key`: keyof [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<[`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md)\> ; `value`: `any` } |
| `payload.id`    | `string`                                                                                                                                                                             |
| `payload.key`   | keyof [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<[`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md)\>                                              |
| `payload.value` | `any`                                                                                                                                                                                |
| `type`          | `string`                                                                                                                                                                             |

#### Defined in

[src/contractevent/actions/set.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/set.ts#L13)

---

## Other Functions

### SET

▸ `Const` **SET**(`key`): `string`

**`internal`**

#### Parameters

| Name  | Type                                                                                                                                    |
| :---- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `key` | keyof [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<[`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md)\> |

#### Returns

`string`

#### Defined in

[src/contractevent/actions/set.ts:5](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/set.ts#L5)

---

### getId

▸ **getId**(`id`): `string`

**`internal`**

#### Parameters

| Name | Type                                                                |
| :--- | :------------------------------------------------------------------ |
| `id` | [`ContractEventId`](../interfaces/ContractEvent.ContractEventId.md) |

#### Returns

`string`

#### Defined in

[src/contractevent/model/interface.ts:54](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L54)

---

### getIdDeconstructed

▸ **getIdDeconstructed**(`id`): [`ContractEventId`](../interfaces/ContractEvent.ContractEventId.md)

**`internal`**

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

[`ContractEventId`](../interfaces/ContractEvent.ContractEventId.md)

#### Defined in

[src/contractevent/model/interface.ts:60](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L60)

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

[src/contractevent/actions/index.ts:20](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/index.ts#L20)

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

[src/contractevent/actions/create.ts:14](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/create.ts#L14)

---

### isGetAssetsAction

▸ `Const` **isGetAssetsAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contractevent/actions/getAssets.ts:25](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/getAssets.ts#L25)

---

### isGetPastLogsAction

▸ `Const` **isGetPastLogsAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contractevent/actions/getPastLogs.ts:64](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/getPastLogs.ts#L64)

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

[src/contractevent/actions/index.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/index.ts#L13)

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

[src/contractevent/actions/remove.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/remove.ts#L13)

---

### isSetAction

▸ `Const` **isSetAction**(`action`): `boolean`

**`internal`**

#### Parameters

| Name                  | Type                                                                                                                                    |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `action`              | `Object`                                                                                                                                |
| `action.payload?`     | `Object`                                                                                                                                |
| `action.payload.key?` | keyof [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<[`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md)\> |
| `action.type`         | `string`                                                                                                                                |

#### Returns

`boolean`

#### Defined in

[src/contractevent/actions/set.ts:23](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/set.ts#L23)

---

### isSubscribeLogsAction

▸ `Const` **isSubscribeLogsAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contractevent/actions/subscribeLogs.ts:43](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/subscribeLogs.ts#L43)

---

### isUnsubscribeLogsAction

▸ `Const` **isUnsubscribeLogsAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contractevent/actions/unsubscribeLogs.ts:43](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/unsubscribeLogs.ts#L43)

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

[src/contractevent/actions/update.ts:15](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/actions/update.ts#L15)

---

### reducer

▸ **reducer**(`sess`, `action`): `any`

**`internal`**

#### Parameters

| Name     | Type                                              |
| :------- | :------------------------------------------------ |
| `sess`   | `any`                                             |
| `action` | [`ReducerAction`](ContractEvent.md#reduceraction) |

#### Returns

`any`

#### Defined in

[src/contractevent/reducer.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/reducer.ts#L8)

---

### validate

▸ **validate**(`item`): `ModelWithId`<[`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)\>

**`internal`**

#### Parameters

| Name   | Type                                                                                                                              |
| :----- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `item` | [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<[`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md)\> |

#### Returns

`ModelWithId`<[`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)\>

#### Defined in

[src/contractevent/model/interface.ts:76](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L76)

---

## Selectors Functions

### selectByIdExists

▸ **selectByIdExists**(`state`, `id`): `boolean`

#### Parameters

| Name    | Type                                                                               |
| :------ | :--------------------------------------------------------------------------------- |
| `state` | `any`                                                                              |
| `id`    | `undefined` \| [`ContractEventId`](../interfaces/ContractEvent.ContractEventId.md) |

#### Returns

`boolean`

#### Defined in

[src/contractevent/selectors/selectByIdExists.ts:5](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/selectors/selectByIdExists.ts#L5)

---

### selectByIdMany

▸ **selectByIdMany**(`state`, `ids?`): ([`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md) \| `null`)[]

#### Parameters

| Name    | Type                                                                  |
| :------ | :-------------------------------------------------------------------- |
| `state` | `any`                                                                 |
| `ids?`  | [`ContractEventId`](../interfaces/ContractEvent.ContractEventId.md)[] |

#### Returns

([`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md) \| `null`)[]

#### Defined in

[src/contractevent/selectors/selectByIdMany.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/selectors/selectByIdMany.ts#L6)

---

### selectByIdSingle

▸ **selectByIdSingle**(`state`, `id`): [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md) \| `undefined`

#### Parameters

| Name    | Type                                                                               |
| :------ | :--------------------------------------------------------------------------------- |
| `state` | `any`                                                                              |
| `id`    | `undefined` \| [`ContractEventId`](../interfaces/ContractEvent.ContractEventId.md) |

#### Returns

[`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md) \| `undefined`

#### Defined in

[src/contractevent/selectors/selectByIdSingle.ts:5](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/selectors/selectByIdSingle.ts#L5)
