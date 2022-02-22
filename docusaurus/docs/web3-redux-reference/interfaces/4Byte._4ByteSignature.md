---
id: '4Byte._4ByteSignature'
title: 'Interface: _4ByteSignature'
sidebar_label: '_4ByteSignature'
custom_edit_url: null
---

[\_4Byte](../namespaces/4Byte.md).\_4ByteSignature

## Hierarchy

-   [`SignatureId`](4Byte.SignatureId.md)

    ↳ **`_4ByteSignature`**

## Properties

### preImage

• `Optional` `Readonly` **preImage**: `string`

Pre-image

#### Defined in

[src/4byte/model/interface.ts:8](https://github.com/leovigna/web3-redux/blob/bca52d1/src/4byte/model/interface.ts#L8)

---

### signatureHash

• `Readonly` **signatureHash**: `string`

keccak256 hash event signature or 4byte function signature

#### Inherited from

[SignatureId](4Byte.SignatureId.md).[signatureHash](4Byte.SignatureId.md#signaturehash)

#### Defined in

[src/4byte/model/interface.ts:3](https://github.com/leovigna/web3-redux/blob/bca52d1/src/4byte/model/interface.ts#L3)

---

### signatureType

• `Optional` `Readonly` **signatureType**: `"Event"` \| `"Function"`

Signature type

#### Defined in

[src/4byte/model/interface.ts:10](https://github.com/leovigna/web3-redux/blob/bca52d1/src/4byte/model/interface.ts#L10)
