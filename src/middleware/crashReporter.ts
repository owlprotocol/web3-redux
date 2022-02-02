//@ts-ignore
export const crashReporter = () => (next) => (action) => {
    try {
        console.debug(action);
        return next(action); // dispatch
    } catch (err) {
        console.error('Redux middleware caught exception!', err);
        throw err; // re-throw error
    }
};

export default crashReporter;
