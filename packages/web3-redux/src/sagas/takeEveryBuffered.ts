import { actionChannel, take, race, delay, fork, join, FixedTask } from 'typed-redux-saga';

//https://redux-saga.js.org/docs/advanced/Channels/

interface TakeEveryBufferedOptions {
    /** Action batching size */
    bufferSize?: number;
    /** Timeout to create action batch */
    bufferBatchTimeout?: number;
    /** Timeout to complete action batch. Move on to next batch after. */
    bufferCompletionTimeout?: number;
}

const defaultOptions: TakeEveryBufferedOptions = {
    bufferSize: 10,
    bufferBatchTimeout: 200,
    bufferCompletionTimeout: 1000,
};
//TODO: takeEveryBatchedBuffered counterpart that combines logic from takeEveryBatched & takeEveryBufferred
/** Similar to takeEvery but yields action buffers */
export function* takeEveryBuffered(action: string, saga: any, options?: TakeEveryBufferedOptions) {
    const { bufferSize, bufferBatchTimeout, bufferCompletionTimeout } = { ...defaultOptions, ...options };

    const requestChan = yield* actionChannel(action);
    while (true) {
        const buffer = [];
        for (let i = 0; i < bufferSize!; i++) {
            // Build batch using action channel, complete batch after `bufferBatchTimeout` ms
            const { action } = yield* race({
                action: take(requestChan),
                timeout: delay(bufferBatchTimeout!),
            });
            if (action) buffer.push(action);
            else break;
        }

        //Concurrent task execution
        const tasks: FixedTask<any>[] = [];
        for (const action of buffer) {
            const task = yield* fork(saga, action);
            tasks.push(task);
        }
        const tasksAll = join(tasks);
        // Execute batch, complete execution after `bufferCompletionTimeout` ms
        const { timeout } = yield* race({
            action: tasksAll,
            timeout: delay(bufferCompletionTimeout!),
        });
        if (timeout) console.debug('takeEveryBuffer buffer execution timeout');
    }
}

export default takeEveryBuffered;
