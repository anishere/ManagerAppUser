import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: authReducer
})
   
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store)