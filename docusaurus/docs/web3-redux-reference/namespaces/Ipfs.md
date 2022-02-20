---
id: 'Ipfs'
title: 'Namespace: Ipfs'
sidebar_label: 'Ipfs'
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

-   [Ipfs](../interfaces/Ipfs.Ipfs-1.md)
-   [IpfsId](../interfaces/Ipfs.IpfsId.md)

## Actions Variables

-   [cat](Ipfs.md#cat)
-   [create](Ipfs.md#create)
-   [fetchIpfs](Ipfs.md#fetchipfs)
-   [objectGet](Ipfs.md#objectget)
-   [remove](Ipfs.md#remove)
-   [update](Ipfs.md#update)

## Other Variables

-   [CAT](Ipfs.md#cat)
-   [CREATE](Ipfs.md#create)
-   [FETCH_IPFS](Ipfs.md#fetch_ipfs)
-   [OBJECT_GET](Ipfs.md#object_get)
-   [REMOVE](Ipfs.md#remove)
-   [UPDATE](Ipfs.md#update)

## Actions Functions

-   [set](Ipfs.md#set)

## Other Functions

-   [SET](Ipfs.md#set)
-   [isAction](Ipfs.md#isaction)
-   [isCatAction](Ipfs.md#iscataction)
-   [isCreateAction](Ipfs.md#iscreateaction)
-   [isFetchIpfsAction](Ipfs.md#isfetchipfsaction)
-   [isObjectGetAction](Ipfs.md#isobjectgetaction)
-   [isReducerAction](Ipfs.md#isreduceraction)
-   [isRemoveAction](Ipfs.md#isremoveaction)
-   [isSagaAction](Ipfs.md#issagaaction)
-   [isSetAction](Ipfs.md#issetaction)
-   [isUpdateAction](Ipfs.md#isupdateaction)
-   [reducer](Ipfs.md#reducer)
-   [saga](Ipfs.md#saga)

## Selectors Functions

-   [selectByIdMany](Ipfs.md#selectbyidmany)
-   [selectByIdSingle](Ipfs.md#selectbyidsingle)

## Selectors

Recursively searches for CID at file at &lt;BASE_CID&gt;/path/to/file Functions

-   [selectPathHash](Ipfs.md#selectpathhash)

## Type aliases

### Action

Ƭ **Action**: [`ReducerAction`](Ipfs.md#reduceraction) \| [`SagaAction`](Ipfs.md#sagaaction)

**`internal`**

#### Defined in

[src/ipfs/actions/index.ts:22](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/index.ts#L22)

---

### CatAction

Ƭ **CatAction**: `ReturnType`<typeof [`cat`](Ipfs.md#cat)\>

**`internal`**

#### Defined in

[src/ipfs/actions/cat.ts:13](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/cat.ts#L13)

---

### CreateAction

Ƭ **CreateAction**: `ReturnType`<typeof [`create`](Ipfs.md#create)\>

**`internal`**

#### Defined in

[src/ipfs/actions/create.ts:14](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/create.ts#L14)

---

### FetchIpfsAction

Ƭ **FetchIpfsAction**: `ReturnType`<typeof [`fetchIpfs`](Ipfs.md#fetchipfs)\>

**`internal`**

#### Defined in

[src/ipfs/actions/fetchIpfs.ts:14](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/fetchIpfs.ts#L14)

---

### ObjectGetAction

Ƭ **ObjectGetAction**: `ReturnType`<typeof [`objectGet`](Ipfs.md#objectget)\>

**`internal`**

#### Defined in

[src/ipfs/actions/objectGet.ts:13](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/objectGet.ts#L13)

---

### ReducerAction

Ƭ **ReducerAction**: [`CreateAction`](Ipfs.md#createaction) \| [`RemoveAction`](Ipfs.md#removeaction) \| [`UpdateAction`](Ipfs.md#updateaction) \| [`SetAction`](Ipfs.md#setaction)

#### Defined in

[src/ipfs/actions/index.ts:9](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/index.ts#L9)

---

### RemoveAction

Ƭ **RemoveAction**: `ReturnType`<typeof [`remove`](Ipfs.md#remove)\>

**`internal`**

#### Defined in

[src/ipfs/actions/remove.ts:12](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/remove.ts#L12)

---

### SagaAction

Ƭ **SagaAction**: [`FetchIpfsAction`](Ipfs.md#fetchipfsaction) \| [`ObjectGetAction`](Ipfs.md#objectgetaction) \| [`CatAction`](Ipfs.md#cataction)

**`internal`**

#### Defined in

[src/ipfs/actions/index.ts:15](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/index.ts#L15)

---

### SetAction

Ƭ **SetAction**: `ReturnType`<typeof [`set`](Ipfs.md#set)\>

**`internal`**

#### Defined in

[src/ipfs/actions/set.ts:25](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/set.ts#L25)

---

### UpdateAction

Ƭ **UpdateAction**: `ReturnType`<typeof [`update`](Ipfs.md#update)\>

**`internal`**

#### Defined in

[src/ipfs/actions/update.ts:14](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/update.ts#L14)

## Actions Variables

### cat

• **cat**: `ActionCreatorWithPreparedPayload`<[payload: string], `string`, `string`, `never`, `never`\>

#### Defined in

[src/ipfs/actions/cat.ts:8](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/cat.ts#L8)

---

### create

• **create**: `ActionCreatorWithPreparedPayload`<[payload: Ipfs], [`Ipfs`](../interfaces/Ipfs.Ipfs-1.md), `string`, `never`, `never`\>

#### Defined in

[src/ipfs/actions/create.ts:9](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/create.ts#L9)

---

### fetchIpfs

• **fetchIpfs**: `ActionCreatorWithPreparedPayload`<[payload: string], `string`, `string`, `never`, `never`\>

#### Defined in

[src/ipfs/actions/fetchIpfs.ts:8](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/fetchIpfs.ts#L8)

---

### objectGet

• **objectGet**: `ActionCreatorWithPreparedPayload`<[payload: string], `string`, `string`, `never`, `never`\>

#### Defined in

[src/ipfs/actions/objectGet.ts:8](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/objectGet.ts#L8)

---

### remove

• **remove**: `ActionCreatorWithPreparedPayload`<[payload: IpfsId], { `contentId`: `string` = payload.contentId }, `string`, `never`, `never`\>

#### Defined in

[src/ipfs/actions/remove.ts:8](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/remove.ts#L8)

---

### update

• **update**: `ActionCreatorWithPreparedPayload`<[payload: Ipfs], [`Ipfs`](../interfaces/Ipfs.Ipfs-1.md), `string`, `never`, `never`\>

#### Defined in

[src/ipfs/actions/update.ts:9](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/update.ts#L9)

---

## Other Variables

### CAT

• **CAT**: `string`

**`internal`**

#### Defined in

[src/ipfs/actions/cat.ts:6](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/cat.ts#L6)

---

### CREATE

• **CREATE**: `string`

**`internal`**

#### Defined in

[src/ipfs/actions/create.ts:7](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/create.ts#L7)

---

### FETCH_IPFS

• **FETCH_IPFS**: `string`

**`internal`**

#### Defined in

[src/ipfs/actions/fetchIpfs.ts:6](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/fetchIpfs.ts#L6)

---

### OBJECT_GET

• **OBJECT_GET**: `string`

**`internal`**

#### Defined in

[src/ipfs/actions/objectGet.ts:6](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/objectGet.ts#L6)

---

### REMOVE

• **REMOVE**: `string`

**`internal`**

#### Defined in

[src/ipfs/actions/remove.ts:6](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/remove.ts#L6)

---

### UPDATE

• **UPDATE**: `string`

**`internal`**

#### Defined in

[src/ipfs/actions/update.ts:7](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/update.ts#L7)

## Actions Functions

### set

▸ `Const` **set**(`payload`): `Object`

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `payload` | `SetActionInput` |

#### Returns

`Object`

| Name                | Type                                                                                                                                             |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`           | { `contentId`: `string` = payload.contentId; `key`: keyof [`Ipfs`](../interfaces/Ipfs.Ipfs-1.md) = payload.key; `value`: `any` = payload.value } |
| `payload.contentId` | `string`                                                                                                                                         |
| `payload.key`       | keyof [`Ipfs`](../interfaces/Ipfs.Ipfs-1.md)                                                                                                     |
| `payload.value`     | `any`                                                                                                                                            |
| `type`              | `string`                                                                                                                                         |

#### Defined in

[src/ipfs/actions/set.ts:13](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/set.ts#L13)

---

## Other Functions

### SET

▸ `Const` **SET**(`key`): `string`

**`internal`**

#### Parameters

| Name  | Type                                         |
| :---- | :------------------------------------------- |
| `key` | keyof [`Ipfs`](../interfaces/Ipfs.Ipfs-1.md) |

#### Returns

`string`

#### Defined in

[src/ipfs/actions/set.ts:5](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/set.ts#L5)

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

[src/ipfs/actions/index.ts:24](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/index.ts#L24)

---

### isCatAction

▸ `Const` **isCatAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/ipfs/actions/cat.ts:15](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/cat.ts#L15)

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

[src/ipfs/actions/create.ts:16](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/create.ts#L16)

---

### isFetchIpfsAction

▸ `Const` **isFetchIpfsAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/ipfs/actions/fetchIpfs.ts:16](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/fetchIpfs.ts#L16)

---

### isObjectGetAction

▸ `Const` **isObjectGetAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/ipfs/actions/objectGet.ts:15](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/objectGet.ts#L15)

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

[src/ipfs/actions/index.ts:11](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/index.ts#L11)

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

[src/ipfs/actions/remove.ts:14](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/remove.ts#L14)

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

[src/ipfs/actions/index.ts:17](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/index.ts#L17)

---

### isSetAction

▸ `Const` **isSetAction**(`action`): `boolean`

**`internal`**

#### Parameters

| Name                 | Type                                         |
| :------------------- | :------------------------------------------- |
| `action`             | `Object`                                     |
| `action.payload?`    | `Object`                                     |
| `action.payload.key` | keyof [`Ipfs`](../interfaces/Ipfs.Ipfs-1.md) |
| `action.type`        | `string`                                     |

#### Returns

`boolean`

#### Defined in

[src/ipfs/actions/set.ts:27](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/set.ts#L27)

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

[src/ipfs/actions/update.ts:16](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/actions/update.ts#L16)

---

### reducer

▸ **reducer**(`sess`, `action`): `any`

**`internal`**

#### Parameters

| Name     | Type                                     |
| :------- | :--------------------------------------- |
| `sess`   | `any`                                    |
| `action` | [`ReducerAction`](Ipfs.md#reduceraction) |

#### Returns

`any`

#### Defined in

[src/ipfs/reducer.ts:16](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/reducer.ts#L16)

---

### saga

▸ **saga**(): `Generator`<`AllEffect`<`SagaGenerator`<`never`, `ForkEffect`<`never`\>\>\>, `void`, `unknown`\>

**`internal`**

#### Returns

`Generator`<`AllEffect`<`SagaGenerator`<`never`, `ForkEffect`<`never`\>\>\>, `void`, `unknown`\>

#### Defined in

[src/ipfs/sagas/index.ts:8](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/sagas/index.ts#L8)

---

## Selectors Functions

### selectByIdMany

▸ **selectByIdMany**(`state`, `ids?`): ([`Ipfs`](../interfaces/Ipfs.Ipfs-1.md) \| `null`)[]

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `state` | `any`      |
| `ids?`  | `string`[] |

#### Returns

([`Ipfs`](../interfaces/Ipfs.Ipfs-1.md) \| `null`)[]

#### Defined in

[src/ipfs/selectors/selectByIdMany.ts:7](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/selectors/selectByIdMany.ts#L7)

---

### selectByIdSingle

▸ **selectByIdSingle**(`state`, `id`): [`Ipfs`](../interfaces/Ipfs.Ipfs-1.md) \| `undefined`

#### Parameters

| Name    | Type                    |
| :------ | :---------------------- |
| `state` | `any`                   |
| `id`    | `undefined` \| `string` |

#### Returns

[`Ipfs`](../interfaces/Ipfs.Ipfs-1.md) \| `undefined`

#### Defined in

[src/ipfs/selectors/selectByIdSingle.ts:6](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/selectors/selectByIdSingle.ts#L6)

---

## Selectors

Recursively searches for CID at file at &lt;BASE_CID&gt;/path/to/file Functions

### selectPathHash

▸ **selectPathHash**(`state`, `path`): `string` \| `undefined`

#### Parameters

| Name    | Type                    |
| :------ | :---------------------- |
| `state` | `any`                   |
| `path`  | `undefined` \| `string` |

#### Returns

`string` \| `undefined`

#### Defined in

[src/ipfs/selectors/selectPathHash.ts:7](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/ipfs/selectors/selectPathHash.ts#L7)
