import axios, { Axios } from 'axios';
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
export function hydrate(config: Config, sess: any): ConfigWithObjects {
    const { id, ipfsUrl, _4byteUrl } = config;
    const configORM: ConfigWithObjects | undefined = sess.Config.withId(id);

    let ipfsClient: Axios | undefined;
    if (configORM?.ipfsUrl && ipfsUrl === configORM.ipfsUrl) {
        //Existing axios instance
        ipfsClient = configORM.ipfsClient;
    } else if (ipfsUrl) {
        //New axios instance
        ipfsClient = axios.create({ baseURL: config.ipfsUrl });
    }

    let _4byteClient: Axios | undefined;
    if (configORM?._4byteUrl && _4byteUrl === configORM._4byteUrl) {
        //Existing axios instance
        _4byteClient = configORM._4byteClient;
    } else if (_4byteUrl) {
        //New axios instance
        _4byteClient = axios.create({ baseURL: config._4byteUrl });
    }

    //Existing or new axios instance
    const httpClient = configORM?.httpClient ? configORM.httpClient : axios.create();

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
