import axios from 'axios';
import { Config, ConfigId, ConfigWithObjects } from './interface.js';
import { omit } from '../../utils/lodash/index.js';

export function validateId(config: ConfigId) {
    return config.id;
}

/**
 * Validate config.
 * @param config
 */
export function validate(config: Config): Config {
    return config;
}

/**
 * Hydrate config with objects.
 * @param config
 */
export function hydrate(config: Config): ConfigWithObjects {
    const ipfsClient = config.ipfsUrl ? axios.create({ baseURL: config.ipfsUrl }) : undefined;
    const _4byteClient = config._4byteUrl ? axios.create({ baseURL: config._4byteUrl }) : undefined;
    const httpClient = axios.create();

    return {
        ...config,
        ipfsClient,
        _4byteClient,
        httpClient,
    };
}

/**
 * Encode config
 * @param config
 */
export function encode(config: ConfigWithObjects): Config {
    return omit(config, ['ipfsClient', '_4byteClient', 'httpClient']);
}

export default validate;
