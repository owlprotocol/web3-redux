---
id: 'ContractEvent.ContractEventId'
title: 'Interface: ContractEventId'
sidebar_label: 'ContractEventId'
custom_edit_url: null
---

[ContractEvent](../namespaces/ContractEvent.md).ContractEventId

## Hierarchy

-   **`ContractEventId`**

    ↳ [`ContractEvent`](ContractEvent.ContractEvent-1.md)

## Properties

### blockHash

• `Readonly` **blockHash**: `string`

Block hash when event was emitted

#### Defined in

[src/contractevent/model/interface.ts:11](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/contractevent/model/interface.ts#L11)

---

### logIndex

• `Readonly` **logIndex**: `number`

Unique index within block of event

#### Defined in

[src/contractevent/model/interface.ts:13](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/contractevent/model/interface.ts#L13)

---

### networkId

• `Readonly` **networkId**: `string`

Blockchain network id.
See [chainlist](https://chainlist.org/) for a list of networks.

#### Defined in

[src/contractevent/model/interface.ts:9](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/contractevent/model/interface.ts#L9)
