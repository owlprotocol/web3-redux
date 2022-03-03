---
sidebar_position: 1
---

# Metamask

See [Manual Network Initialization](#manual) for more detail.
Metamask can cause issues as the injected Web3 instance is mutable and changes as users change networks. To mitigate this, Networks can be initialized with 2 web3 instances, one for read-only calls (eg. Infura) and one for wallet signed send transactions (Metamask). This way, subcriptions and call syncs can continue to work even if a user changes networks.

Override the optional `web3Sender` parameter when initializing the Network and set it to the injected Web3 instance. The regular read-only web3 instance should

```typescript
const web3Sender = window.web3; //Metamask wallet, used for send transactions
const web3ReadOnly = new Web3('ws://localhost:8545'); //Used for calls/subscriptions
store.dispatch(Network.create({ networkId: '1', web3: web3ReadOnly, web3Sender }));
```
