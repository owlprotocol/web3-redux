---
id: 'Block.BlockHeader'
title: 'Interface: BlockHeader'
sidebar_label: 'BlockHeader'
custom_edit_url: null
---

[Block](../namespaces/Block.md).BlockHeader

Block header object. Typically returned by Web3 websocket subscriptions.
Extends the web3 interface.
See [web3.eth.getBlock](https://web3js.readthedocs.io/en/v1.5.2/web3-eth.html#getblock)

## Hierarchy

-   [`BlockId`](Block.BlockId.md)

    ↳ **`BlockHeader`**

    ↳↳ [`BlockTransaction`](Block.BlockTransaction.md)

## Properties

### extraData

• `Optional` `Readonly` **extraData**: `string`

The “extra data” field of this block

#### Defined in

[src/block/model/BlockHeader.ts:31](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L31)

---

### gasLimit

• `Optional` `Readonly` **gasLimit**: `number`

The maximum gas allowed in this block

#### Defined in

[src/block/model/BlockHeader.ts:33](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L33)

---

### gasUsed

• `Optional` `Readonly` **gasUsed**: `number`

The total used gas by all transactions in this block

#### Defined in

[src/block/model/BlockHeader.ts:35](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L35)

---

### hash

• `Optional` `Readonly` **hash**: `string`

32 bytes. Hash of the block. null if a pending block

#### Defined in

[src/block/model/BlockHeader.ts:13](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L13)

---

### id

• `Optional` `Readonly` **id**: `string`

Used to index in redux-orm. Computed as `${networkId}-${number}`

#### Defined in

[src/block/model/BlockHeader.ts:11](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L11)

---

### logsBloom

• `Optional` `Readonly` **logsBloom**: `string`

256 bytes. The bloom filter for the logs of the block. null if a pending block

#### Defined in

[src/block/model/BlockHeader.ts:21](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L21)

---

### miner

• `Optional` `Readonly` **miner**: `string`

The address of the beneficiary to whom the mining rewards were given

#### Defined in

[src/block/model/BlockHeader.ts:29](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L29)

---

### networkId

• `Readonly` **networkId**: `string`

Blockchain network id. See [chainlist](https://chainlist.org/) for a list of networks.

#### Inherited from

[BlockId](Block.BlockId.md).[networkId](Block.BlockId.md#networkid)

#### Defined in

[src/block/model/id.ts:4](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/id.ts#L4)

---

### nonce

• `Optional` `Readonly` **nonce**: `string`

8 bytes. Hash of the generated proof-of-work. null if a pending block

#### Defined in

[src/block/model/BlockHeader.ts:17](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L17)

---

### number

• `Readonly` **number**: `number`

Block number

#### Inherited from

[BlockId](Block.BlockId.md).[number](Block.BlockId.md#number)

#### Defined in

[src/block/model/id.ts:6](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/id.ts#L6)

---

### parentHash

• `Optional` `Readonly` **parentHash**: `string`

32 bytes. Hash of the parent block

#### Defined in

[src/block/model/BlockHeader.ts:15](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L15)

---

### receiptRoot

• `Optional` `Readonly` **receiptRoot**: `string`

32 bytes. The root of the final receipt trie of the block

#### Defined in

[src/block/model/BlockHeader.ts:27](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L27)

---

### sha3Uncles

• `Optional` `Readonly` **sha3Uncles**: `string`

32 bytes. SHA3 of the uncles data in the block

#### Defined in

[src/block/model/BlockHeader.ts:19](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L19)

---

### stateRoot

• `Optional` `Readonly` **stateRoot**: `string`

32 bytes. The root of the final state trie of the block

#### Defined in

[src/block/model/BlockHeader.ts:25](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L25)

---

### timestamp

• `Optional` `Readonly` **timestamp**: `string` \| `number`

The unix timestamp for when the block was collated

#### Defined in

[src/block/model/BlockHeader.ts:37](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L37)

---

### transactionRoot

• `Optional` `Readonly` **transactionRoot**: `string`

32 bytes. The root of the transaction trie of the block

#### Defined in

[src/block/model/BlockHeader.ts:23](https://github.com/leovigna/web3-redux/blob/cff01f0/src/block/model/BlockHeader.ts#L23)
