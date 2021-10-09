import React from 'react'
import { persistStore } from 'redux-persist'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { configureStore } from './_services'
import App from './app/App'

import 'react-image-lightbox/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import './styles.less'

const store = configureStore()
const persistor = persistStore(store)

export const getJwtToken = () => store.getState().user?.user?.token

render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('app')
)
