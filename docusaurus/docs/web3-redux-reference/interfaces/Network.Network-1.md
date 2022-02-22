---
id: 'Network.Network-1'
title: 'Interface: Network'
sidebar_label: 'Network'
custom_edit_url: null
---

[Network](../namespaces/Network.md).Network

EVM Network object.
Other objects are indexed on its networkId, and use it to fetch it to make requests using its web3.js connection.

## Hierarchy

-   `NetworkId`

    ↳ **`Network`**

## Properties

### ens

• `Optional` `Readonly` **ens**: `string`

Ens domain

#### Defined in

[src/network/model/interface.ts:40](https://github.com/leovigna/web3-redux/blob/cff01f0/src/network/model/interface.ts#L40)

---

### explorerApiKey

• `Optional` `Readonly` **explorerApiKey**: `string`

Block explorer API key

#### Defined in

[src/network/model/interface.ts:38](https://github.com/leovigna/web3-redux/blob/cff01f0/src/network/model/interface.ts#L38)

---

### explorerApiUrl

• `Optional` `Readonly` **explorerApiUrl**: `string`

Block explorer API url (eg. Etherscan) to use for indexed explorer data

#### Defined in

[src/network/model/interface.ts:36](https://github.com/leovigna/web3-redux/blob/cff01f0/src/network/model/interface.ts#L36)

---

### explorerUrl

• `Optional` `Readonly` **explorerUrl**: `string`

Block explorer (eg. Etherscan) to use for network.

#### Defined in

[src/network/model/interface.ts:34](https://github.com/leovigna/web3-redux/blob/cff01f0/src/network/model/interface.ts#L34)

---

### latestBlockNumber

• `Optional` `Readonly` **latestBlockNumber**: `number`

Latest block nummber. Updated via getBlockNumber() or middleware tracking block subscription updates.

#### Defined in

[src/network/model/interface.ts:32](https://github.com/leovigna/web3-redux/blob/cff01f0/src/network/model/interface.ts#L32)

---

### name

• `Optional` `Readonly` **name**: `string`

Human readable name for the network

#### Defined in

[src/network/model/interface.ts:18](https://github.com/leovigna/web3-redux/blob/cff01f0/src/network/model/interface.ts#L18)

---

### networkId

• `Readonly` **networkId**: `string`

Blockchain network id.
See [chainlist](https://chainlist.org/) for a list of networks.

#### Inherited from

NetworkId.networkId

#### Defined in

[src/network/model/interface.ts:8](https://github.com/leovigna/web3-redux/blob/cff01f0/src/network/model/interface.ts#L8)

---

### web3

• `Optional` `Readonly` **web3**: `default`

Web3 object. We recommend using a websocket connection.

#### Defined in

[src/network/model/interface.ts:22](https://github.com/leovigna/web3-redux/blob/cff01f0/src/network/model/interface.ts#L22)

---

### web3Rpc

• `Optional` `Readonly` **web3Rpc**: `string`

Web3 RPC URL (websocket recommended). Used to generate Web3 instance.

#### Defined in

[src/network/model/interface.ts:20](https://github.com/leovigna/web3-redux/blob/cff01f0/src/network/model/interface.ts#L20)

---

### web3Sender

• `Optional` `Readonly` **web3Sender**: `default`

Web3 object specialized for sending transactions.

#### Defined in

[src/network/model/interface.ts:24](https://github.com/leovigna/web3-redux/blob/cff01f0/src/network/model/interface.ts#L24)
