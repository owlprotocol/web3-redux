---
id: 'ContractSend.ContractSend-1'
title: 'Interface: ContractSend'
sidebar_label: 'ContractSend'
custom_edit_url: null
---

[ContractSend](../namespaces/ContractSend.md).ContractSend

## Hierarchy

-   [`ContractSendId`](ContractSend.ContractSendId.md)

    ↳ **`ContractSend`**

## Properties

### address

• `Readonly` **address**: `string`

Contract ethereum address

#### Inherited from

[ContractSendId](ContractSend.ContractSendId.md).[address](ContractSend.ContractSendId.md#address)

#### Defined in

[src/contractsend/model/interface.ts:14](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L14)

---

### args

• `Optional` `Readonly` **args**: `any`[]

Contract method parameters

#### Inherited from

[ContractSendId](ContractSend.ContractSendId.md).[args](ContractSend.ContractSendId.md#args)

#### Defined in

[src/contractsend/model/interface.ts:18](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L18)

---

### blockHash

• `Optional` `Readonly` **blockHash**: `string`

First confirmed block hash

#### Defined in

[src/contractsend/model/interface.ts:58](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L58)

---

### blockNumber

• `Optional` `Readonly` **blockNumber**: `number`

First confirmed block number

#### Defined in

[src/contractsend/model/interface.ts:56](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L56)

---

### confirmations

• `Optional` `Readonly` **confirmations**: `number`

Confirmation blocks

#### Defined in

[src/contractsend/model/interface.ts:54](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L54)

---

### contractId

• `Optional` `Readonly` **contractId**: `string`

redux-orm id of contract send `${networkId}-{address}`

#### Defined in

[src/contractsend/model/interface.ts:42](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L42)

---

### error

• `Optional` `Readonly` **error**: `any`

Error

#### Defined in

[src/contractsend/model/interface.ts:50](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L50)

---

### from

• `Readonly` **from**: `string`

Send address

#### Inherited from

[ContractSendId](ContractSend.ContractSendId.md).[from](ContractSend.ContractSendId.md#from)

#### Defined in

[src/contractsend/model/interface.ts:20](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L20)

---

### id

• `Optional` `Readonly` **id**: `string`

Used to index send data in redux-orm. Computed as `${networkId}-${address}-{methodName}-{[args]}-{options}`

#### Defined in

[src/contractsend/model/interface.ts:40](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L40)

---

### methodName

• `Readonly` **methodName**: `string`

Contract method name

#### Inherited from

[ContractSendId](ContractSend.ContractSendId.md).[methodName](ContractSend.ContractSendId.md#methodname)

#### Defined in

[src/contractsend/model/interface.ts:16](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L16)

---

### networkId

• `Readonly` **networkId**: `string`

Blockchain network id.
See [chainlist](https://chainlist.org/) for a list of networks.

#### Inherited from

[ContractSendId](ContractSend.ContractSendId.md).[networkId](ContractSend.ContractSendId.md#networkid)

#### Defined in

[src/contractsend/model/interface.ts:12](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L12)

---

### receipt

• `Optional` `Readonly` **receipt**: `any`

Receipt generated once data sent to node

#### Defined in

[src/contractsend/model/interface.ts:52](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L52)

---

### status

• `Readonly` **status**: [`ContractSendStatus`](../enums/ContractSend.ContractSendStatus.md)

Track status of send transaction

#### Defined in

[src/contractsend/model/interface.ts:48](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L48)

---

### transactionHash

• `Optional` `Readonly` **transactionHash**: `string`

Transaction hash. Generated once data is signed.`

#### Defined in

[src/contractsend/model/interface.ts:44](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L44)

---

### transactionId

• `Optional` `Readonly` **transactionId**: `string`

redux-orm id of transaction `${networkId}-{transactionHash}`

#### Defined in

[src/contractsend/model/interface.ts:46](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L46)

---

### value

• `Optional` `Readonly` **value**: `any`

Value sent in wei

#### Inherited from

[ContractSendId](ContractSend.ContractSendId.md).[value](ContractSend.ContractSendId.md#value)

#### Defined in

[src/contractsend/model/interface.ts:22](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contractsend/model/interface.ts#L22)
