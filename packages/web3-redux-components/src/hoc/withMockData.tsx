import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import getDisplayName from './getDisplayName';

export const withMockData = (WrappedComponent: any, actions: AnyAction[]) => {
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
    Component.displayName = `withMockData(${getDisplayName(WrappedComponent)})`;
    return Component;
};

export default withMockData;
