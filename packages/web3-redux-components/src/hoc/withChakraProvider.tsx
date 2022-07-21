import { ChakraProvider } from '@chakra-ui/react';
import getDisplayName from './getDisplayName.js';
import theme from '../theme/index.js';

export const withChakraProvider = (WrappedComponent: any) => {
    const component = (props: any) => {
        return (
            <ChakraProvider theme={theme}>
                <WrappedComponent {...props} />
            </ChakraProvider>
        );
    };
    component.displayName = `withChakraProvider(${getDisplayName(WrappedComponent)})`;
    return component;
};

export default withChakraProvider;
