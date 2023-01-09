import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './components/c0-app/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
