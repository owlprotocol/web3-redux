---
id: 'Ipfs.Ipfs-1'
title: 'Interface: Ipfs'
sidebar_label: 'Ipfs'
custom_edit_url: null
---

[Ipfs](../namespaces/Ipfs.md).Ipfs

## Hierarchy

-   [`IpfsId`](Ipfs.IpfsId.md)

    ↳ **`Ipfs`**

## Properties

### contentId

• `Readonly` **contentId**: `string`

ipfs hash

#### Inherited from

[IpfsId](Ipfs.IpfsId.md).[contentId](Ipfs.IpfsId.md#contentid)

#### Defined in

[src/ipfs/model/interface.ts:4](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ipfs/model/interface.ts#L4)

---

### data

• `Optional` `Readonly` **data**: `any`

Decoded data

#### Defined in

[src/ipfs/model/interface.ts:14](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ipfs/model/interface.ts#L14)

---

### linksByName

• `Optional` `Readonly` **linksByName**: `Object`

Links by Name

#### Index signature

▪ [k: `string`]: `Partial`<`PBLink`\>

#### Defined in

[src/ipfs/model/interface.ts:12](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ipfs/model/interface.ts#L12)

---

### pbNode

• `Optional` `Readonly` **pbNode**: `Partial`<`PBNode`\>

Protocol Buffer Node.
See https://github.com/ipld/specs/blob/master/block-layer/codecs/dag-pb.md

#### Defined in

[src/ipfs/model/interface.ts:10](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ipfs/model/interface.ts#L10)
