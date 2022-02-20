---
id: 'Transaction.Transaction-1'
title: 'Interface: Transaction'
sidebar_label: 'Transaction'
custom_edit_url: null
---

[Transaction](../namespaces/Transaction.md).Transaction

Transaction object.
Extends the web3 interface.

## Hierarchy

-   [`TransactionId`](Transaction.TransactionId.md)

    ↳ **`Transaction`**

## Properties

### blockHash

• `Optional` `Readonly` **blockHash**: `null` \| `string`

32 bytes. Hash of the block where this transaction was in. `null` if pending

#### Defined in

[src/transaction/model/interface.ts:29](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L29)

---

### blockNumber

• `Optional` `Readonly` **blockNumber**: `null` \| `number`

Block number where this transaction was in. `null` if pending

#### Defined in

[src/transaction/model/interface.ts:31](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L31)

---

### confirmations

• `Optional` `Readonly` **confirmations**: `number`

Confirmed blocks

#### Defined in

[src/transaction/model/interface.ts:61](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L61)

---

### contractAddress

• `Optional` `Readonly` **contractAddress**: `string`

Etherscan contract genesis tx

#### Defined in

[src/transaction/model/interface.ts:63](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L63)

---

### cumulativeGasUsed

• `Optional` `Readonly` **cumulativeGasUsed**: `number`

Total gas used

#### Defined in

[src/transaction/model/interface.ts:48](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L48)

---

### effectiveGasPrice

• `Optional` `Readonly` **effectiveGasPrice**: `number`

The actual value per gas deducted from the senders account.
Before EIP-1559, this is equal to the transaction’s gas price.
After, it is equal to
baseFeePerGas + min(maxFeePerGas - baseFeePerGas, maxPriorityFeePerGas).

#### Defined in

[src/transaction/model/interface.ts:54](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L54)

---

### from

• `Optional` `Readonly` **from**: `string`

Address of the sender

#### Defined in

[src/transaction/model/interface.ts:35](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L35)

---

### gas

• `Optional` `Readonly` **gas**: `number`

Gas provided by the sender

#### Defined in

[src/transaction/model/interface.ts:44](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L44)

---

### gasPrice

• `Optional` `Readonly` **gasPrice**: `string`

Gas price provided by the sender in wei

#### Defined in

[src/transaction/model/interface.ts:42](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L42)

---

### gasUsed

• `Optional` `Readonly` **gasUsed**: `number`

Gas used

#### Defined in

[src/transaction/model/interface.ts:46](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L46)

---

### hash

• `Readonly` **hash**: `string`

Transaction hash.

Should be unique to blockchain if using proper replay protection but we still use `networkId` just in case.
This is also consistent with how other data in the store is indexed by network.

#### Inherited from

[TransactionId](Transaction.TransactionId.md).[hash](Transaction.TransactionId.md#hash)

#### Defined in

[src/transaction/model/interface.ts:15](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L15)

---

### id

• `Optional` `Readonly` **id**: `string`

Used to index transactions in redux-orm. Computed as `${networkId}-${hash}`.

#### Defined in

[src/transaction/model/interface.ts:25](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L25)

---

### input

• `Optional` `Readonly` **input**: `string`

The data sent along with the transaction

#### Defined in

[src/transaction/model/interface.ts:57](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L57)

---

### networkId

• `Readonly` **networkId**: `string`

Blockchain network id.
See [chainlist](https://chainlist.org/) for a list of networks.

#### Inherited from

[TransactionId](Transaction.TransactionId.md).[networkId](Transaction.TransactionId.md#networkid)

#### Defined in

[src/transaction/model/interface.ts:10](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L10)

---

### nonce

• `Optional` `Readonly` **nonce**: `number`

The number of transactions made by the sender prior to this one.

#### Defined in

[src/transaction/model/interface.ts:27](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L27)

---

### receipt

• `Optional` `Readonly` **receipt**: `TransactionReceipt`

Transaction receipt.

#### Defined in

[src/transaction/model/interface.ts:59](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L59)

---

### timeStamp

• `Optional` `Readonly` **timeStamp**: `number`

Ethersan timestamp

#### Defined in

[src/transaction/model/interface.ts:65](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L65)

---

### to

• `Optional` `Readonly` **to**: `null` \| `string`

Address of the receiver. `null` if it’s a contract creation transaction

#### Defined in

[src/transaction/model/interface.ts:37](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L37)

---

### transactionIndex

• `Optional` `Readonly` **transactionIndex**: `null` \| `number`

Integer of the transactions index position in the block. `null` if pending

#### Defined in

[src/transaction/model/interface.ts:33](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L33)

---

### value

• `Optional` `Readonly` **value**: `string`

Value transferred in wei

#### Defined in

[src/transaction/model/interface.ts:39](https://github.com/leovigna/web3-redux/blob/2db3cc0/src/transaction/model/interface.ts#L39)
