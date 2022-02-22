---
id: 'Config'
title: 'Namespace: Config'
sidebar_label: 'Config'
sidebar_position: 0
custom_edit_url: null
---

Comments on Config module

## Interfaces

-   [Config](../interfaces/Config.Config-1.md)

## Actions Variables

-   [create](Config.md#create)
-   [remove](Config.md#remove)
-   [update](Config.md#update)

## Other Variables

-   [CREATE](Config.md#create)
-   [REMOVE](Config.md#remove)
-   [SET_ACCOUNT](Config.md#set_account)
-   [SET_NETWORK_ID](Config.md#set_network_id)
-   [UPDATE](Config.md#update)

## Actions Functions

-   [set](Config.md#set)
-   [setAccount](Config.md#setaccount)
-   [setNetworkId](Config.md#setnetworkid)

## Hooks

Returns the Config.withId(0) Functions

-   [useConfig](Config.md#useconfig)

## Hooks

Returns the currently globally configured account and a setAccount
callback that will automatically dispatch an action. Functions

-   [useAccount](Config.md#useaccount)

## Hooks

Returns the currently globally configured networkId and a setNetworkId
callback that will automatically dispatch an action. Functions

-   [useNetworkId](Config.md#usenetworkid)

## Other Functions

-   [SET](Config.md#set)
-   [isAction](Config.md#isaction)
-   [isCreateAction](Config.md#iscreateaction)
-   [isReducerAction](Config.md#isreduceraction)
-   [isRemoveAction](Config.md#isremoveaction)
-   [isSetAction](Config.md#issetaction)
-   [isUpdateAction](Config.md#isupdateaction)
-   [reducer](Config.md#reducer)

## Selectors Functions

-   [selectAccount](Config.md#selectaccount)
-   [selectConfig](Config.md#selectconfig)
-   [selectIpfsUrl](Config.md#selectipfsurl)
-   [selectNetworkId](Config.md#selectnetworkid)

## Type aliases

### Action

Ƭ **Action**: [`ReducerAction`](Config.md#reduceraction)

#### Defined in

[src/config/actions/index.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/index.ts#L13)

---

### CreateAction

Ƭ **CreateAction**: `ReturnType`<typeof [`create`](Config.md#create)\>

**`internal`**

#### Defined in

[src/config/actions/create.ts:12](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/create.ts#L12)

---

### ReducerAction

Ƭ **ReducerAction**: [`CreateAction`](Config.md#createaction) \| [`RemoveAction`](Config.md#removeaction) \| [`UpdateAction`](Config.md#updateaction) \| [`SetAction`](Config.md#setaction)

#### Defined in

[src/config/actions/index.ts:8](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/index.ts#L8)

---

### RemoveAction

Ƭ **RemoveAction**: `ReturnType`<typeof [`remove`](Config.md#remove)\>

**`internal`**

#### Defined in

[src/config/actions/remove.ts:11](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/remove.ts#L11)

---

### SetAction

Ƭ **SetAction**: `ReturnType`<typeof [`set`](Config.md#set)\>

**`internal`**

#### Defined in

[src/config/actions/set.ts:20](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/set.ts#L20)

---

### UpdateAction

Ƭ **UpdateAction**: `ReturnType`<typeof [`update`](Config.md#update)\>

**`internal`**

#### Defined in

[src/config/actions/update.ts:12](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/update.ts#L12)

## Actions Variables

### create

• **create**: `ActionCreatorWithPreparedPayload`<[payload: Config], [`Config`](../interfaces/Config.Config-1.md), `string`, `never`, `never`\>

#### Defined in

[src/config/actions/create.ts:8](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/create.ts#L8)

---

### remove

• **remove**: `ActionCreatorWithPreparedPayload`<[payload: string], `string`, `string`, `never`, `never`\>

#### Defined in

[src/config/actions/remove.ts:7](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/remove.ts#L7)

---

### update

• **update**: `ActionCreatorWithPreparedPayload`<[payload: Config], [`Config`](../interfaces/Config.Config-1.md), `string`, `never`, `never`\>

#### Defined in

[src/config/actions/update.ts:8](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/update.ts#L8)

---

## Other Variables

### CREATE

• **CREATE**: `string`

**`internal`**

#### Defined in

[src/config/actions/create.ts:6](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/create.ts#L6)

---

### REMOVE

• **REMOVE**: `string`

**`internal`**

#### Defined in

[src/config/actions/remove.ts:5](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/remove.ts#L5)

---

### SET_ACCOUNT

• **SET_ACCOUNT**: `string`

**`internal`**

#### Defined in

[src/config/actions/setAccount.ts:4](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/setAccount.ts#L4)

---

### SET_NETWORK_ID

• **SET_NETWORK_ID**: `string`

**`internal`**

#### Defined in

[src/config/actions/setNetworkId.ts:4](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/setNetworkId.ts#L4)

---

### UPDATE

• **UPDATE**: `string`

**`internal`**

#### Defined in

[src/config/actions/update.ts:6](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/update.ts#L6)

## Actions Functions

### set

▸ `Const` **set**(`payload`): `Object`

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `payload` | `SetActionInput` |

#### Returns

`Object`

| Name            | Type                                                                                            |
| :-------------- | :---------------------------------------------------------------------------------------------- |
| `payload`       | { `id`: `string` ; `key`: keyof [`Config`](../interfaces/Config.Config-1.md) ; `value`: `any` } |
| `payload.id`    | `string`                                                                                        |
| `payload.key`   | keyof [`Config`](../interfaces/Config.Config-1.md)                                              |
| `payload.value` | `any`                                                                                           |
| `type`          | `string`                                                                                        |

#### Defined in

[src/config/actions/set.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/set.ts#L13)

---

### setAccount

▸ `Const` **setAccount**(`account`): `Object`

#### Parameters

| Name      | Type               |
| :-------- | :----------------- |
| `account` | `null` \| `string` |

#### Returns

`Object`

| Name            | Type                                                                                            |
| :-------------- | :---------------------------------------------------------------------------------------------- |
| `payload`       | { `id`: `string` ; `key`: keyof [`Config`](../interfaces/Config.Config-1.md) ; `value`: `any` } |
| `payload.id`    | `string`                                                                                        |
| `payload.key`   | keyof [`Config`](../interfaces/Config.Config-1.md)                                              |
| `payload.value` | `any`                                                                                           |
| `type`          | `string`                                                                                        |

#### Defined in

[src/config/actions/setAccount.ts:6](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/setAccount.ts#L6)

---

### setNetworkId

▸ `Const` **setNetworkId**(`networkId`): `Object`

#### Parameters

| Name        | Type               |
| :---------- | :----------------- |
| `networkId` | `null` \| `string` |

#### Returns

`Object`

| Name            | Type                                                                                            |
| :-------------- | :---------------------------------------------------------------------------------------------- |
| `payload`       | { `id`: `string` ; `key`: keyof [`Config`](../interfaces/Config.Config-1.md) ; `value`: `any` } |
| `payload.id`    | `string`                                                                                        |
| `payload.key`   | keyof [`Config`](../interfaces/Config.Config-1.md)                                              |
| `payload.value` | `any`                                                                                           |
| `type`          | `string`                                                                                        |

#### Defined in

[src/config/actions/setNetworkId.ts:6](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/setNetworkId.ts#L6)

---

## Hooks

Returns the Config.withId(0) Functions

### useConfig

▸ **useConfig**(): [`Config`](../interfaces/Config.Config-1.md)

#### Returns

[`Config`](../interfaces/Config.Config-1.md)

#### Defined in

[src/config/hooks/useConfig.ts:8](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/hooks/useConfig.ts#L8)

---

## Hooks

Returns the currently globally configured account and a setAccount
callback that will automatically dispatch an action. Functions

### useAccount

▸ **useAccount**(): [`undefined` \| `string`, (`networkId`: `string`) => `void`]

#### Returns

[`undefined` \| `string`, (`networkId`: `string`) => `void`]

#### Defined in

[src/config/hooks/useAccount.ts:11](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/hooks/useAccount.ts#L11)

---

## Hooks

Returns the currently globally configured networkId and a setNetworkId
callback that will automatically dispatch an action. Functions

### useNetworkId

▸ **useNetworkId**(): [`undefined` \| `string`, (`networkId`: `string`) => `void`]

#### Returns

[`undefined` \| `string`, (`networkId`: `string`) => `void`]

#### Defined in

[src/config/hooks/useNetworkId.ts:11](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/hooks/useNetworkId.ts#L11)

---

## Other Functions

### SET

▸ `Const` **SET**(`key`): `string`

**`internal`**

#### Parameters

| Name  | Type                                               |
| :---- | :------------------------------------------------- |
| `key` | keyof [`Config`](../interfaces/Config.Config-1.md) |

#### Returns

`string`

#### Defined in

[src/config/actions/set.ts:5](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/set.ts#L5)

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

[src/config/actions/index.ts:14](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/index.ts#L14)

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

[src/config/actions/create.ts:14](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/create.ts#L14)

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

[src/config/actions/index.ts:9](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/index.ts#L9)

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

[src/config/actions/remove.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/remove.ts#L13)

---

### isSetAction

▸ `Const` **isSetAction**(`action`): `boolean`

**`internal`**

#### Parameters

| Name                  | Type                                               |
| :-------------------- | :------------------------------------------------- |
| `action`              | `Object`                                           |
| `action.payload?`     | `Object`                                           |
| `action.payload.key?` | keyof [`Config`](../interfaces/Config.Config-1.md) |
| `action.type`         | `string`                                           |

#### Returns

`boolean`

#### Defined in

[src/config/actions/set.ts:22](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/set.ts#L22)

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

[src/config/actions/update.ts:14](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/actions/update.ts#L14)

---

### reducer

▸ **reducer**(`sess`, `action`): `any`

**`internal`**

#### Parameters

| Name     | Type                                       |
| :------- | :----------------------------------------- |
| `sess`   | `any`                                      |
| `action` | [`ReducerAction`](Config.md#reduceraction) |

#### Returns

`any`

#### Defined in

[src/config/reducer.ts:5](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/reducer.ts#L5)

---

## Selectors Functions

### selectAccount

▸ **selectAccount**(`state`): `undefined` \| `string`

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `state` | `any` |

#### Returns

`undefined` \| `string`

#### Defined in

[src/config/selectors/selectAccount.ts:4](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/selectors/selectAccount.ts#L4)

---

### selectConfig

▸ `Const` **selectConfig**(`state`): [`Config`](../interfaces/Config.Config-1.md)

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `state` | `any` |

#### Returns

[`Config`](../interfaces/Config.Config-1.md)

#### Defined in

[src/config/selectors/selectConfig.ts:10](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/selectors/selectConfig.ts#L10)

---

### selectIpfsUrl

▸ **selectIpfsUrl**(`state`): `undefined` \| `string`

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `state` | `any` |

#### Returns

`undefined` \| `string`

#### Defined in

[src/config/selectors/selectIpfsUrl.ts:4](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/selectors/selectIpfsUrl.ts#L4)

---

### selectNetworkId

▸ **selectNetworkId**(`state`): `undefined` \| `string`

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `state` | `any` |

#### Returns

`undefined` \| `string`

#### Defined in

[src/config/selectors/selectNetworkId.ts:4](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/config/selectors/selectNetworkId.ts#L4)
