import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@owlprotocol/web3-redux';
import { ThemeProvider } from 'styled-components';
import { THEME_COLORS } from '../src/constants';

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

export const decorators = [
    (Story) => (
        <ThemeProvider theme={THEME_COLORS.light}>
            <Router>
                <Provider store={store}>
                    <Story />
                </Provider>
            </Router>
        </ThemeProvider>
    ),
];
