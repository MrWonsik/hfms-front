import React from 'react'
import { persistStore } from 'redux-persist'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import App from './app/App'
import { configureStore } from './app/store'
import { persistorTS, store as storeTS } from './app/storeTS'

import 'react-image-lightbox/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import './styles.less'

const queryString = window.location.search;
export const TS_TURN_ON = new URLSearchParams(queryString).has("store");
export const store = TS_TURN_ON ? storeTS : configureStore()
const persistor = TS_TURN_ON ? persistorTS : persistStore(store) 

render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('app')
)
