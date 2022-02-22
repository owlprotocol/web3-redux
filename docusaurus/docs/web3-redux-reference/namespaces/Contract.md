---
id: 'Contract'
title: 'Namespace: Contract'
sidebar_label: 'Contract'
sidebar_position: 0
custom_edit_url: null
---

Comments on Contract module

## Interfaces

-   [CallArgsHash](../interfaces/Contract.CallArgsHash.md)
-   [Contract](../interfaces/Contract.Contract-1.md)
-   [ContractId](../interfaces/Contract.ContractId.md)
-   [EventSubscription](../interfaces/Contract.EventSubscription.md)

## Actions Variables

-   [call](Contract.md#call)
-   [callBatched](Contract.md#callbatched)
-   [create](Contract.md#create)
-   [eventGetPast](Contract.md#eventgetpast)
-   [eventSubscribe](Contract.md#eventsubscribe)
-   [eventUnsubscribe](Contract.md#eventunsubscribe)
-   [fetchAbi](Contract.md#fetchabi)
-   [fetchTransactions](Contract.md#fetchtransactions)
-   [getBalance](Contract.md#getbalance)
-   [getCode](Contract.md#getcode)
-   [getEns](Contract.md#getens)
-   [getNonce](Contract.md#getnonce)
-   [remove](Contract.md#remove)
-   [send](Contract.md#send)
-   [update](Contract.md#update)

## Other Variables

-   [CALL](Contract.md#call)
-   [CALL_BATCHED](Contract.md#call_batched)
-   [CREATE](Contract.md#create)
-   [EVENT_GET_PAST](Contract.md#event_get_past)
-   [EVENT_SUBSCRIBE](Contract.md#event_subscribe)
-   [EVENT_UNSUBSCRIBE](Contract.md#event_unsubscribe)
-   [FETCH_ABI](Contract.md#fetch_abi)
-   [FETCH_TRANSACTIONS](Contract.md#fetch_transactions)
-   [GET_BALANCE](Contract.md#get_balance)
-   [GET_CODE](Contract.md#get_code)
-   [GET_ENS](Contract.md#get_ens)
-   [GET_NONCE](Contract.md#get_nonce)
-   [REMOVE](Contract.md#remove)
-   [SEND](Contract.md#send)
-   [UPDATE](Contract.md#update)

## Actions Functions

-   [set](Contract.md#set)

## Actions

Creates a CALL action and an associated SYNC action Functions

-   [callSynced](Contract.md#callsynced)

## Actions

Creates a GET_BALANCE action and an associated SYNC action Functions

-   [getBalanceSynced](Contract.md#getbalancesynced)

## Actions

Creates a GET_NONCE action and an associated SYNC action Functions

-   [getNonceSynced](Contract.md#getnoncesynced)

## Hooks Functions

-   [contractCallHookFactory](Contract.md#contractcallhookfactory)
-   [contractEventsHookFactory](Contract.md#contracteventshookfactory)
-   [contractHookFactory](Contract.md#contracthookfactory)
-   [contractSendHookFactory](Contract.md#contractsendhookfactory)
-   [useContract](Contract.md#usecontract)
-   [useERC20](Contract.md#useerc20)
-   [useFetchAbi](Contract.md#usefetchabi)
-   [useGetBalance](Contract.md#usegetbalance)
-   [useGetCode](Contract.md#usegetcode)
-   [useGetNonce](Contract.md#usegetnonce)
-   [useSupportsInterface](Contract.md#usesupportsinterface)

## Hooks

Creates a contract/EOA if it doesn&#x27;t exist.
Optional abi parameter also sets the contract&#x27;s ABI.
This hook is mostly used as a building block by other hooks to make sure the contract is in the store. Functions

-   [useContractWithAbi](Contract.md#usecontractwithabi)

## Hooks

Create a contract call and return value. Functions

-   [useContractCall](Contract.md#usecontractcall)

## Hooks

Create a contract send transaction callback method. Functions

-   [useContractSend](Contract.md#usecontractsend)

## Hooks

Fetch and sync contract events. Return list of events with optional filter. Functions

-   [useEvents](Contract.md#useevents)

## Hooks

Fetch transactions from/to contract using Etherscan API Functions

-   [useFetchTransactions](Contract.md#usefetchtransactions)

## Other Functions

-   [SET](Contract.md#set)
-   [callArgsHash](Contract.md#callargshash)
-   [callHash](Contract.md#callhash)
-   [eventId](Contract.md#eventid)
-   [eventSubscriptionHash](Contract.md#eventsubscriptionhash)
-   [getId](Contract.md#getid)
-   [isAction](Contract.md#isaction)
-   [isCallAction](Contract.md#iscallaction)
-   [isCallBatchedAction](Contract.md#iscallbatchedaction)
-   [isCreateAction](Contract.md#iscreateaction)
-   [isEventGetPastAction](Contract.md#iseventgetpastaction)
-   [isEventSubscribeAction](Contract.md#iseventsubscribeaction)
-   [isEventUnsubscribeAction](Contract.md#iseventunsubscribeaction)
-   [isFetchAbiAction](Contract.md#isfetchabiaction)
-   [isFetchTransactionsAction](Contract.md#isfetchtransactionsaction)
-   [isGetBalanceAction](Contract.md#isgetbalanceaction)
-   [isGetCodeAction](Contract.md#isgetcodeaction)
-   [isGetEnsAction](Contract.md#isgetensaction)
-   [isGetNonceAction](Contract.md#isgetnonceaction)
-   [isReducerAction](Contract.md#isreduceraction)
-   [isRemoveAction](Contract.md#isremoveaction)
-   [isSagaAction](Contract.md#issagaaction)
-   [isSendAction](Contract.md#issendaction)
-   [isSetAction](Contract.md#issetaction)
-   [isUpdateAction](Contract.md#isupdateaction)
-   [reducer](Contract.md#reducer)
-   [saga](Contract.md#saga)
-   [selectByFilter](Contract.md#selectbyfilter)
-   [validate](Contract.md#validate)

## Selectors Functions

-   [selectByIdMany](Contract.md#selectbyidmany)
-   [selectByIdSingle](Contract.md#selectbyidsingle)
-   [selectContractCall](Contract.md#selectcontractcall)
-   [selectContractCallFactory](Contract.md#selectcontractcallfactory)
-   [selectContractEvents](Contract.md#selectcontractevents)
-   [selectEthCallId](Contract.md#selectethcallid)
-   [selectEventsFactory](Contract.md#selecteventsfactory)

## References

### getContractId

Renames and re-exports [getId](Contract.md#getid)

---

### validateContract

Renames and re-exports [validate](Contract.md#validate)

## Type aliases

### Action

Ƭ **Action**: [`ReducerAction`](Contract.md#reduceraction) \| [`SagaAction`](Contract.md#sagaaction)

**`internal`**

#### Defined in

[src/contract/actions/index.ts:76](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/index.ts#L76)

---

### BaseWeb3Contract

Ƭ **BaseWeb3Contract**: `Omit`<`Web3Contract`, `"once"` \| `"clone"` \| `"_address"` \| `"_jsonInterface"`\>

**`internal`**

#### Defined in

[src/contract/model/interface.ts:21](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/model/interface.ts#L21)

---

### CallAction

Ƭ **CallAction**: `ReturnType`<typeof [`call`](Contract.md#call)\>

**`internal`**

#### Defined in

[src/contract/actions/call.ts:24](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/call.ts#L24)

---

### CallBatchedAction

Ƭ **CallBatchedAction**: `ReturnType`<typeof [`callBatched`](Contract.md#callbatched)\>

**`internal`**

#### Defined in

[src/contract/actions/callBatched.ts:33](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/callBatched.ts#L33)

---

### CreateAction

Ƭ **CreateAction**: `ReturnType`<typeof [`create`](Contract.md#create)\>

**`internal`**

#### Defined in

[src/contract/actions/create.ts:12](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/create.ts#L12)

---

### EventGetPastAction

Ƭ **EventGetPastAction**: `ReturnType`<typeof [`eventGetPast`](Contract.md#eventgetpast)\>

**`internal`**

#### Defined in

[src/contract/actions/eventGetPast.ts:37](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/eventGetPast.ts#L37)

---

### EventSubscribeAction

Ƭ **EventSubscribeAction**: `ReturnType`<typeof [`eventSubscribe`](Contract.md#eventsubscribe)\>

**`internal`**

#### Defined in

[src/contract/actions/eventSubscribe.ts:16](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/eventSubscribe.ts#L16)

---

### EventUnsubscribeAction

Ƭ **EventUnsubscribeAction**: `ReturnType`<typeof [`eventUnsubscribe`](Contract.md#eventunsubscribe)\>

**`internal`**

#### Defined in

[src/contract/actions/eventUnsubscribe.ts:16](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/eventUnsubscribe.ts#L16)

---

### FetchAbiAction

Ƭ **FetchAbiAction**: `ReturnType`<typeof [`fetchAbi`](Contract.md#fetchabi)\>

**`internal`**

#### Defined in

[src/contract/actions/fetchAbi.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/fetchAbi.ts#L13)

---

### FetchTransactionsAction

Ƭ **FetchTransactionsAction**: `ReturnType`<typeof [`fetchTransactions`](Contract.md#fetchtransactions)\>

**`internal`**

#### Defined in

[src/contract/actions/fetchTransactions.ts:25](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/fetchTransactions.ts#L25)

---

### GetBalanceAction

Ƭ **GetBalanceAction**: `ReturnType`<typeof [`getBalance`](Contract.md#getbalance)\>

**`internal`**

#### Defined in

[src/contract/actions/getBalance.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getBalance.ts#L13)

---

### GetCodeAction

Ƭ **GetCodeAction**: `ReturnType`<typeof [`getCode`](Contract.md#getcode)\>

**`internal`**

#### Defined in

[src/contract/actions/getCode.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getCode.ts#L13)

---

### GetEnsAction

Ƭ **GetEnsAction**: `ReturnType`<typeof [`getEns`](Contract.md#getens)\>

**`internal`**

#### Defined in

[src/contract/actions/getEns.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getEns.ts#L13)

---

### GetNonceAction

Ƭ **GetNonceAction**: `ReturnType`<typeof [`getNonce`](Contract.md#getnonce)\>

**`internal`**

#### Defined in

[src/contract/actions/getNonce.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getNonce.ts#L13)

---

### ReducerAction

Ƭ **ReducerAction**: [`CreateAction`](Contract.md#createaction) \| [`RemoveAction`](Contract.md#removeaction) \| [`UpdateAction`](Contract.md#updateaction) \| [`SetAction`](Contract.md#setaction)

**`internal`**

#### Defined in

[src/contract/actions/index.ts:34](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/index.ts#L34)

---

### RemoveAction

Ƭ **RemoveAction**: `ReturnType`<typeof [`remove`](Contract.md#remove)\>

**`internal`**

#### Defined in

[src/contract/actions/remove.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/remove.ts#L13)

---

### SagaAction

Ƭ **SagaAction**: [`CallAction`](Contract.md#callaction) \| [`CallBatchedAction`](Contract.md#callbatchedaction) \| [`SendAction`](Contract.md#sendaction) \| [`EventGetPastAction`](Contract.md#eventgetpastaction) \| [`EventSubscribeAction`](Contract.md#eventsubscribeaction) \| [`EventUnsubscribeAction`](Contract.md#eventunsubscribeaction) \| [`FetchAbiAction`](Contract.md#fetchabiaction) \| [`GetBalanceAction`](Contract.md#getbalanceaction) \| [`GetNonceAction`](Contract.md#getnonceaction) \| [`FetchTransactionsAction`](Contract.md#fetchtransactionsaction) \| [`GetCodeAction`](Contract.md#getcodeaction) \| [`GetEnsAction`](Contract.md#getensaction) \| [`GetCodeAction`](Contract.md#getcodeaction)

**`internal`**

#### Defined in

[src/contract/actions/index.ts:41](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/index.ts#L41)

---

### SendAction

Ƭ **SendAction**: `ReturnType`<typeof [`send`](Contract.md#send)\>

**`internal`**

#### Defined in

[src/contract/actions/send.ts:20](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/send.ts#L20)

---

### SetAction

Ƭ **SetAction**: `ReturnType`<typeof [`set`](Contract.md#set)\>

**`internal`**

#### Defined in

[src/contract/actions/set.ts:20](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/set.ts#L20)

---

### UpdateAction

Ƭ **UpdateAction**: `ReturnType`<typeof [`update`](Contract.md#update)\>

**`internal`**

#### Defined in

[src/contract/actions/update.ts:12](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/update.ts#L12)

## Actions Variables

### call

• **call**: `ActionCreatorWithPreparedPayload`<[payload: CallActionInput], { `address`: `string` ; `args`: `undefined` \| `any`[] ; `defaultBlock`: `undefined` \| `number` \| `"latest"` ; `from`: `undefined` \| `string` ; `id`: `string` ; `method`: `string` ; `networkId`: `string` }, `string`, `never`, `never`\>

#### Defined in

[src/contract/actions/call.ts:18](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/call.ts#L18)

---

### callBatched

• **callBatched**: `ActionCreatorWithPayload`<`CallBatchedActionInput`, `string`\>

Optimally batched call requests.
Requests are grouped by network and batched with web3.BatchRequest().

**`see`** [https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#batchrequest](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#batchrequest)

Calls will be batched busing Multicall if:

-   network has a Multicall contract
-   from == undefined
-   defaultBlock == 'latest' || defaultBlock == undefined

**`see`** [https://github.com/makerdao/multicall](https://github.com/makerdao/multicall)

#### Defined in

[src/contract/actions/callBatched.ts:30](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/callBatched.ts#L30)

---

### create

• **create**: `ActionCreatorWithPreparedPayload`<[payload: Contract<BaseWeb3Contract\>], `ModelWithId`<[`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\>\>, `string`, `never`, `never`\>

#### Defined in

[src/contract/actions/create.ts:8](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/create.ts#L8)

---

### eventGetPast

• **eventGetPast**: `ActionCreatorWithPreparedPayload`<[payload: EventGetPastActionInput], { `address`: `string` ; `blockBatch`: `number` ; `eventName`: `string` ; `filter?`: { `[key: string]`: `any`; } ; `fromBlock`: `number` ; `networkId`: `string` ; `toBlock`: `number` \| `"latest"` }, `string`, `never`, `never`\>

#### Defined in

[src/contract/actions/eventGetPast.ts:17](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/eventGetPast.ts#L17)

---

### eventSubscribe

• **eventSubscribe**: `ActionCreatorWithPayload`<`EventSubscribeActionInput`, `string`\>

#### Defined in

[src/contract/actions/eventSubscribe.ts:14](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/eventSubscribe.ts#L14)

---

### eventUnsubscribe

• **eventUnsubscribe**: `ActionCreatorWithPayload`<`EventUnsubscribeActionInput`, `string`\>

#### Defined in

[src/contract/actions/eventUnsubscribe.ts:14](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/eventUnsubscribe.ts#L14)

---

### fetchAbi

• **fetchAbi**: `ActionCreatorWithPreparedPayload`<[payload: ContractId], { `address`: `string` ; `networkId`: `string` = payload.networkId }, `string`, `never`, `never`\>

#### Defined in

[src/contract/actions/fetchAbi.ts:9](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/fetchAbi.ts#L9)

---

### fetchTransactions

• **fetchTransactions**: `ActionCreatorWithPreparedPayload`<[payload: FetchTransactionsPayload], { `address`: `string` ; `endblock?`: `number` ; `networkId`: `string` ; `offset?`: `number` ; `page?`: `number` ; `sort?`: `"asc"` \| `"desc"` ; `startblock?`: `number` }, `string`, `never`, `never`\>

#### Defined in

[src/contract/actions/fetchTransactions.ts:21](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/fetchTransactions.ts#L21)

---

### getBalance

• **getBalance**: `ActionCreatorWithPreparedPayload`<[payload: ContractId], { `address`: `string` ; `networkId`: `string` = payload.networkId }, `string`, `never`, `never`\>

#### Defined in

[src/contract/actions/getBalance.ts:9](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getBalance.ts#L9)

---

### getCode

• **getCode**: `ActionCreatorWithPreparedPayload`<[payload: ContractId], { `address`: `string` ; `networkId`: `string` = payload.networkId }, `string`, `never`, `never`\>

#### Defined in

[src/contract/actions/getCode.ts:9](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getCode.ts#L9)

---

### getEns

• **getEns**: `ActionCreatorWithPreparedPayload`<[payload: ContractId], { `address`: `string` ; `networkId`: `string` = payload.networkId }, `string`, `never`, `never`\>

#### Defined in

[src/contract/actions/getEns.ts:9](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getEns.ts#L9)

---

### getNonce

• **getNonce**: `ActionCreatorWithPreparedPayload`<[payload: ContractId], { `address`: `string` ; `networkId`: `string` = payload.networkId }, `string`, `never`, `never`\>

#### Defined in

[src/contract/actions/getNonce.ts:9](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getNonce.ts#L9)

---

### remove

• **remove**: `ActionCreatorWithPreparedPayload`<[payload: ContractId], { `address`: `string` ; `networkId`: `string` = payload.networkId }, `string`, `never`, `never`\>

#### Defined in

[src/contract/actions/remove.ts:9](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/remove.ts#L9)

---

### send

• **send**: `ActionCreatorWithPayload`<`SendActionInput`, `string`\>

#### Defined in

[src/contract/actions/send.ts:18](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/send.ts#L18)

---

### update

• **update**: `ActionCreatorWithPreparedPayload`<[payload: Contract<BaseWeb3Contract\>], `ModelWithId`<[`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\>\>, `string`, `never`, `never`\>

#### Defined in

[src/contract/actions/update.ts:8](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/update.ts#L8)

---

## Other Variables

### CALL

• **CALL**: `string`

**`internal`**

#### Defined in

[src/contract/actions/call.ts:6](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/call.ts#L6)

---

### CALL_BATCHED

• **CALL_BATCHED**: `string`

**`internal`**

#### Defined in

[src/contract/actions/callBatched.ts:5](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/callBatched.ts#L5)

---

### CREATE

• **CREATE**: `string`

**`internal`**

#### Defined in

[src/contract/actions/create.ts:6](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/create.ts#L6)

---

### EVENT_GET_PAST

• **EVENT_GET_PAST**: `string`

**`internal`**

#### Defined in

[src/contract/actions/eventGetPast.ts:5](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/eventGetPast.ts#L5)

---

### EVENT_SUBSCRIBE

• **EVENT_SUBSCRIBE**: `string`

**`internal`**

#### Defined in

[src/contract/actions/eventSubscribe.ts:5](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/eventSubscribe.ts#L5)

---

### EVENT_UNSUBSCRIBE

• **EVENT_UNSUBSCRIBE**: `string`

**`internal`**

#### Defined in

[src/contract/actions/eventUnsubscribe.ts:5](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/eventUnsubscribe.ts#L5)

---

### FETCH_ABI

• **FETCH_ABI**: `string`

**`internal`**

#### Defined in

[src/contract/actions/fetchAbi.ts:7](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/fetchAbi.ts#L7)

---

### FETCH_TRANSACTIONS

• **FETCH_TRANSACTIONS**: `string`

**`internal`**

#### Defined in

[src/contract/actions/fetchTransactions.ts:19](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/fetchTransactions.ts#L19)

---

### GET_BALANCE

• **GET_BALANCE**: `string`

**`internal`**

#### Defined in

[src/contract/actions/getBalance.ts:7](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getBalance.ts#L7)

---

### GET_CODE

• **GET_CODE**: `string`

**`internal`**

#### Defined in

[src/contract/actions/getCode.ts:7](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getCode.ts#L7)

---

### GET_ENS

• **GET_ENS**: `string`

**`internal`**

#### Defined in

[src/contract/actions/getEns.ts:7](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getEns.ts#L7)

---

### GET_NONCE

• **GET_NONCE**: `string`

**`internal`**

#### Defined in

[src/contract/actions/getNonce.ts:7](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getNonce.ts#L7)

---

### REMOVE

• **REMOVE**: `string`

**`internal`**

#### Defined in

[src/contract/actions/remove.ts:7](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/remove.ts#L7)

---

### SEND

• **SEND**: `string`

**`internal`**

#### Defined in

[src/contract/actions/send.ts:5](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/send.ts#L5)

---

### UPDATE

• **UPDATE**: `string`

**`internal`**

#### Defined in

[src/contract/actions/update.ts:6](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/update.ts#L6)

## Actions Functions

### set

▸ `Const` **set**(`payload`): `Object`

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `payload` | `SetActionInput` |

#### Returns

`Object`

| Name            | Type                                                                                                                                                       |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`       | { `id`: `string` ; `key`: keyof [`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\> ; `value`: `any` } |
| `payload.id`    | `string`                                                                                                                                                   |
| `payload.key`   | keyof [`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\>                                              |
| `payload.value` | `any`                                                                                                                                                      |
| `type`          | `string`                                                                                                                                                   |

#### Defined in

[src/contract/actions/set.ts:13](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/set.ts#L13)

---

## Actions

Creates a CALL action and an associated SYNC action Functions

### callSynced

▸ `Const` **callSynced**(`payload`): `Object`

#### Parameters

| Name      | Type                    |
| :-------- | :---------------------- |
| `payload` | `CallSyncedActionInput` |

#### Returns

`Object`

| Name                              | Type                                                                                                                                                                                                                                               |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `callAction`                      | { `payload`: { `address`: `string` ; `args`: `undefined` \| `any`[] ; `defaultBlock`: `undefined` \| `number` \| `"latest"` ; `from`: `undefined` \| `string` ; `id`: `string` ; `method`: `string` ; `networkId`: `string` } ; `type`: `string` } |
| `callAction.payload`              | { `address`: `string` ; `args`: `undefined` \| `any`[] ; `defaultBlock`: `undefined` \| `number` \| `"latest"` ; `from`: `undefined` \| `string` ; `id`: `string` ; `method`: `string` ; `networkId`: `string` }                                   |
| `callAction.payload.address`      | `string`                                                                                                                                                                                                                                           |
| `callAction.payload.args`         | `undefined` \| `any`[]                                                                                                                                                                                                                             |
| `callAction.payload.defaultBlock` | `undefined` \| `number` \| `"latest"`                                                                                                                                                                                                              |
| `callAction.payload.from`         | `undefined` \| `string`                                                                                                                                                                                                                            |
| `callAction.payload.id`           | `string`                                                                                                                                                                                                                                           |
| `callAction.payload.method`       | `string`                                                                                                                                                                                                                                           |
| `callAction.payload.networkId`    | `string`                                                                                                                                                                                                                                           |
| `callAction.type`                 | `string`                                                                                                                                                                                                                                           |
| `syncAction`                      | `undefined` \| { `payload`: [`Sync`](Sync.md#sync) ; `type`: `string` }                                                                                                                                                                            |

#### Defined in

[src/contract/actions/callSynced.ts:15](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/callSynced.ts#L15)

---

## Actions

Creates a GET_BALANCE action and an associated SYNC action Functions

### getBalanceSynced

▸ `Const` **getBalanceSynced**(`payload`): `Object`

#### Parameters

| Name      | Type                          |
| :-------- | :---------------------------- |
| `payload` | `GetBalanceSyncedActionInput` |

#### Returns

`Object`

| Name                                 | Type                                                                                                  |
| :----------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `getBalanceAction`                   | { `payload`: { `address`: `string` ; `networkId`: `string` = payload.networkId } ; `type`: `string` } |
| `getBalanceAction.payload`           | { `address`: `string` ; `networkId`: `string` = payload.networkId }                                   |
| `getBalanceAction.payload.address`   | `string`                                                                                              |
| `getBalanceAction.payload.networkId` | `string`                                                                                              |
| `getBalanceAction.type`              | `string`                                                                                              |
| `syncAction`                         | `undefined` \| { `payload`: [`Sync`](Sync.md#sync) ; `type`: `string` }                               |

#### Defined in

[src/contract/actions/getBalanceSynced.ts:16](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getBalanceSynced.ts#L16)

---

## Actions

Creates a GET_NONCE action and an associated SYNC action Functions

### getNonceSynced

▸ `Const` **getNonceSynced**(`payload`): `Object`

#### Parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `payload` | `GetNonceSyncedActionInput` |

#### Returns

`Object`

| Name                               | Type                                                                                                  |
| :--------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `getNonceAction`                   | { `payload`: { `address`: `string` ; `networkId`: `string` = payload.networkId } ; `type`: `string` } |
| `getNonceAction.payload`           | { `address`: `string` ; `networkId`: `string` = payload.networkId }                                   |
| `getNonceAction.payload.address`   | `string`                                                                                              |
| `getNonceAction.payload.networkId` | `string`                                                                                              |
| `getNonceAction.type`              | `string`                                                                                              |
| `syncAction`                       | `undefined` \| { `payload`: [`Sync`](Sync.md#sync) ; `type`: `string` }                               |

#### Defined in

[src/contract/actions/getNonceSynced.ts:16](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getNonceSynced.ts#L16)

---

## Hooks Functions

### contractCallHookFactory

▸ **contractCallHookFactory**<`T`, `K`\>(`method`): (`networkId`: `undefined` \| `string`, `address`: `undefined` \| `string`, `args?`: `Parameters`<`T`[`"methods"`][`k`]\>, `options?`: `UseContractCallOptions`) => `undefined` \| `Await`<`ReturnType`<`ReturnType`<`T`[`"methods"`][`k`]\>[``"call"``]\>\>

#### Type parameters

| Name | Type                                                                                                            |
| :--- | :-------------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract) |
| `K`  | extends `string` \| `number` \| `symbol` = `string`                                                             |

#### Parameters

| Name     | Type |
| :------- | :--- |
| `method` | `K`  |

#### Returns

`fn`

▸ (`networkId`, `address`, `args?`, `options?`): `undefined` \| `Await`<`ReturnType`<`ReturnType`<`T`[`"methods"`][`k`]\>[``"call"``]\>\>

##### Parameters

| Name        | Type                                 |
| :---------- | :----------------------------------- |
| `networkId` | `undefined` \| `string`              |
| `address`   | `undefined` \| `string`              |
| `args?`     | `Parameters`<`T`[`"methods"`][`k`]\> |
| `options?`  | `UseContractCallOptions`             |

##### Returns

`undefined` \| `Await`<`ReturnType`<`ReturnType`<`T`[`"methods"`][`k`]\>[``"call"``]\>\>

#### Defined in

[src/contract/hooks/useContractCall.ts:88](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useContractCall.ts#L88)

---

### contractEventsHookFactory

▸ **contractEventsHookFactory**<`T`, `K`, `U`\>(`eventName`): (`networkId`: `undefined` \| `string`, `address`: `undefined` \| `string`, `filter?`: { `[key: string]`: `any`; }, `options?`: `UseEventsOptions`) => `undefined` \| [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<`U`\>[]

#### Type parameters

| Name | Type                                                                                                                                  |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract)                       |
| `K`  | extends `string` \| `number` \| `symbol` = `string`                                                                                   |
| `U`  | extends [`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md) = [`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md) |

#### Parameters

| Name        | Type |
| :---------- | :--- |
| `eventName` | `K`  |

#### Returns

`fn`

▸ (`networkId`, `address`, `filter?`, `options?`): `undefined` \| [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<`U`\>[]

##### Parameters

| Name        | Type                    |
| :---------- | :---------------------- |
| `networkId` | `undefined` \| `string` |
| `address`   | `undefined` \| `string` |
| `filter?`   | `Object`                |
| `options?`  | `UseEventsOptions`      |

##### Returns

`undefined` \| [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<`U`\>[]

#### Defined in

[src/contract/hooks/useEvents.ts:97](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useEvents.ts#L97)

---

### contractHookFactory

▸ **contractHookFactory**<`T`\>(`abi`): (`networkId`: `undefined` \| `string`, `address`: `undefined` \| `string`) => `undefined` \| [`Contract`](../interfaces/Contract.Contract-1.md)<`T`\>

#### Type parameters

| Name | Type                                                                                                            |
| :--- | :-------------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract) |

#### Parameters

| Name  | Type        |
| :---- | :---------- |
| `abi` | `AbiItem`[] |

#### Returns

`fn`

▸ (`networkId`, `address`): `undefined` \| [`Contract`](../interfaces/Contract.Contract-1.md)<`T`\>

##### Parameters

| Name        | Type                    |
| :---------- | :---------------------- |
| `networkId` | `undefined` \| `string` |
| `address`   | `undefined` \| `string` |

##### Returns

`undefined` \| [`Contract`](../interfaces/Contract.Contract-1.md)<`T`\>

#### Defined in

[src/contract/hooks/useContract.ts:59](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useContract.ts#L59)

---

### contractSendHookFactory

▸ **contractSendHookFactory**<`T`, `K`\>(`method`): (`networkId`: `undefined` \| `string`, `address`: `undefined` \| `string`) => (`__namedParameters`: { `args`: `Parameters`<`T`[`"methods"`][`k`]\> ; `from`: `string` ; `value?`: `string` }) => `void`

#### Type parameters

| Name | Type                                                                                                            |
| :--- | :-------------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract) |
| `K`  | extends `string` \| `number` \| `symbol` = `string`                                                             |

#### Parameters

| Name     | Type |
| :------- | :--- |
| `method` | `K`  |

#### Returns

`fn`

▸ (`networkId`, `address`): (`__namedParameters`: { `args`: `Parameters`<`T`[`"methods"`][`k`]\> ; `from`: `string` ; `value?`: `string` }) => `void`

##### Parameters

| Name        | Type                    |
| :---------- | :---------------------- |
| `networkId` | `undefined` \| `string` |
| `address`   | `undefined` \| `string` |

##### Returns

`fn`

▸ (`__namedParameters`): `void`

##### Parameters

| Name                       | Type                                 |
| :------------------------- | :----------------------------------- |
| `__namedParameters`        | `Object`                             |
| `__namedParameters.args`   | `Parameters`<`T`[`"methods"`][`k`]\> |
| `__namedParameters.from`   | `string`                             |
| `__namedParameters.value?` | `string`                             |

##### Returns

`void`

#### Defined in

[src/contract/hooks/useContractSend.ts:44](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useContractSend.ts#L44)

---

### useContract

▸ **useContract**<`T`\>(`networkId`, `address`, `abi?`, `sync?`): `undefined` \| [`Contract`](../interfaces/Contract.Contract-1.md)<`T`\>

Creates a contract/EOA if it doesn't exist.
Reads ethereum data and optionally syncs data.
'once' always refreshes, 'ifnull' should refresh only if empty

#### Type parameters

| Name | Type                                                                                                            |
| :--- | :-------------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract) |

#### Parameters

| Name               | Type                                                          |
| :----------------- | :------------------------------------------------------------ |
| `networkId`        | `undefined` \| `string`                                       |
| `address`          | `undefined` \| `string`                                       |
| `abi?`             | `AbiItem`[]                                                   |
| `sync?`            | `Object`                                                      |
| `sync.fetchAbi?`   | `boolean` \| `"ifnull"`                                       |
| `sync.getBalance?` | `false` \| `"ifnull"` \| [`GenericSync`](Sync.md#genericsync) |
| `sync.getCode?`    | `boolean` \| `"ifnull"`                                       |
| `sync.getNonce?`   | `false` \| `"ifnull"` \| [`GenericSync`](Sync.md#genericsync) |

#### Returns

`undefined` \| [`Contract`](../interfaces/Contract.Contract-1.md)<`T`\>

#### Defined in

[src/contract/hooks/useContract.ts:22](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useContract.ts#L22)

---

### useERC20

▸ **useERC20**(`networkId`, `address`, `balanceOfAddress`, `sync?`): `Object`

#### Parameters

| Name                          | Type                                                                            |
| :---------------------------- | :------------------------------------------------------------------------------ |
| `networkId`                   | `undefined` \| `string`                                                         |
| `address`                     | `undefined` \| `string`                                                         |
| `balanceOfAddress`            | `undefined` \| `string`                                                         |
| `sync?`                       | `Object`                                                                        |
| `sync.ApprovalEventsOptions?` | `UseEventsOptions`                                                              |
| `sync.TransferEventsOptions?` | `UseEventsOptions`                                                              |
| `sync.balanceOf?`             | `false` \| `"ifnull"` \| [`GenericSync`](Sync.md#genericsync) \| `"onTransfer"` |
| `sync.totalSupply?`           | `false` \| `"ifnull"` \| [`GenericSync`](Sync.md#genericsync)                   |

#### Returns

`Object`

| Name              | Type                                                                                                                                               |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ApprovalOwner`   | `undefined` \| [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<[`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md)\>[] |
| `ApprovalSpender` | `undefined` \| [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<[`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md)\>[] |
| `TransferFrom`    | `undefined` \| [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<[`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md)\>[] |
| `TransferTo`      | `undefined` \| [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<[`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md)\>[] |
| `balanceOf`       | `any`                                                                                                                                              |
| `decimals`        | `any`                                                                                                                                              |
| `name`            | `any`                                                                                                                                              |
| `symbol`          | `any`                                                                                                                                              |
| `totalSupply`     | `any`                                                                                                                                              |

#### Defined in

[src/contract/hooks/useERC20.ts:19](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useERC20.ts#L19)

---

### useFetchAbi

▸ **useFetchAbi**(`networkId`, `address`, `fetch?`): `undefined` \| `AbiItem`[]

Fetch Contract ABI

#### Parameters

| Name        | Type                    |
| :---------- | :---------------------- |
| `networkId` | `undefined` \| `string` |
| `address`   | `undefined` \| `string` |
| `fetch`     | `boolean` \| `"ifnull"` |

#### Returns

`undefined` \| `AbiItem`[]

#### Defined in

[src/contract/hooks/useFetchAbi.ts:12](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useFetchAbi.ts#L12)

---

### useGetBalance

▸ **useGetBalance**(`networkId`, `address`, `sync?`): `undefined` \| `string`

Get Contract bytecode

#### Parameters

| Name        | Type                                                          |
| :---------- | :------------------------------------------------------------ |
| `networkId` | `undefined` \| `string`                                       |
| `address`   | `undefined` \| `string`                                       |
| `sync`      | `false` \| `"ifnull"` \| [`GenericSync`](Sync.md#genericsync) |

#### Returns

`undefined` \| `string`

#### Defined in

[src/contract/hooks/useGetBalance.ts:14](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useGetBalance.ts#L14)

---

### useGetCode

▸ **useGetCode**(`networkId`, `address`, `fetch?`): `undefined` \| `string`

Get Contract bytecode

#### Parameters

| Name        | Type                    |
| :---------- | :---------------------- |
| `networkId` | `undefined` \| `string` |
| `address`   | `undefined` \| `string` |
| `fetch`     | `boolean` \| `"ifnull"` |

#### Returns

`undefined` \| `string`

#### Defined in

[src/contract/hooks/useGetCode.ts:12](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useGetCode.ts#L12)

---

### useGetNonce

▸ **useGetNonce**(`networkId`, `address`, `sync?`): `undefined` \| `number`

Get Contract bytecode

#### Parameters

| Name        | Type                                                          |
| :---------- | :------------------------------------------------------------ |
| `networkId` | `undefined` \| `string`                                       |
| `address`   | `undefined` \| `string`                                       |
| `sync`      | `false` \| `"ifnull"` \| [`GenericSync`](Sync.md#genericsync) |

#### Returns

`undefined` \| `number`

#### Defined in

[src/contract/hooks/useGetNonce.ts:14](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useGetNonce.ts#L14)

---

### useSupportsInterface

▸ **useSupportsInterface**(`networkId`, `address`, `interfaceId`): `any`

#### Parameters

| Name          | Type                    | Description                                                                                                                                             |
| :------------ | :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `networkId`   | `undefined` \| `string` |                                                                                                                                                         |
| `address`     | `undefined` \| `string` |                                                                                                                                                         |
| `interfaceId` | `undefined` \| `string` | Fetch if contract supports interface. Note that you must first add an IERC165 contract to the store with `useContract(networkId, address, IER165.abi);` |

#### Returns

`any`

#### Defined in

[src/contract/hooks/useSupportsInterface.ts:12](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useSupportsInterface.ts#L12)

---

## Hooks

Creates a contract/EOA if it doesn&#x27;t exist.
Optional abi parameter also sets the contract&#x27;s ABI.
This hook is mostly used as a building block by other hooks to make sure the contract is in the store. Functions

### useContractWithAbi

▸ **useContractWithAbi**(`networkId`, `address`, `abi?`): `undefined` \| [`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\>

#### Parameters

| Name        | Type                    |
| :---------- | :---------------------- |
| `networkId` | `undefined` \| `string` |
| `address`   | `undefined` \| `string` |
| `abi?`      | `AbiItem`[]             |

#### Returns

`undefined` \| [`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\>

#### Defined in

[src/contract/hooks/useContractWithAbi.ts:15](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useContractWithAbi.ts#L15)

---

## Hooks

Create a contract call and return value. Functions

### useContractCall

▸ **useContractCall**<`T`, `K`\>(`networkId`, `address`, `method`, `args?`, `options?`): `Await`<`ReturnType`<`ReturnType`<`T`[`"methods"`][`k`]\>[``"call"``]\>\> \| `undefined`

#### Type parameters

| Name | Type                                                                                                            |
| :--- | :-------------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract) |
| `K`  | extends `string` \| `number` \| `symbol` = `string`                                                             |

#### Parameters

| Name        | Type                                 |
| :---------- | :----------------------------------- |
| `networkId` | `undefined` \| `string`              |
| `address`   | `undefined` \| `string`              |
| `method`    | `undefined` \| `K`                   |
| `args?`     | `Parameters`<`T`[`"methods"`][`k`]\> |
| `options?`  | `UseContractCallOptions`             |

#### Returns

`Await`<`ReturnType`<`ReturnType`<`T`[`"methods"`][`k`]\>[``"call"``]\>\> \| `undefined`

#### Defined in

[src/contract/hooks/useContractCall.ts:26](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useContractCall.ts#L26)

---

## Hooks

Create a contract send transaction callback method. Functions

### useContractSend

▸ **useContractSend**<`T`, `K`\>(`networkId`, `address`, `method`): (`__namedParameters`: { `args`: `Parameters`<`T`[`"methods"`][`k`]\> ; `from`: `string` ; `value?`: `string` }) => `void`

#### Type parameters

| Name | Type                                                                                                            |
| :--- | :-------------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract) |
| `K`  | extends `string` \| `number` \| `symbol` = `string`                                                             |

#### Parameters

| Name        | Type                    |
| :---------- | :---------------------- |
| `networkId` | `undefined` \| `string` |
| `address`   | `undefined` \| `string` |
| `method`    | `undefined` \| `K`      |

#### Returns

`fn`

▸ (`__namedParameters`): `void`

##### Parameters

| Name                       | Type                                 |
| :------------------------- | :----------------------------------- |
| `__namedParameters`        | `Object`                             |
| `__namedParameters.args`   | `Parameters`<`T`[`"methods"`][`k`]\> |
| `__namedParameters.from`   | `string`                             |
| `__namedParameters.value?` | `string`                             |

##### Returns

`void`

#### Defined in

[src/contract/hooks/useContractSend.ts:11](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useContractSend.ts#L11)

---

## Hooks

Fetch and sync contract events. Return list of events with optional filter. Functions

### useEvents

▸ **useEvents**<`T`, `K`, `U`\>(`networkId`, `address`, `eventName`, `filter?`, `options?`): `undefined` \| [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<`U`\>[]

#### Type parameters

| Name | Type                                                                                                                                  |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract)                       |
| `K`  | extends `string` \| `number` \| `symbol` = `string`                                                                                   |
| `U`  | extends [`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md) = [`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md) |

#### Parameters

| Name        | Type                    |
| :---------- | :---------------------- |
| `networkId` | `undefined` \| `string` |
| `address`   | `undefined` \| `string` |
| `eventName` | `undefined` \| `K`      |
| `filter?`   | `Object`                |
| `options?`  | `UseEventsOptions`      |

#### Returns

`undefined` \| [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<`U`\>[]

#### Defined in

[src/contract/hooks/useEvents.ts:23](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useEvents.ts#L23)

---

## Hooks

Fetch transactions from/to contract using Etherscan API Functions

### useFetchTransactions

▸ **useFetchTransactions**(`networkId`, `address`, `options?`): [`Transaction`](../interfaces/Transaction.Transaction-1.md)[]

#### Parameters

| Name        | Type                      |
| :---------- | :------------------------ |
| `networkId` | `undefined` \| `string`   |
| `address`   | `undefined` \| `string`   |
| `options`   | `FetchTransactionOptions` |

#### Returns

[`Transaction`](../interfaces/Transaction.Transaction-1.md)[]

#### Defined in

[src/contract/hooks/useFetchTransactions.ts:14](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/hooks/useFetchTransactions.ts#L14)

---

## Other Functions

### SET

▸ `Const` **SET**(`key`): `string`

**`internal`**

#### Parameters

| Name  | Type                                                                                                          |
| :---- | :------------------------------------------------------------------------------------------------------------ |
| `key` | keyof [`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\> |

#### Returns

`string`

#### Defined in

[src/contract/actions/set.ts:5](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/set.ts#L5)

---

### callArgsHash

▸ **callArgsHash**<`P`\>(`callArgs?`): `string`

#### Type parameters

| Name | Type                      |
| :--- | :------------------------ |
| `P`  | extends `any`[] = `any`[] |

#### Parameters

| Name        | Type                                                           |
| :---------- | :------------------------------------------------------------- |
| `callArgs?` | [`CallArgsHash`](../interfaces/Contract.CallArgsHash.md)<`P`\> |

#### Returns

`string`

#### Defined in

[src/contract/model/callArgs.ts:10](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/model/callArgs.ts#L10)

---

### callHash

▸ **callHash**(`networkId`, `address`, `method`, `callArgs?`): `string`

#### Parameters

| Name        | Type                                                               |
| :---------- | :----------------------------------------------------------------- |
| `networkId` | `string`                                                           |
| `address`   | `string`                                                           |
| `method`    | `string`                                                           |
| `callArgs?` | [`CallArgsHash`](../interfaces/Contract.CallArgsHash.md)<`any`[]\> |

#### Returns

`string`

#### Defined in

[src/contract/model/callArgs.ts:30](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/model/callArgs.ts#L30)

---

### eventId

▸ **eventId**(`event`): `string`

#### Parameters

| Name    | Type        |
| :------ | :---------- |
| `event` | `EventData` |

#### Returns

`string`

#### Defined in

[src/contract/model/eventSubscription.ts:17](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/model/eventSubscription.ts#L17)

---

### eventSubscriptionHash

▸ **eventSubscriptionHash**(`subscription`): `string`

#### Parameters

| Name           | Type                                                               |
| :------------- | :----------------------------------------------------------------- |
| `subscription` | [`EventSubscription`](../interfaces/Contract.EventSubscription.md) |

#### Returns

`string`

#### Defined in

[src/contract/model/eventSubscription.ts:10](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/model/eventSubscription.ts#L10)

---

### getId

▸ **getId**(`id`): `string`

**`internal`**

#### Parameters

| Name | Type                                                 |
| :--- | :--------------------------------------------------- |
| `id` | [`ContractId`](../interfaces/Contract.ContractId.md) |

#### Returns

`string`

#### Defined in

[src/contract/model/interface.ts:57](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/model/interface.ts#L57)

---

### isAction

▸ **isAction**(`action`): action is Action

**`internal`**

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `action`      | `Object` |
| `action.type` | `string` |

#### Returns

action is Action

#### Defined in

[src/contract/actions/index.ts:78](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/index.ts#L78)

---

### isCallAction

▸ `Const` **isCallAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/call.ts:26](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/call.ts#L26)

---

### isCallBatchedAction

▸ `Const` **isCallBatchedAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/callBatched.ts:35](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/callBatched.ts#L35)

---

### isCreateAction

▸ `Const` **isCreateAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/create.ts:14](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/create.ts#L14)

---

### isEventGetPastAction

▸ `Const` **isEventGetPastAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/eventGetPast.ts:39](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/eventGetPast.ts#L39)

---

### isEventSubscribeAction

▸ `Const` **isEventSubscribeAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/eventSubscribe.ts:18](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/eventSubscribe.ts#L18)

---

### isEventUnsubscribeAction

▸ `Const` **isEventUnsubscribeAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/eventUnsubscribe.ts:18](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/eventUnsubscribe.ts#L18)

---

### isFetchAbiAction

▸ `Const` **isFetchAbiAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/fetchAbi.ts:15](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/fetchAbi.ts#L15)

---

### isFetchTransactionsAction

▸ `Const` **isFetchTransactionsAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/fetchTransactions.ts:27](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/fetchTransactions.ts#L27)

---

### isGetBalanceAction

▸ `Const` **isGetBalanceAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/getBalance.ts:15](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getBalance.ts#L15)

---

### isGetCodeAction

▸ `Const` **isGetCodeAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/getCode.ts:15](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getCode.ts#L15)

---

### isGetEnsAction

▸ `Const` **isGetEnsAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/getEns.ts:15](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getEns.ts#L15)

---

### isGetNonceAction

▸ `Const` **isGetNonceAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/getNonce.ts:15](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/getNonce.ts#L15)

---

### isReducerAction

▸ **isReducerAction**(`action`): action is ReducerAction

**`internal`**

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `action`      | `Object` |
| `action.type` | `string` |

#### Returns

action is ReducerAction

#### Defined in

[src/contract/actions/index.ts:36](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/index.ts#L36)

---

### isRemoveAction

▸ `Const` **isRemoveAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/remove.ts:15](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/remove.ts#L15)

---

### isSagaAction

▸ **isSagaAction**(`action`): action is SagaAction

**`internal`**

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `action`      | `Object` |
| `action.type` | `string` |

#### Returns

action is SagaAction

#### Defined in

[src/contract/actions/index.ts:57](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/index.ts#L57)

---

### isSendAction

▸ `Const` **isSendAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/send.ts:22](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/send.ts#L22)

---

### isSetAction

▸ `Const` **isSetAction**(`action`): `boolean`

**`internal`**

#### Parameters

| Name                  | Type                                                                                                          |
| :-------------------- | :------------------------------------------------------------------------------------------------------------ |
| `action`              | `Object`                                                                                                      |
| `action.payload?`     | `Object`                                                                                                      |
| `action.payload.key?` | keyof [`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\> |
| `action.type`         | `string`                                                                                                      |

#### Returns

`boolean`

#### Defined in

[src/contract/actions/set.ts:22](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/set.ts#L22)

---

### isUpdateAction

▸ `Const` **isUpdateAction**(`action`): action is Object

**`internal`**

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `action` | `Action`<`unknown`\> |

#### Returns

action is Object

#### Defined in

[src/contract/actions/update.ts:14](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/actions/update.ts#L14)

---

### reducer

▸ **reducer**(`sess`, `action`): `any`

**`internal`**

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `sess`   | `any`                                        |
| `action` | [`ReducerAction`](Contract.md#reduceraction) |

#### Returns

`any`

#### Defined in

[src/contract/reducer.ts:7](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/reducer.ts#L7)

---

### saga

▸ **saga**(): `Generator`<`AllEffect`<`SagaGenerator`<`FixedTask`<`void`\>, `ForkEffect`<`void`\>\>\>, `void`, `unknown`\>

**`internal`**

#### Returns

`Generator`<`AllEffect`<`SagaGenerator`<`FixedTask`<`void`\>, `ForkEffect`<`void`\>\>\>, `void`, `unknown`\>

#### Defined in

[src/contract/sagas/index.ts:28](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/sagas/index.ts#L28)

---

### selectByFilter

▸ `Const` **selectByFilter**(`state`, `filter`): [`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\>[]

**`internal`**

#### Parameters

| Name     | Type                                                                                                                               |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `state`  | `any`                                                                                                                              |
| `filter` | `undefined` \| `Partial`<[`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\>\> |

#### Returns

[`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\>[]

#### Defined in

[src/contract/selectors/selectByFilter.ts:10](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/selectors/selectByFilter.ts#L10)

---

### validate

▸ **validate**(`contract`): `ModelWithId`<[`Contract`](../interfaces/Contract.Contract-1.md)\>

**`internal`**

#### Parameters

| Name       | Type                                                                                                    |
| :--------- | :------------------------------------------------------------------------------------------------------ |
| `contract` | [`Contract`](../interfaces/Contract.Contract-1.md)<[`BaseWeb3Contract`](Contract.md#baseweb3contract)\> |

#### Returns

`ModelWithId`<[`Contract`](../interfaces/Contract.Contract-1.md)\>

#### Defined in

[src/contract/model/interface.ts:70](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/model/interface.ts#L70)

---

## Selectors Functions

### selectByIdMany

▸ **selectByIdMany**<`T`\>(`state`, `ids?`): ([`Contract`](../interfaces/Contract.Contract-1.md)<`T`\> \| `undefined`)[]

#### Type parameters

| Name | Type                                                                                                            |
| :--- | :-------------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract) |

#### Parameters

| Name    | Type                                                   |
| :------ | :----------------------------------------------------- |
| `state` | `any`                                                  |
| `ids?`  | [`ContractId`](../interfaces/Contract.ContractId.md)[] |

#### Returns

([`Contract`](../interfaces/Contract.Contract-1.md)<`T`\> \| `undefined`)[]

#### Defined in

[src/contract/selectors/selectByIdMany.ts:25](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/selectors/selectByIdMany.ts#L25)

---

### selectByIdSingle

▸ **selectByIdSingle**<`T`\>(`state`, `id`): [`Contract`](../interfaces/Contract.Contract-1.md)<`T`\> \| `undefined`

#### Type parameters

| Name | Type                                                                                                            |
| :--- | :-------------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract) |

#### Parameters

| Name    | Type                                                                |
| :------ | :------------------------------------------------------------------ |
| `state` | `any`                                                               |
| `id`    | `undefined` \| [`ContractId`](../interfaces/Contract.ContractId.md) |

#### Returns

[`Contract`](../interfaces/Contract.Contract-1.md)<`T`\> \| `undefined`

#### Defined in

[src/contract/selectors/selectByIdSingle.ts:20](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/selectors/selectByIdSingle.ts#L20)

---

### selectContractCall

▸ **selectContractCall**<`T`, `K`\>(`state`, `idArgs`, `methodName`, `callArgs?`): `Await`<`ReturnType`<`ReturnType`<`T`[`"methods"`][`k`]\>[``"call"``]\>\> \| `undefined`

#### Type parameters

| Name | Type                                                                                                            |
| :--- | :-------------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract) |
| `K`  | extends `string` \| `number` \| `symbol` = `string`                                                             |

#### Parameters

| Name         | Type                                                                                            |
| :----------- | :---------------------------------------------------------------------------------------------- |
| `state`      | `any`                                                                                           |
| `idArgs`     | `undefined` \| [`ContractId`](../interfaces/Contract.ContractId.md)                             |
| `methodName` | `undefined` \| `K`                                                                              |
| `callArgs?`  | [`CallArgsHash`](../interfaces/Contract.CallArgsHash.md)<`Parameters`<`T`[`"methods"`][`k`]\>\> |

#### Returns

`Await`<`ReturnType`<`ReturnType`<`T`[`"methods"`][`k`]\>[``"call"``]\>\> \| `undefined`

#### Defined in

[src/contract/selectors/selectContractCallById.ts:10](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/selectors/selectContractCallById.ts#L10)

---

### selectContractCallFactory

▸ **selectContractCallFactory**<`T`, `K`\>(`methodName`): (`state`: `any`, `idArgs`: `undefined` \| [`ContractId`](../interfaces/Contract.ContractId.md), `args?`: `Parameters`<`T`[`"methods"`][`k`]\>, `options?`: [`CallArgsHash`](../interfaces/Contract.CallArgsHash.md)<`Parameters`<`T`[`"methods"`][`k`]\>\>) => `undefined` \| `Await`<`ReturnType`<`ReturnType`<`T`[`"methods"`][`k`]\>[``"call"``]\>\>

#### Type parameters

| Name | Type                                                                                                            |
| :--- | :-------------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract) |
| `K`  | extends `string` \| `number` \| `symbol` = `string`                                                             |

#### Parameters

| Name         | Type |
| :----------- | :--- |
| `methodName` | `K`  |

#### Returns

`fn`

▸ (`state`, `idArgs`, `args?`, `options?`): `undefined` \| `Await`<`ReturnType`<`ReturnType`<`T`[`"methods"`][`k`]\>[``"call"``]\>\>

##### Parameters

| Name       | Type                                                                                            |
| :--------- | :---------------------------------------------------------------------------------------------- |
| `state`    | `any`                                                                                           |
| `idArgs`   | `undefined` \| [`ContractId`](../interfaces/Contract.ContractId.md)                             |
| `args?`    | `Parameters`<`T`[`"methods"`][`k`]\>                                                            |
| `options?` | [`CallArgsHash`](../interfaces/Contract.CallArgsHash.md)<`Parameters`<`T`[`"methods"`][`k`]\>\> |

##### Returns

`undefined` \| `Await`<`ReturnType`<`ReturnType`<`T`[`"methods"`][`k`]\>[``"call"``]\>\>

#### Defined in

[src/contract/selectors/selectContractCallById.ts:27](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/selectors/selectContractCallById.ts#L27)

---

### selectContractEvents

▸ **selectContractEvents**<`T`, `K`, `U`\>(`state`, `idArgs`, `eventName`, `returnValuesFilter?`): [`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<`U`\>[] \| `undefined`

#### Type parameters

| Name | Type                                                                                                                                  |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract)                       |
| `K`  | extends `string` \| `number` \| `symbol` = `string`                                                                                   |
| `U`  | extends [`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md) = [`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md) |

#### Parameters

| Name                  | Type                                                                |
| :-------------------- | :------------------------------------------------------------------ |
| `state`               | `any`                                                               |
| `idArgs`              | `undefined` \| [`ContractId`](../interfaces/Contract.ContractId.md) |
| `eventName`           | `undefined` \| `K`                                                  |
| `returnValuesFilter?` | `Object`                                                            |

#### Returns

[`ContractEvent`](../interfaces/ContractEvent.ContractEvent-1.md)<`U`\>[] \| `undefined`

#### Defined in

[src/contract/selectors/selectContractEventsById.ts:15](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/selectors/selectContractEventsById.ts#L15)

---

### selectEthCallId

▸ **selectEthCallId**<`T`, `K`\>(`state`, `idArgs`, `methodName`, `callArgs?`): `string` \| `undefined`

#### Type parameters

| Name | Type                                                                                                            |
| :--- | :-------------------------------------------------------------------------------------------------------------- |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract) |
| `K`  | extends `string` \| `number` \| `symbol` = `string`                                                             |

#### Parameters

| Name         | Type                                                                                            |
| :----------- | :---------------------------------------------------------------------------------------------- |
| `state`      | `any`                                                                                           |
| `idArgs`     | `undefined` \| [`ContractId`](../interfaces/Contract.ContractId.md)                             |
| `methodName` | `undefined` \| `K`                                                                              |
| `callArgs?`  | [`CallArgsHash`](../interfaces/Contract.CallArgsHash.md)<`Parameters`<`T`[`"methods"`][`k`]\>\> |

#### Returns

`string` \| `undefined`

#### Defined in

[src/contract/selectors/selectEthCallId.ts:44](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/selectors/selectEthCallId.ts#L44)

---

### selectEventsFactory

▸ **selectEventsFactory**<`T`, `K`, `U`\>(`eventName`): (`state`: `any`, `id`: `undefined` \| [`ContractId`](../interfaces/Contract.ContractId.md), `filter?`: `any`) => `undefined` \| `U`[]

#### Type parameters

| Name | Type                                                                                                                                  |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `T`  | extends [`BaseWeb3Contract`](Contract.md#baseweb3contract) = [`BaseWeb3Contract`](Contract.md#baseweb3contract)                       |
| `K`  | extends `string` \| `number` \| `symbol` = `string`                                                                                   |
| `U`  | extends [`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md) = [`ReturnValues`](../interfaces/ContractEvent.ReturnValues.md) |

#### Parameters

| Name        | Type |
| :---------- | :--- |
| `eventName` | `K`  |

#### Returns

`fn`

▸ (`state`, `id`, `filter?`): `undefined` \| `U`[]

##### Parameters

| Name      | Type                                                                |
| :-------- | :------------------------------------------------------------------ |
| `state`   | `any`                                                               |
| `id`      | `undefined` \| [`ContractId`](../interfaces/Contract.ContractId.md) |
| `filter?` | `any`                                                               |

##### Returns

`undefined` \| `U`[]

#### Defined in

[src/contract/selectors/selectContractEventsById.ts:51](https://github.com/leovigna/web3-redux/blob/a7bfc9c/src/contract/selectors/selectContractEventsById.ts#L51)
