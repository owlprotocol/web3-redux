import { LOG_REDUX_ACTIONS } from '../environment.js';

//@ts-ignore
export const crashReporter = () => (next) => (action) => {
    try {
        if (LOG_REDUX_ACTIONS() === 'true' || LOG_REDUX_ACTIONS() === '1') console.debug(action);
        return next(action); // dispatch
    } catch (err) {
        console.error('Redux middleware caught exception!', err);
        throw err; // re-throw error
    }
};

export default crashReporter;
