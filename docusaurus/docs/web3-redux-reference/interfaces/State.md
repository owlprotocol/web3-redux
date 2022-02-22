---
id: 'State'
title: 'Interface: State'
sidebar_label: 'State'
sidebar_position: 0
custom_edit_url: null
---

Redux State Interface for the `web3Redux` slice.

## Properties

### @@\_\_\_\_\_\_\_REDUX_ORM_STATE_FLAG

• **@@\_\_\_\_\_\_\_REDUX_ORM_STATE_FLAG**: `boolean`

Redux ORM

#### Defined in

[src/state.ts:24](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L24)

---

### Block

• **Block**: `Object`

Blocks indexed by id

#### Type declaration

| Name                | Type                                                                       |
| :------------------ | :------------------------------------------------------------------------- |
| `indexes`           | { `networkId`: { `[networkId: string]`: `string`[]; } }                    |
| `indexes.networkId` | { `[networkId: string]`: `string`[]; }                                     |
| `items`             | `string`[]                                                                 |
| `itemsById`         | { `[id: string]`: `ModelWithId`<[`BlockHeader`](Block.BlockHeader.md)\>; } |

#### Defined in

[src/state.ts:33](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L33)

---

### Config

• **Config**: `Object`

Singleton global config

#### Type declaration

| Name          | Type                                                    |
| :------------ | :------------------------------------------------------ |
| `items`       | [``0``]                                                 |
| `itemsById`   | { `0`: `ModelWithId`<[`Config`](Config.Config-1.md)\> } |
| `itemsById.0` | `ModelWithId`<[`Config`](Config.Config-1.md)\>          |

#### Defined in

[src/state.ts:105](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L105)

---

### Contract

• **Contract**: `Object`

Contracts indexed by id

#### Type declaration

| Name                | Type                                                                      |
| :------------------ | :------------------------------------------------------------------------ |
| `indexes`           | { `networkId`: { `[networkId: string]`: `string`[]; } }                   |
| `indexes.networkId` | { `[networkId: string]`: `string`[]; }                                    |
| `items`             | `string`[]                                                                |
| `itemsById`         | { `[id: string]`: `ModelWithId`<[`Contract`](Contract.Contract-1.md)\>; } |

#### Defined in

[src/state.ts:62](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L62)

---

### ContractEvent

• **ContractEvent**: `Object`

Contract Events indexed by id

#### Type declaration

| Name                 | Type                                                                                                            |
| :------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `indexes`            | { `contractId`: { `[contractId: string]`: `string`[]; } ; `networkId`: { `[networkId: string]`: `string`[]; } } |
| `indexes.contractId` | { `[contractId: string]`: `string`[]; }                                                                         |
| `indexes.networkId`  | { `[networkId: string]`: `string`[]; }                                                                          |
| `items`              | `string`[]                                                                                                      |
| `itemsById`          | { `[id: string]`: `ModelWithId`<[`ContractEvent`](ContractEvent.ContractEvent-1.md)\>; }                        |

#### Defined in

[src/state.ts:72](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L72)

---

### ContractEventIndex

• **ContractEventIndex**: `Object`

Custom index to efficiently filter events

#### Type declaration

| Name        | Type                                                      |
| :---------- | :-------------------------------------------------------- |
| `items`     | `string`[]                                                |
| `itemsById` | { `[id: string]`: `ModelWithId`<`ContractEventIndex`\>; } |

#### Defined in

[src/state.ts:85](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L85)

---

### ContractEventIndexIds

• **ContractEventIndexIds**: `Object`

Join table for events and indices

#### Type declaration

| Name                             | Type                                                                                                                                                  |
| :------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `indexes`                        | { `fromContractEventId`: { `[contractEventId: string]`: `string`[]; } ; `toContractEventIndexId`: { `[contractEventIndexId: string]`: `string`[]; } } |
| `indexes.fromContractEventId`    | { `[contractEventId: string]`: `string`[]; }                                                                                                          |
| `indexes.toContractEventIndexId` | { `[contractEventIndexId: string]`: `string`[]; }                                                                                                     |
| `items`                          | `string`[]                                                                                                                                            |
| `itemsById`                      | { `[id: string]`: `any`; }                                                                                                                            |

#### Defined in

[src/state.ts:124](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L124)

---

### ContractSend

• **ContractSend**: `Object`

ContractSend indexed by id

#### Type declaration

| Name                    | Type                                                                                  |
| :---------------------- | :------------------------------------------------------------------------------------ |
| `indexes`               | { `transactionId`: { `[transactionId: string]`: `string`[]; } }                       |
| `indexes.transactionId` | { `[transactionId: string]`: `string`[]; }                                            |
| `items`                 | `string`[]                                                                            |
| `itemsById`             | { `[id: string]`: `ModelWithId`<[`ContractSend`](ContractSend.ContractSend-1.md)\>; } |

#### Defined in

[src/state.ts:90](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L90)

---

### EthCall

• **EthCall**: `Object`

EthCalls indexed by id

#### Type declaration

| Name        | Type                                                                   |
| :---------- | :--------------------------------------------------------------------- |
| `items`     | `string`[]                                                             |
| `itemsById` | { `[id: string]`: `ModelWithId`<[`EthCall`](EthCall.EthCall-1.md)\>; } |

#### Defined in

[src/state.ts:100](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L100)

---

### Ipfs

• **Ipfs**: `Object`

#### Type declaration

| Name        | Type                                          |
| :---------- | :-------------------------------------------- |
| `items`     | `string`[]                                    |
| `itemsById` | { `[id: string]`: [`Ipfs`](Ipfs.Ipfs-1.md); } |

#### Defined in

[src/state.ts:119](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L119)

---

### Network

• **Network**: `Object`

Networks indexed by id

#### Type declaration

| Name        | Type                                                          |
| :---------- | :------------------------------------------------------------ |
| `items`     | `string`[]                                                    |
| `itemsById` | { `[networkId: string]`: [`Network`](Network.Network-1.md); } |

#### Defined in

[src/state.ts:28](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L28)

---

### Sync

• **Sync**: `Object`

#### Type declaration

| Name        | Type                                                                      |
| :---------- | :------------------------------------------------------------------------ |
| `items`     | `string`[]                                                                |
| `itemsById` | { `[id: string]`: `ModelWithId`<[`Sync`](../namespaces/Sync.md#sync)\>; } |

#### Defined in

[src/state.ts:115](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L115)

---

### Transaction

• **Transaction**: `Object`

Transactions indexed by id

#### Type declaration

| Name                | Type                                                                                                                                                                                                  |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `indexes`           | { `blockId`: { `[blockId: string]`: `string`[]; } ; `fromId`: { `[fromId: string]`: `string`[]; } ; `networkId`: { `[networkId: string]`: `string`[]; } ; `toId`: { `[toId: string]`: `string`[]; } } |
| `indexes.blockId`   | { `[blockId: string]`: `string`[]; }                                                                                                                                                                  |
| `indexes.fromId`    | { `[fromId: string]`: `string`[]; }                                                                                                                                                                   |
| `indexes.networkId` | { `[networkId: string]`: `string`[]; }                                                                                                                                                                |
| `indexes.toId`      | { `[toId: string]`: `string`[]; }                                                                                                                                                                     |
| `items`             | `string`[]                                                                                                                                                                                            |
| `itemsById`         | { `[id: string]`: `ModelWithId`<[`Transaction`](Transaction.Transaction-1.md)\>; }                                                                                                                    |

#### Defined in

[src/state.ts:43](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L43)

---

### \_4Byte

• **\_4Byte**: `Object`

4Byte elements indexed by id

#### Type declaration

| Name        | Type                                                                               |
| :---------- | :--------------------------------------------------------------------------------- |
| `items`     | `string`[]                                                                         |
| `itemsById` | { `[id: string]`: `ModelWithId`<[`_4ByteSignature`](4Byte._4ByteSignature.md)\>; } |

#### Defined in

[src/state.ts:110](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L110)

---

### \_persist

• **\_persist**: `Object`

Redux Persist

#### Type declaration

| Name         | Type      |
| :----------- | :-------- |
| `rehydrated` | `boolean` |
| `version`    | `number`  |

#### Defined in

[src/state.ts:26](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/state.ts#L26)
