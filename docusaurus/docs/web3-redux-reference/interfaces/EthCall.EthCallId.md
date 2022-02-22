---
id: 'EthCall.EthCallId'
title: 'Interface: EthCallId'
sidebar_label: 'EthCallId'
custom_edit_url: null
---

[EthCall](../namespaces/EthCall.md).EthCallId

EthCall id components

## Hierarchy

-   **`EthCallId`**

    ↳ [`EthCall`](EthCall.EthCall-1.md)

## Properties

### data

• `Readonly` **data**: `string`

`data` field for call

#### Defined in

[src/ethcall/model/interface.ts:14](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/model/interface.ts#L14)

---

### defaultBlock

• `Optional` `Readonly` **defaultBlock**: `number` \| `"latest"`

Historical block height to execute call. Defaults to `latest`

#### Defined in

[src/ethcall/model/interface.ts:16](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/model/interface.ts#L16)

---

### from

• `Optional` `Readonly` **from**: `string`

`from` field of call. Some providers may default this to `null` or `ADDRESS_0`.

#### Defined in

[src/ethcall/model/interface.ts:18](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/model/interface.ts#L18)

---

### gas

• `Optional` `Readonly` **gas**: `number`

Maximum `gas` field for call.

#### Defined in

[src/ethcall/model/interface.ts:20](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/model/interface.ts#L20)

---

### networkId

• `Readonly` **networkId**: `string`

Blockchain network id.
See [chainlist](https://chainlist.org/) for a list of networks.

#### Defined in

[src/ethcall/model/interface.ts:10](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/model/interface.ts#L10)

---

### to

• `Readonly` **to**: `string`

`to` field of call

#### Defined in

[src/ethcall/model/interface.ts:12](https://github.com/leovigna/web3-redux/blob/cff01f0/src/ethcall/model/interface.ts#L12)
