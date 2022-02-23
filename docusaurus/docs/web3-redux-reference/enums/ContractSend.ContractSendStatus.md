---
id: 'ContractSend.ContractSendStatus'
title: 'Enumeration: ContractSendStatus'
sidebar_label: 'ContractSendStatus'
custom_edit_url: null
---

[ContractSend](../namespaces/ContractSend.md).ContractSendStatus

## Enumeration members

### CONFIRMED

• **CONFIRMED** = `"CONFIRMED"`

Transaction confirmations > 0.

#### Defined in

[src/contractsend/model/interface.ts:36](https://github.com/leovigna/web3-redux/blob/be15552/src/contractsend/model/interface.ts#L36)

---

### ERROR

• **ERROR** = `"ERROR"`

Errored. Wallet rejection or network error.

#### Defined in

[src/contractsend/model/interface.ts:32](https://github.com/leovigna/web3-redux/blob/be15552/src/contractsend/model/interface.ts#L32)

---

### PENDING_CONFIRMATION

• **PENDING_CONFIRMATION** = `"PENDING_CONFIRMATION"`

Pending blockchain confirmation. Hash created but 0 confirmations.

#### Defined in

[src/contractsend/model/interface.ts:34](https://github.com/leovigna/web3-redux/blob/be15552/src/contractsend/model/interface.ts#L34)

---

### PENDING_SIGNATURE

• **PENDING_SIGNATURE** = `"PENDING_SIGNATURE"`

Pending wallet signature. No transaction hash.

#### Defined in

[src/contractsend/model/interface.ts:30](https://github.com/leovigna/web3-redux/blob/be15552/src/contractsend/model/interface.ts#L30)
