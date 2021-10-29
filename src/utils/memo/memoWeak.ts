import memoize from 'fast-memoize';

//https://medium.com/@ramez.aijaz/hashmap-in-javascript-plain-object-vs-map-prototype-93df80e117b1
//primitive params memoized in Map O(1)
//object params memoized in WeakMap O(1)
//TODO: Type inference
interface memoizeWeakOptions {
    separator?: string; //string separator for composite key
    serializer?: ([...params]: any[]) => any[]; //used serialize certain params to json
}
export default function memoizeWeak(fn: (...args: any[]) => any, options?: memoizeWeakOptions) {
    const separator = options?.separator ?? '-';
    const defaultSerializer = ([...params]) => {
        return [...params];
    };
    const serializer = options?.serializer ?? defaultSerializer;

    return memoize(fn, {
        cache: {
            //@ts-ignore
            create() {
                const cache = new Map(); //store params keys
                let primitiveCacheIdCount = 0;
                const primitiveCache = new Map(); //store primitives
                let objectCacheIdCount = 0;
                const objectCache = new WeakMap(); //store objects
                let functionCacheIdCount = 0;
                const functionCache = new WeakMap(); //store pure function (breaks if using state)
                const serialize = ([...params]: any[]) => {
                    return params
                        .map((x) => {
                            if (typeof x === 'object') {
                                if (objectCache.has(x)) {
                                    return objectCache.get(x);
                                } else {
                                    const id = objectCacheIdCount++;
                                    objectCache.set(x, id);
                                    return id;
                                }
                            } else if (typeof x === 'function') {
                                if (functionCache.has(x)) {
                                    return functionCache.get(x);
                                } else {
                                    const id = functionCacheIdCount++;
                                    functionCache.set(x, id);
                                    return id;
                                }
                            } else {
                                if (primitiveCache.has(x)) {
                                    return primitiveCache.get(x);
                                } else {
                                    const id = primitiveCacheIdCount++;
                                    primitiveCache.set(x, id);
                                    return id;
                                }
                            }
                        })
                        .join(separator);
                };

                return {
                    has([...params]: any[]) {
                        const k = serialize(params);
                        return cache.has(k);
                    },
                    get([...params]: any[]) {
                        const k = serialize(params);
                        return cache.get(k);
                    },
                    set([...params]: any[], value: any) {
                        const k = serialize(params);
                        cache.set(k, value);
                    },
                };
            },
        },
        //@ts-ignore
        serializer,
        strategy: memoize.strategies.variadic,
    });
}
