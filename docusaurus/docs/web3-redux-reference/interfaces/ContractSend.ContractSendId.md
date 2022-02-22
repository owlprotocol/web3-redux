---
id: 'ContractSend.ContractSendId'
title: 'Interface: ContractSendId'
sidebar_label: 'ContractSendId'
custom_edit_url: null
---

[ContractSend](../namespaces/ContractSend.md).ContractSendId

ContractSend id components

## Hierarchy

-   **`ContractSendId`**

    ↳ [`ContractSend`](ContractSend.ContractSend-1.md)

## Properties

### address

• `Readonly` **address**: `string`

Contract ethereum address

#### Defined in

[src/contractsend/model/interface.ts:14](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractsend/model/interface.ts#L14)

---

### args

• `Optional` `Readonly` **args**: `any`[]

Contract method parameters

#### Defined in

[src/contractsend/model/interface.ts:18](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractsend/model/interface.ts#L18)

---

### from

• `Readonly` **from**: `string`

Send address

#### Defined in

[src/contractsend/model/interface.ts:20](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractsend/model/interface.ts#L20)

---

### methodName

• `Readonly` **methodName**: `string`

Contract method name

#### Defined in

[src/contractsend/model/interface.ts:16](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractsend/model/interface.ts#L16)

---

### networkId

• `Readonly` **networkId**: `string`

Blockchain network id.
See [chainlist](https://chainlist.org/) for a list of networks.

#### Defined in

[src/contractsend/model/interface.ts:12](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractsend/model/interface.ts#L12)

---

### value

• `Optional` `Readonly` **value**: `any`

Value sent in wei

#### Defined in

[src/contractsend/model/interface.ts:22](https://github.com/leovigna/web3-redux/blob/cff01f0/src/contractsend/model/interface.ts#L22)
