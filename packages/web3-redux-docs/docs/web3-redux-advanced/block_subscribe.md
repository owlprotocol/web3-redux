# Block subscription

To sync with on-chain events, it's a good idea to start a block subscription as it can be used as a reference point to keep data fresh. This is recommended but not required as some apps might use a different refresh mechanism.
The `web3-redux` block subscription hook is configured to automatically start/stop the correct subscription if the `networkId` parameter changes. Alternatively, you can use the `subscribe()/unsubscribe()` handlers for more granular control such as handling user interactions.

```typescript
//Blocks.tsx
import { Block } from '@owlprotocol/web3-redux';
const BlocksComponent = ({ networkId }) => {
    const [blocks, { subscribe, unsubsribe }] = Block.useBlockSync(networkId);
};
```

Alternatively, if not using hooks or React in general, you can manually dispatch a block sync action and use the selector as follows:

```typescript
import { Block, Network } from '@owlprotocol/web3-redux';
store.dispatch(Block.subscribe({ networkId: '1' }));
const blocks = Network.selectBlocks(store.getState());
```
