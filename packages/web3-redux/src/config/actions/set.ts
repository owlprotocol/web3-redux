import ConfigCRUD from '../../contractevent/config/crud.js';
import { Config } from '../model/interface.js';

/** @internal */
export interface SetActionInput {
    id: string;
    key: keyof Config;
    value: any;
}
/** @category Actions */
export const set = ({ id, key, value }: SetActionInput) => {
    return ConfigCRUD.actions.update({ id, [key]: value });
};

/** @internal */
export type SetAction = ReturnType<typeof set>;
