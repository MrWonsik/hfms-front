import React from 'react';
import { persistStore } from 'redux-persist'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react' 
import { configureStore } from './_helpers';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.less';

const store = configureStore();
const persistor = persistStore(store);

export const getJwtToken= () => store.getState().user?.user?.token;

render(
    <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('app')
);