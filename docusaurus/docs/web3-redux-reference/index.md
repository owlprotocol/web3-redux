---
id: 'index'
title: '@owlprotocol/web3-redux'
slug: '/web3-redux-reference/'
sidebar_label: 'Exports'
sidebar_position: 0.5
custom_edit_url: null
---

## Namespaces

-   [Block](namespaces/Block.md)
-   [Config](namespaces/Config.md)
-   [Contract](namespaces/Contract.md)
-   [ContractEvent](namespaces/ContractEvent.md)
-   [ContractSend](namespaces/ContractSend.md)
-   [EthCall](namespaces/EthCall.md)
-   [Ipfs](namespaces/Ipfs.md)
-   [Network](namespaces/Network.md)
-   [Sync](namespaces/Sync.md)
-   [Transaction](namespaces/Transaction.md)
-   [\_4Byte](namespaces/4Byte.md)

## Interfaces

-   [State](interfaces/State.md)

## Variables

### REDUX_ROOT

• **REDUX_ROOT**: `"web3Redux"`

**`internal`**

#### Defined in

[src/common.ts:2](https://github.com/leovigna/web3-redux/blob/be15552/src/common.ts#L2)

## Functions

### createStore

▸ `Const` **createStore**(`options?`): `Object`

**`internal`**

#### Parameters

| Name       | Type                 |
| :--------- | :------------------- |
| `options?` | `CreateStoreOptions` |

#### Returns

`Object`

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `persistor` | `undefined` \| `Persistor`                      |
| `store`     | `Store`<`EmptyObject` & `Object`, `AnyAction`\> |

#### Defined in

[src/store.ts:30](https://github.com/leovigna/web3-redux/blob/be15552/src/store.ts#L30)

---

### getOrm

▸ **getOrm**(): `any`

**`internal`**

#### Returns

`any`

#### Defined in

[src/orm.ts:19](https://github.com/leovigna/web3-redux/blob/be15552/src/orm.ts#L19)

---

### rootReducer

▸ `Const` **rootReducer**(`state`, `action`): `CombinedState`<`Object`\>

#### Parameters

| Name     | Type                                      |
| :------- | :---------------------------------------- |
| `state`  | `undefined` \| `CombinedState`<`Object`\> |
| `action` | `AnyAction`                               |

#### Returns

`CombinedState`<`Object`\>

#### Defined in

[src/reducer.ts:92](https://github.com/leovigna/web3-redux/blob/be15552/src/reducer.ts#L92)

---

### rootSaga

▸ **rootSaga**(): `Generator`<`AllEffect`<`SagaGenerator`<`FixedTask`<`Generator`<`AllEffect`<`SagaGenerator`<`FixedTask`<`void`\>, `ForkEffect`<`void`\>\>\>, `void`, `unknown`\>\>, `ForkEffect`<`Generator`<`AllEffect`<`SagaGenerator`<`FixedTask`<`void`\>, `ForkEffect`<`void`\>\>\>, `void`, `unknown`\>\>\>\>, `void`, `unknown`\>

#### Returns

`Generator`<`AllEffect`<`SagaGenerator`<`FixedTask`<`Generator`<`AllEffect`<`SagaGenerator`<`FixedTask`<`void`\>, `ForkEffect`<`void`\>\>\>, `void`, `unknown`\>\>, `ForkEffect`<`Generator`<`AllEffect`<`SagaGenerator`<`FixedTask`<`void`\>, `ForkEffect`<`void`\>\>\>, `void`, `unknown`\>\>\>\>, `void`, `unknown`\>

#### Defined in

[src/saga.ts:14](https://github.com/leovigna/web3-redux/blob/be15552/src/saga.ts#L14)
