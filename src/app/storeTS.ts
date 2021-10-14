import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import users from '../features/usersManagement/users' 
import user from '../features/user/user'
import alert from '../_components/alert/alert'
import modal from '../_components/modal/modal'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const reducers = combineReducers({
    users,
    user,
    alert,
    modal
  })

const persistedReducer = persistReducer(persistConfig, reducers)

export const storeTS = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware<RootState>({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistorTS = persistStore(storeTS);

export type RootState = ReturnType<typeof persistedReducer>
export type AppDispatch = typeof storeTS.dispatch