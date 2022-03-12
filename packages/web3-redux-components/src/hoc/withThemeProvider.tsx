import { ThemeProvider } from 'styled-components';
import { THEME_COLORS } from '../constants';
import getDisplayName from './getDisplayName';

export const withThemeProvider = (WrappedComponent: any) => {
    const component = (props: string) => (
        //@ts-ignore
        <ThemeProvider theme={THEME_COLORS[props.theme] ?? THEME_COLORS.light}>
            <WrappedComponent {...props} />
        </ThemeProvider>
    );

    component.displayName = `withThemeProvider(${getDisplayName(WrappedComponent)})`;
    return component;
};

export default withThemeProvider;
