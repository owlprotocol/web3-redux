import { EventEmitter } from 'events';
interface LogEmitter extends EventEmitter {
    log(msg: string): any;
}
export function ganacheLogger(): LogEmitter {
    //@ts-ignore
    const emitter: LogEmitter = new EventEmitter();
    emitter.log = (message: string) => {
        message = message.replace(/</g, '').replace(/>/g, '');
        emitter.emit('log', message);

        const rpcMessage = JSON.parse(message);
        if (Array.isArray(rpcMessage)) {
            //Ignore rpc response log
            if (rpcMessage[0].method) {
                emitter.emit('rpc_batch', rpcMessage);
                //Batched rpc call
                rpcMessage.forEach((m) => {
                    if (!!m.jsonrpc) {
                        emitter.emit('rpc', rpcMessage);
                    }
                    if (!!m.method) {
                        emitter.emit(m.method, rpcMessage);
                    }
                });
            }
        } else {
            //Ignore rpc response log
            if (!!rpcMessage.jsonrpc) {
                emitter.emit('rpc', rpcMessage);
            }
            if (!!rpcMessage.method) {
                emitter.emit(rpcMessage.method, rpcMessage);
            }
        }
    };

    return emitter;
}

export default ganacheLogger;
