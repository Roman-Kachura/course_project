import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';
import './api/firebaseApi';
import { LangProvider } from './i18n';
import {App} from './components/c0-app/App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HashRouter>
            <Provider store={store}>
                <LangProvider>
                    <App/>
                </LangProvider>
            </Provider>
        </HashRouter>
    </React.StrictMode>
);
reportWebVitals();
