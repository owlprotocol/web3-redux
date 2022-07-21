import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import getDisplayName from './getDisplayName.js';

export const withActions = (WrappedComponent: any, actions: AnyAction[]) => {
    const Component = (props: any) => {
        const dispatch = useDispatch();
        useEffect(() => {
            //Dispatch mock data here
            actions.forEach((a) => {
                dispatch(a);
            });
        }, [dispatch]);

        return <WrappedComponent {...props} />;
    };
    Component.displayName = `withActions(${getDisplayName(WrappedComponent)})`;
    return Component;
};

export default withActions;
