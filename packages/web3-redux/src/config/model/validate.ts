import axios from 'axios';

import { Config } from './interface.js';
/**
 * Validate config.
 * @param config
 */
export function validate(config: Config): Config {
    const ipfsClient = config.ipfsClient ?? (config.ipfsUrl ? axios.create({ baseURL: config.ipfsUrl }) : undefined);
    const _4byteClient =
        config._4byteClient ?? (config._4byteUrl ? axios.create({ baseURL: config._4byteUrl }) : undefined);

    const validatedConfig = { ...config };
    if (ipfsClient) validatedConfig.ipfsClient = ipfsClient;
    if (_4byteClient) validatedConfig._4byteClient = _4byteClient;

    return validatedConfig;
}

export default validate;
