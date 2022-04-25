import { ThemeProvider } from 'styled-components';
import getDisplayName from './getDisplayName';
import { THEME_COLORS } from '../constants';

export const withThemeProvider = (WrappedComponent: any) => {
    const component = (props: string) => (
        //@ts-ignore
        <ThemeProvider theme={THEME_COLORS[props.theme] ?? THEME_COLORS.theme1}>
            <WrappedComponent {...props} />
        </ThemeProvider>
    );

    component.displayName = `withThemeProvider(${getDisplayName(WrappedComponent)})`;
    return component;
};

export default withThemeProvider;
