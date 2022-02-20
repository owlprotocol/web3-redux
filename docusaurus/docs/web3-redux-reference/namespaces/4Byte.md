---
id: '4Byte'
title: 'Namespace: _4Byte'
sidebar_label: '_4Byte'
sidebar_position: 0
custom_edit_url: null
---

## Interfaces

-   [SignatureId](../interfaces/4Byte.SignatureId.md)
-   [\_4ByteSignature](../interfaces/4Byte._4ByteSignature.md)

## Action Variables

-   [create](4Byte.md#create)

## Actions Variables

-   [fetchEventSignature](4Byte.md#fetcheventsignature)
-   [fetchFunctionSignature](4Byte.md#fetchfunctionsignature)
-   [remove](4Byte.md#remove)
-   [update](4Byte.md#update)

## Other Variables

-   [CREATE](4Byte.md#create)
-   [FETCH_EVENT_SIGNATURE](4Byte.md#fetch_event_signature)
-   [FETCH_FUNCTION_SIGNATURE](4Byte.md#fetch_function_signature)
-   [REMOVE](4Byte.md#remove)
-   [UPDATE](4Byte.md#update)

## Actions Functions

-   [set](4Byte.md#set)

## Other Functions

-   [SET](4Byte.md#set)
-   [isAction](4Byte.md#isaction)
-   [isCreateAction](4Byte.md#iscreateaction)
-   [isFetchEventSignatureAction](4Byte.md#isfetcheventsignatureaction)
-   [isFetchFunctionSignatureAction](4Byte.md#isfetchfunctionsignatureaction)
-   [isReducerAction](4Byte.md#isreduceraction)
-   [isRemoveAction](4Byte.md#isremoveaction)
-   [isSagaAction](4Byte.md#issagaaction)
-   [isSetAction](4Byte.md#issetaction)
-   [isUpdateAction](4Byte.md#isupdateaction)
-   [reducer](4Byte.md#reducer)
-   [saga](4Byte.md#saga)

## Selectors Functions

-   [selectByIdMany](4Byte.md#selectbyidmany)
-   [selectByIdSingle](4Byte.md#selectbyidsingle)

## Type aliases

### Action

Ƭ **Action**: [`ReducerAction`](4Byte.md#reduceraction) \| [`SagaAction`](4Byte.md#sagaaction)

**`internal`**

#### Defined in

[src/4byte/actions/index.ts:35](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/index.ts#L35)

---

### CreateAction

Ƭ **CreateAction**: `ReturnType`<typeof [`create`](4Byte.md#create)\>

**`internal`**

#### Defined in

[src/4byte/actions/create.ts:12](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/create.ts#L12)

---

### FetchEventSignatureAction

Ƭ **FetchEventSignatureAction**: `ReturnType`<typeof [`fetchEventSignature`](4Byte.md#fetcheventsignature)\>

**`internal`**

#### Defined in

[src/4byte/actions/fetchEventSignature.ts:14](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/fetchEventSignature.ts#L14)

---

### FetchFunctionSignatureAction

Ƭ **FetchFunctionSignatureAction**: `ReturnType`<typeof [`fetchFunctionSignature`](4Byte.md#fetchfunctionsignature)\>

**`internal`**

#### Defined in

[src/4byte/actions/fetchFunctionSignature.ts:14](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/fetchFunctionSignature.ts#L14)

---

### ReducerAction

Ƭ **ReducerAction**: [`CreateAction`](4Byte.md#createaction) \| [`RemoveAction`](4Byte.md#removeaction) \| [`UpdateAction`](4Byte.md#updateaction) \| [`SetAction`](4Byte.md#setaction)

**`internal`**

#### Defined in

[src/4byte/actions/index.ts:20](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/index.ts#L20)

---

### RemoveAction

Ƭ **RemoveAction**: `ReturnType`<typeof [`remove`](4Byte.md#remove)\>

**`internal`**

#### Defined in

[src/4byte/actions/remove.ts:14](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/remove.ts#L14)

---

### SagaAction

Ƭ **SagaAction**: [`FetchEventSignatureAction`](4Byte.md#fetcheventsignatureaction) \| [`FetchFunctionSignatureAction`](4Byte.md#fetchfunctionsignatureaction)

**`internal`**

#### Defined in

[src/4byte/actions/index.ts:27](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/index.ts#L27)

---

### SetAction

Ƭ **SetAction**: `ReturnType`<typeof [`set`](4Byte.md#set)\>

**`internal`**

#### Defined in

[src/4byte/actions/set.ts:26](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/set.ts#L26)

---

### UpdateAction

Ƭ **UpdateAction**: `ReturnType`<typeof [`update`](4Byte.md#update)\>

**`internal`**

#### Defined in

[src/4byte/actions/update.ts:12](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/update.ts#L12)

## Action Variables

### create

• **create**: `ActionCreatorWithPreparedPayload`<[payload: \_4ByteSignature], [`_4ByteSignature`](../interfaces/4Byte._4ByteSignature.md), `string`, `never`, `never`\>

#### Defined in

[src/4byte/actions/create.ts:8](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/create.ts#L8)

---

## Actions Variables

### fetchEventSignature

• **fetchEventSignature**: `ActionCreatorWithPreparedPayload`<[payload: SignatureId], [`SignatureId`](../interfaces/4Byte.SignatureId.md), `string`, `never`, `never`\>

#### Defined in

[src/4byte/actions/fetchEventSignature.ts:8](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/fetchEventSignature.ts#L8)

---

### fetchFunctionSignature

• **fetchFunctionSignature**: `ActionCreatorWithPreparedPayload`<[payload: SignatureId], [`SignatureId`](../interfaces/4Byte.SignatureId.md), `string`, `never`, `never`\>

#### Defined in

[src/4byte/actions/fetchFunctionSignature.ts:8](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/fetchFunctionSignature.ts#L8)

---

### remove

• **remove**: `ActionCreatorWithPreparedPayload`<[payload: SignatureId], { `signatureHash`: `string` = payload.signatureHash }, `string`, `never`, `never`\>

#### Defined in

[src/4byte/actions/remove.ts:8](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/remove.ts#L8)

---

### update

• **update**: `ActionCreatorWithPreparedPayload`<[payload: \_4ByteSignature], [`_4ByteSignature`](../interfaces/4Byte._4ByteSignature.md), `string`, `never`, `never`\>

#### Defined in

[src/4byte/actions/update.ts:8](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/update.ts#L8)

---

## Other Variables

### CREATE

• **CREATE**: `string`

**`internal`**

#### Defined in

[src/4byte/actions/create.ts:6](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/create.ts#L6)

---

### FETCH_EVENT_SIGNATURE

• **FETCH_EVENT_SIGNATURE**: `string`

**`internal`**

#### Defined in

[src/4byte/actions/fetchEventSignature.ts:6](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/fetchEventSignature.ts#L6)

---

### FETCH_FUNCTION_SIGNATURE

• **FETCH_FUNCTION_SIGNATURE**: `string`

**`internal`**

#### Defined in

[src/4byte/actions/fetchFunctionSignature.ts:6](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/fetchFunctionSignature.ts#L6)

---

### REMOVE

• **REMOVE**: `string`

**`internal`**

#### Defined in

[src/4byte/actions/remove.ts:6](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/remove.ts#L6)

---

### UPDATE

• **UPDATE**: `string`

**`internal`**

#### Defined in

[src/4byte/actions/update.ts:6](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/update.ts#L6)

## Actions Functions

### set

▸ `Const` **set**(`payload`): `Object`

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `payload` | `SetActionInput` |

#### Returns

`Object`

| Name                       | Type                                                                                                                                                                                        |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `payload`                  | { `id`: { `signatureHash`: `string` = payload.id.signatureHash } ; `key`: keyof [`_4ByteSignature`](../interfaces/4Byte._4ByteSignature.md) = payload.key; `value`: `any` = payload.value } |
| `payload.id`               | { `signatureHash`: `string` = payload.id.signatureHash }                                                                                                                                    |
| `payload.id.signatureHash` | `string`                                                                                                                                                                                    |
| `payload.key`              | keyof [`_4ByteSignature`](../interfaces/4Byte._4ByteSignature.md)                                                                                                                           |
| `payload.value`            | `any`                                                                                                                                                                                       |
| `type`                     | `string`                                                                                                                                                                                    |

#### Defined in

[src/4byte/actions/set.ts:14](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/set.ts#L14)

---

## Other Functions

### SET

▸ `Const` **SET**(`key`): `string`

**`internal`**

#### Parameters

| Name  | Type                                                              |
| :---- | :---------------------------------------------------------------- |
| `key` | keyof [`_4ByteSignature`](../interfaces/4Byte._4ByteSignature.md) |

#### Returns

`string`

#### Defined in

[src/4byte/actions/set.ts:5](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/set.ts#L5)

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

[src/4byte/actions/index.ts:37](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/index.ts#L37)

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

[src/4byte/actions/create.ts:14](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/create.ts#L14)

---

### isFetchEventSignatureAction

▸ `Const` **isFetchEventSignatureAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/4byte/actions/fetchEventSignature.ts:16](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/fetchEventSignature.ts#L16)

---

### isFetchFunctionSignatureAction

▸ `Const` **isFetchFunctionSignatureAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/4byte/actions/fetchFunctionSignature.ts:16](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/fetchFunctionSignature.ts#L16)

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

[src/4byte/actions/index.ts:22](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/index.ts#L22)

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

[src/4byte/actions/remove.ts:16](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/remove.ts#L16)

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

[src/4byte/actions/index.ts:30](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/index.ts#L30)

---

### isSetAction

▸ `Const` **isSetAction**(`action`): `boolean`

**`internal`**

#### Parameters

| Name                  | Type                                                              |
| :-------------------- | :---------------------------------------------------------------- |
| `action`              | `Object`                                                          |
| `action.payload?`     | `Object`                                                          |
| `action.payload.key?` | keyof [`_4ByteSignature`](../interfaces/4Byte._4ByteSignature.md) |
| `action.type`         | `string`                                                          |

#### Returns

`boolean`

#### Defined in

[src/4byte/actions/set.ts:28](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/set.ts#L28)

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

[src/4byte/actions/update.ts:14](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/actions/update.ts#L14)

---

### reducer

▸ **reducer**(`sess`, `action`): `any`

**`internal`**

#### Parameters

| Name     | Type                                      |
| :------- | :---------------------------------------- |
| `sess`   | `any`                                     |
| `action` | [`ReducerAction`](4Byte.md#reduceraction) |

#### Returns

`any`

#### Defined in

[src/4byte/reducer.ts:7](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/reducer.ts#L7)

---

### saga

▸ **saga**(): `Generator`<`AllEffect`<`SagaGenerator`<`never`, `ForkEffect`<`never`\>\>\>, `void`, `unknown`\>

**`internal`**

#### Returns

`Generator`<`AllEffect`<`SagaGenerator`<`never`, `ForkEffect`<`never`\>\>\>, `void`, `unknown`\>

#### Defined in

[src/4byte/sagas/index.ts:7](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/sagas/index.ts#L7)

---

## Selectors Functions

### selectByIdMany

▸ **selectByIdMany**(`state`, `ids?`): ([`_4ByteSignature`](../interfaces/4Byte._4ByteSignature.md) \| `null`)[]

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `state` | `any`      |
| `ids?`  | `string`[] |

#### Returns

([`_4ByteSignature`](../interfaces/4Byte._4ByteSignature.md) \| `null`)[]

#### Defined in

[src/4byte/selectors/selectByIdMany.ts:6](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/selectors/selectByIdMany.ts#L6)

---

### selectByIdSingle

▸ **selectByIdSingle**(`state`, `id`): [`_4ByteSignature`](../interfaces/4Byte._4ByteSignature.md) \| `undefined`

#### Parameters

| Name    | Type                    |
| :------ | :---------------------- |
| `state` | `any`                   |
| `id`    | `undefined` \| `string` |

#### Returns

[`_4ByteSignature`](../interfaces/4Byte._4ByteSignature.md) \| `undefined`

#### Defined in

[src/4byte/selectors/selectByIdSingle.ts:5](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/4byte/selectors/selectByIdSingle.ts#L5)
