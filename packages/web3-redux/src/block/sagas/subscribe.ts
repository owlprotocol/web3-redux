import { EventChannel, eventChannel, END, TakeableChannel } from 'redux-saga';
import { put, call, fork, take, select } from 'typed-redux-saga';
import Web3 from 'web3';

import blockFetch from './fetch.js';
import { BlockHeader } from '../model/BlockHeader.js';
import { fetch as fetchAction, SUBSCRIBE } from '../actions/index.js';
import { SubscribeAction } from '../actions/subscribe.js';
import BlockCRUD from '../crud.js';
import NetworkCRUD from '../../network/crud.js';

const SUBSCRIBE_CONNECTED = `${SUBSCRIBE}/CONNECTED`;
const SUBSCRIBE_DATA = `${SUBSCRIBE}/DATA`;
const SUBSCRIBE_ERROR = `${SUBSCRIBE}/ERROR`;
const SUBSCRIBE_CHANGED = `${SUBSCRIBE}/CHANGED`;
const SUBSCRIBE_DONE = `${SUBSCRIBE}/DONE`;
interface ChannelMessage {
    type: typeof SUBSCRIBE_CONNECTED | typeof SUBSCRIBE_DATA | typeof SUBSCRIBE_ERROR | typeof SUBSCRIBE_CHANGED;
    error?: any;
    block?: BlockHeader;
}
function subscribeChannel(web3: Web3): EventChannel<ChannelMessage> {
    const subscription = web3.eth.subscribe('newBlockHeaders');

    return eventChannel((emitter) => {
        subscription
            .on('data', (block: any) => {
                emitter({ type: SUBSCRIBE_DATA, block });
            })
            .on('connected', () => {
                emitter({ type: SUBSCRIBE_CONNECTED });
            })
            .on('error', (error: any) => {
                emitter({ type: SUBSCRIBE_ERROR, error });
                emitter(END);
            })
            .on('changed', (block: any) => {
                emitter({ type: SUBSCRIBE_CHANGED, block });
            });
        // The subscriber must return an unsubscribe function
        return () => {
            subscription.unsubscribe();
        };
    });
}

function* subscribe(action: SubscribeAction) {
    const { payload } = action;
    const { networkId } = payload;

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
    if (!network?.web3) throw new Error(`Network ${networkId} missing web3`);
    const web3 = network.web3;

    while (true) {
        const channel: TakeableChannel<ChannelMessage> = yield* call(subscribeChannel, web3);

        try {
            while (true) {
                const message: ChannelMessage = yield* take(channel);
                const { type, block, error } = message;
                if (type === SUBSCRIBE_DATA) {
                    const newBlock = { ...block!, networkId };
                    yield* put(BlockCRUD.actions.create(newBlock));
                    if (payload.returnTransactionObjects ?? true) {
                        yield* fork(
                            //@ts-expect-error
                            blockFetch,
                            fetchAction({
                                networkId,
                                blockHashOrBlockNumber: newBlock.number,
                                returnTransactionObjects: true,
                            }),
                            true, //Use update
                        );
                    }
                } else if (type === SUBSCRIBE_CHANGED) {
                    const newBlock = { ...block!, networkId };
                    yield* put(BlockCRUD.actions.create(newBlock));
                    if (payload.returnTransactionObjects) {
                        yield* fork(
                            //@ts-expect-error
                            blockFetch,
                            fetchAction({
                                networkId,
                                blockHashOrBlockNumber: newBlock.number,
                                returnTransactionObjects: true,
                            }),
                            true, //Use update
                        );
                    }
                } else if (type === SUBSCRIBE_ERROR) {
                    console.error(error);
                    yield* put({ type: SUBSCRIBE_ERROR, error });
                }
            }
        } catch (error) {
            yield* put({ type: SUBSCRIBE_ERROR, error });
        } finally {
            yield* put({ type: SUBSCRIBE_DONE });
        }
    }
}

export default subscribe;
