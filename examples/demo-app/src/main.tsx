import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, Environment } from '@owlprotocol/web3-redux';
import { getEnvironment } from './environment.js';
import './index.css';
import App from './App';

Environment.setEnvironment(getEnvironment() as any);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
