---
id: 'Contract.Contract-1'
title: 'Interface: Contract<T>'
sidebar_label: 'Contract'
custom_edit_url: null
---

[Contract](../namespaces/Contract.md).Contract

Contract object.

## Type parameters

| Name | Type                                                                                                                                        | Description                                                                                                                                                                  |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`BaseWeb3Contract`](../namespaces/Contract.md#baseweb3contract) = [`BaseWeb3Contract`](../namespaces/Contract.md#baseweb3contract) | [TypeChain](https://github.com/dethcrypto/TypeChain) web3.js contract. Enables getting type inference for calls and events. Defaults to standard Web3.js contract interface. |

## Hierarchy

-   [`ContractId`](Contract.ContractId.md)

    ↳ **`Contract`**

## Properties

### abi

• `Optional` `Readonly` **abi**: `AbiItem`[]

Contract ABI

#### Defined in

[src/contract/model/interface.ts:32](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L32)

---

### address

• `Readonly` **address**: `string`

Contract ethereum address

#### Inherited from

[ContractId](Contract.ContractId.md).[address](Contract.ContractId.md#address)

#### Defined in

[src/contract/model/interface.ts:17](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L17)

---

### balance

• `Optional` `Readonly` **balance**: `string`

Account balance in wei

#### Defined in

[src/contract/model/interface.ts:38](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L38)

---

### code

• `Optional` `Readonly` **code**: `string`

Code stored at address

#### Defined in

[src/contract/model/interface.ts:42](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L42)

---

### ens

• `Optional` `Readonly` **ens**: `string`

Ens domain associated with address

#### Defined in

[src/contract/model/interface.ts:44](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L44)

---

### eventAbiBySignature

• `Optional` `Readonly` **eventAbiBySignature**: `Object`

Event abis indexed by signature

#### Index signature

▪ [k: `string`]: `AbiItem`

#### Defined in

[src/contract/model/interface.ts:48](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L48)

---

### fromTransactions

• `Optional` `Readonly` **fromTransactions**: [`Transaction`](Transaction.Transaction-1.md)[]

ORM Relational

#### Defined in

[src/contract/model/interface.ts:51](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L51)

---

### id

• `Optional` `Readonly` **id**: `string`

Used to index contracts in redux-orm. Computed as `${networkId}-${address}`

#### Defined in

[src/contract/model/interface.ts:30](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L30)

---

### label

• `Optional` `Readonly` **label**: `string`

Custom label set by user for address

#### Defined in

[src/contract/model/interface.ts:46](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L46)

---

### networkId

• `Readonly` **networkId**: `string`

Blockchain network id.
See [chainlist](https://chainlist.org/) for a list of networks.

#### Inherited from

[ContractId](Contract.ContractId.md).[networkId](Contract.ContractId.md#networkid)

#### Defined in

[src/contract/model/interface.ts:15](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L15)

---

### nonce

• `Optional` `Readonly` **nonce**: `number`

Account nonce aka number of transactions sent.

#### Defined in

[src/contract/model/interface.ts:40](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L40)

---

### toTransactions

• `Optional` `Readonly` **toTransactions**: [`Transaction`](Transaction.Transaction-1.md)[]

#### Defined in

[src/contract/model/interface.ts:52](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L52)

---

### web3Contract

• `Optional` `Readonly` **web3Contract**: `T`

[web3.eth.Contract](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html) instance

#### Defined in

[src/contract/model/interface.ts:34](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L34)

---

### web3SenderContract

• `Optional` `Readonly` **web3SenderContract**: `T`

[web3.eth.Contract](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html) instance used for send transactions

#### Defined in

[src/contract/model/interface.ts:36](https://github.com/leovigna/web3-redux/blob/bca52d1/src/contract/model/interface.ts#L36)
