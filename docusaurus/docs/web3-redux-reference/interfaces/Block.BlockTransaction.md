---
id: 'Block.BlockTransaction'
title: 'Interface: BlockTransaction'
sidebar_label: 'BlockTransaction'
custom_edit_url: null
---

[Block](../namespaces/Block.md).BlockTransaction

Block object with additional data. Typically returned by individual Web3 getBlock request.

**`see`** [BlockHeader](Block.BlockHeader.md).

## Hierarchy

-   [`BlockHeader`](Block.BlockHeader.md)

    ↳ **`BlockTransaction`**

## Properties

### difficulty

• `Optional` `Readonly` **difficulty**: `number`

Integer of the difficulty for this block

#### Defined in

[src/block/model/BlockTransaction.ts:13](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockTransaction.ts#L13)

---

### extraData

• `Optional` `Readonly` **extraData**: `string`

The “extra data” field of this block

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[extraData](Block.BlockHeader.md#extradata)

#### Defined in

[src/block/model/BlockHeader.ts:31](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L31)

---

### gasLimit

• `Optional` `Readonly` **gasLimit**: `number`

The maximum gas allowed in this block

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[gasLimit](Block.BlockHeader.md#gaslimit)

#### Defined in

[src/block/model/BlockHeader.ts:33](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L33)

---

### gasUsed

• `Optional` `Readonly` **gasUsed**: `number`

The total used gas by all transactions in this block

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[gasUsed](Block.BlockHeader.md#gasused)

#### Defined in

[src/block/model/BlockHeader.ts:35](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L35)

---

### hash

• `Optional` `Readonly` **hash**: `string`

32 bytes. Hash of the block. null if a pending block

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[hash](Block.BlockHeader.md#hash)

#### Defined in

[src/block/model/BlockHeader.ts:13](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L13)

---

### id

• `Optional` `Readonly` **id**: `string`

Used to index in redux-orm. Computed as `${networkId}-${number}`

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[id](Block.BlockHeader.md#id)

#### Defined in

[src/block/model/BlockHeader.ts:11](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L11)

---

### logsBloom

• `Optional` `Readonly` **logsBloom**: `string`

256 bytes. The bloom filter for the logs of the block. null if a pending block

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[logsBloom](Block.BlockHeader.md#logsbloom)

#### Defined in

[src/block/model/BlockHeader.ts:21](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L21)

---

### miner

• `Optional` `Readonly` **miner**: `string`

The address of the beneficiary to whom the mining rewards were given

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[miner](Block.BlockHeader.md#miner)

#### Defined in

[src/block/model/BlockHeader.ts:29](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L29)

---

### networkId

• `Readonly` **networkId**: `string`

Blockchain network id. See [chainlist](https://chainlist.org/) for a list of networks.

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[networkId](Block.BlockHeader.md#networkid)

#### Defined in

[src/block/model/id.ts:4](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/id.ts#L4)

---

### nonce

• `Optional` `Readonly` **nonce**: `string`

8 bytes. Hash of the generated proof-of-work. null if a pending block

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[nonce](Block.BlockHeader.md#nonce)

#### Defined in

[src/block/model/BlockHeader.ts:17](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L17)

---

### number

• `Readonly` **number**: `number`

Block number

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[number](Block.BlockHeader.md#number)

#### Defined in

[src/block/model/id.ts:6](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/id.ts#L6)

---

### parentHash

• `Optional` `Readonly` **parentHash**: `string`

32 bytes. Hash of the parent block

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[parentHash](Block.BlockHeader.md#parenthash)

#### Defined in

[src/block/model/BlockHeader.ts:15](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L15)

---

### receiptRoot

• `Optional` `Readonly` **receiptRoot**: `string`

32 bytes. The root of the final receipt trie of the block

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[receiptRoot](Block.BlockHeader.md#receiptroot)

#### Defined in

[src/block/model/BlockHeader.ts:27](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L27)

---

### sha3Uncles

• `Optional` `Readonly` **sha3Uncles**: `string`

32 bytes. SHA3 of the uncles data in the block

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[sha3Uncles](Block.BlockHeader.md#sha3uncles)

#### Defined in

[src/block/model/BlockHeader.ts:19](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L19)

---

### size

• `Optional` `Readonly` **size**: `number`

Integer the size of this block in bytes

#### Defined in

[src/block/model/BlockTransaction.ts:11](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockTransaction.ts#L11)

---

### stateRoot

• `Optional` `Readonly` **stateRoot**: `string`

32 bytes. The root of the final state trie of the block

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[stateRoot](Block.BlockHeader.md#stateroot)

#### Defined in

[src/block/model/BlockHeader.ts:25](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L25)

---

### timestamp

• `Optional` `Readonly` **timestamp**: `string` \| `number`

The unix timestamp for when the block was collated

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[timestamp](Block.BlockHeader.md#timestamp)

#### Defined in

[src/block/model/BlockHeader.ts:37](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L37)

---

### totalDifficulty

• `Optional` `Readonly` **totalDifficulty**: `number`

Integer of the total difficulty of the chain until this block

#### Defined in

[src/block/model/BlockTransaction.ts:15](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockTransaction.ts#L15)

---

### transactionRoot

• `Optional` `Readonly` **transactionRoot**: `string`

32 bytes. The root of the transaction trie of the block

#### Inherited from

[BlockHeader](Block.BlockHeader.md).[transactionRoot](Block.BlockHeader.md#transactionroot)

#### Defined in

[src/block/model/BlockHeader.ts:23](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockHeader.ts#L23)

---

### transactions

• `Optional` `Readonly` **transactions**: `string`[] \| [`Transaction`](Transaction.Transaction-1.md)[]

Transaction objects or ids

#### Defined in

[src/block/model/BlockTransaction.ts:19](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockTransaction.ts#L19)

---

### uncles

• `Optional` `Readonly` **uncles**: `string`[]

Array of uncle hashes

#### Defined in

[src/block/model/BlockTransaction.ts:17](https://github.com/leovigna/web3-redux/blob/bca52d1/src/block/model/BlockTransaction.ts#L17)
