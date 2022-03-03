---
id: 'Environment'
title: 'Namespace: Environment'
sidebar_label: 'Environment'
sidebar_position: 0
custom_edit_url: null
---

Environment variable utilities.

## Variables

### ARBITRUM_RINKEBY_RPC

• **ARBITRUM_RINKEBY_RPC**: `undefined` \| `string`

#### Defined in

[src/environment.ts:58](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L58)

---

### ARBITRUM_RPC

• **ARBITRUM_RPC**: `undefined` \| `string`

#### Defined in

[src/environment.ts:56](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L56)

---

### ETHERSCAN_API_KEY

• **ETHERSCAN_API_KEY**: `undefined` \| `string`

Etherscan API Key

#### Defined in

[src/environment.ts:34](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L34)

---

### GANACHE_RPC

• **GANACHE_RPC**: `string`

Local Ganache Blockchain

#### Defined in

[src/environment.ts:38](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L38)

---

### GOERLI_RPC

• **GOERLI_RPC**: `undefined` \| `string`

#### Defined in

[src/environment.ts:46](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L46)

---

### INFURA_API_KEY

• **INFURA_API_KEY**: `undefined` \| `string`

Infura API Project Id.
Used to defive default Infura connection uri.

#### Defined in

[src/environment.ts:32](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L32)

---

### INFURA_IPFS_PROJECT_ID

• **INFURA_IPFS_PROJECT_ID**: `undefined` \| `string`

Infura Project Id for IPFS API

#### Defined in

[src/environment.ts:74](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L74)

---

### INFURA_IPFS_PROJECT_SECRET

• **INFURA_IPFS_PROJECT_SECRET**: `undefined` \| `string`

Infura Basic Auth for IPFS

#### Defined in

[src/environment.ts:76](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L76)

---

### IPFS_URL

• **IPFS_URL**: `string`

IPFS RPC

#### Defined in

[src/environment.ts:78](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L78)

---

### KOVAN_RPC

• **KOVAN_RPC**: `undefined` \| `string`

#### Defined in

[src/environment.ts:48](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L48)

---

### LOG_REDUX_ACTIONS

• **LOG_REDUX_ACTIONS**: `undefined` \| `string`

#### Defined in

[src/environment.ts:35](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L35)

---

### MAINNET_RPC

• **MAINNET_RPC**: `undefined` \| `string`

Ethereum Mainnet Blockchain

#### Defined in

[src/environment.ts:40](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L40)

---

### OPTIMISM_KOVAN_RPC

• **OPTIMISM_KOVAN_RPC**: `undefined` \| `string`

#### Defined in

[src/environment.ts:64](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L64)

---

### OPTIMISM_RPC

• **OPTIMISM_RPC**: `undefined` \| `string`

#### Defined in

[src/environment.ts:62](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L62)

---

### POLYGON_MUMBAI_RPC

• **POLYGON_MUMBAI_RPC**: `undefined` \| `string`

#### Defined in

[src/environment.ts:52](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L52)

---

### POLYGON_RPC

• **POLYGON_RPC**: `undefined` \| `string`

#### Defined in

[src/environment.ts:50](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L50)

---

### RINKEBY_RPC

• **RINKEBY_RPC**: `undefined` \| `string`

#### Defined in

[src/environment.ts:44](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L44)

---

### ROPSTEN_RPC

• **ROPSTEN_RPC**: `undefined` \| `string`

#### Defined in

[src/environment.ts:42](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L42)

## Functions

### getEnvVar

▸ **getEnvVar**(`name`): `undefined` \| `string`

Get an environment variable in one of the following formants:

-   `name`
-   `REACT_APP_name`
-   `NEXT_PUBLIC_name`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`undefined` \| `string`

#### Defined in

[src/environment.ts:25](https://github.com/leovigna/web3-redux/blob/eb7b6c0/src/environment.ts#L25)
