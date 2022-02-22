---
id: 'ContractEvent.ContractEvent-1'
title: 'Interface: ContractEvent<T>'
sidebar_label: 'ContractEvent'
custom_edit_url: null
---

[ContractEvent](../namespaces/ContractEvent.md).ContractEvent

Contract event log.

**`see`** [web3.eth.Contract.events](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html#events)

## Type parameters

| Name | Type                                                                                                      | Description                                                |
| :--- | :-------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| `T`  | extends [`ReturnValues`](ContractEvent.ReturnValues.md) = [`ReturnValues`](ContractEvent.ReturnValues.md) | optional type for return values. Defaults to `any` object. |

## Hierarchy

-   [`ContractEventId`](ContractEvent.ContractEventId.md)

    ↳ **`ContractEvent`**

## Properties

### address

• `Readonly` **address**: `string`

Address of contract that emitted event

#### Defined in

[src/contractevent/model/interface.ts:33](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L33)

---

### blockHash

• `Readonly` **blockHash**: `string`

Block hash when event was emitted

#### Inherited from

[ContractEventId](ContractEvent.ContractEventId.md).[blockHash](ContractEvent.ContractEventId.md#blockhash)

#### Defined in

[src/contractevent/model/interface.ts:11](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L11)

---

### contractId

• `Optional` `Readonly` **contractId**: `string`

redux-orm id of contract `${networkId}-{address}`

#### Defined in

[src/contractevent/model/interface.ts:30](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L30)

---

### data

• `Optional` `Readonly` **data**: `string`

Raw non-indexed log data

#### Defined in

[src/contractevent/model/interface.ts:47](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L47)

---

### id

• `Optional` `Readonly` **id**: `string`

Used to index contract events in redux-orm. Computed as `${networkId}-${blockHash}-{logIndex}`

#### Defined in

[src/contractevent/model/interface.ts:28](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L28)

---

### indexIds

• `Optional` `Readonly` **indexIds**: `string`[]

ContractEventIndex redux-orm ids. Used for efficient filtering.

#### Defined in

[src/contractevent/model/interface.ts:43](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L43)

---

### logIndex

• `Readonly` **logIndex**: `number`

Unique index within block of event

#### Inherited from

[ContractEventId](ContractEvent.ContractEventId.md).[logIndex](ContractEvent.ContractEventId.md#logindex)

#### Defined in

[src/contractevent/model/interface.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L13)

---

### name

• `Optional` `Readonly` **name**: `string`

Event name

#### Defined in

[src/contractevent/model/interface.ts:37](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L37)

---

### networkId

• `Readonly` **networkId**: `string`

Blockchain network id.
See [chainlist](https://chainlist.org/) for a list of networks.

#### Inherited from

[ContractEventId](ContractEvent.ContractEventId.md).[networkId](ContractEvent.ContractEventId.md#networkid)

#### Defined in

[src/contractevent/model/interface.ts:9](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L9)

---

### returnValues

• `Optional` `Readonly` **returnValues**: `T`[``"returnValues"``]

Return values of event

#### Defined in

[src/contractevent/model/interface.ts:39](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L39)

---

### returnValuesIndexKeys

• `Optional` `Readonly` **returnValuesIndexKeys**: `boolean` \| `string`[]

Keys of `returnValues` to index event on

#### Defined in

[src/contractevent/model/interface.ts:41](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L41)

---

### topics

• `Optional` `Readonly` **topics**: `string`[]

Raw indexed data

#### Defined in

[src/contractevent/model/interface.ts:49](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractevent/model/interface.ts#L49)
