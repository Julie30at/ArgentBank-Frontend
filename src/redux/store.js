import { configureStore } from '@reduxjs/toolkit'; 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from './auth/authSlice'; 

const persistConfig = {
  key: 'root', 
  storage, 
  whitelist: ['auth'], // Seule la slice `auth` sera persistée.
};

const persistedReducer = persistReducer(persistConfig, authReducer); 

// Configure le store Redux avec le reducer `auth` persistant et un middleware ajusté.
const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Désactive la vérification de la sérialisation
    }),
});

// Crée un `persistor` qui gère la synchronisation entre le store et le stockage.
const persistor = persistStore(store); 

export { store, persistor }; 
