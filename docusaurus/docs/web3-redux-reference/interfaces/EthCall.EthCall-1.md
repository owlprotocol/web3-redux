---
id: 'EthCall.EthCall-1'
title: 'Interface: EthCall'
sidebar_label: 'EthCall'
custom_edit_url: null
---

[EthCall](../namespaces/EthCall.md).EthCall

## Hierarchy

-   [`EthCallId`](EthCall.EthCallId.md)

    ↳ **`EthCall`**

## Properties

### data

• `Readonly` **data**: `string`

`data` field for call

#### Inherited from

[EthCallId](EthCall.EthCallId.md).[data](EthCall.EthCallId.md#data)

#### Defined in

[src/ethcall/model/interface.ts:14](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/ethcall/model/interface.ts#L14)

---

### defaultBlock

• `Optional` `Readonly` **defaultBlock**: `number` \| `"latest"`

Historical block height to execute call. Defaults to `latest`

#### Inherited from

[EthCallId](EthCall.EthCallId.md).[defaultBlock](EthCall.EthCallId.md#defaultblock)

#### Defined in

[src/ethcall/model/interface.ts:16](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/ethcall/model/interface.ts#L16)

---

### from

• `Optional` `Readonly` **from**: `string`

`from` field of call. Some providers may default this to `null` or `ADDRESS_0`.

#### Inherited from

[EthCallId](EthCall.EthCallId.md).[from](EthCall.EthCallId.md#from)

#### Defined in

[src/ethcall/model/interface.ts:18](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/ethcall/model/interface.ts#L18)

---

### gas

• `Optional` `Readonly` **gas**: `number`

Maximum `gas` field for call.

#### Inherited from

[EthCallId](EthCall.EthCallId.md).[gas](EthCall.EthCallId.md#gas)

#### Defined in

[src/ethcall/model/interface.ts:20](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/ethcall/model/interface.ts#L20)

---

### id

• `Optional` `Readonly` **id**: `string`

redux-orm id of call `${networkId}-{address}(data)-{options}`

#### Defined in

[src/ethcall/model/interface.ts:24](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/ethcall/model/interface.ts#L24)

---

### networkId

• `Readonly` **networkId**: `string`

Blockchain network id.
See [chainlist](https://chainlist.org/) for a list of networks.

#### Inherited from

[EthCallId](EthCall.EthCallId.md).[networkId](EthCall.EthCallId.md#networkid)

#### Defined in

[src/ethcall/model/interface.ts:10](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/ethcall/model/interface.ts#L10)

---

### returnValue

• `Optional` `Readonly` **returnValue**: `any`

Return value of call. Can be raw bytes or decoded with a contract ABI.

#### Defined in

[src/ethcall/model/interface.ts:26](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/ethcall/model/interface.ts#L26)

---

### to

• `Readonly` **to**: `string`

`to` field of call

#### Inherited from

[EthCallId](EthCall.EthCallId.md).[to](EthCall.EthCallId.md#to)

#### Defined in

[src/ethcall/model/interface.ts:12](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/ethcall/model/interface.ts#L12)
