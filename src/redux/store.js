import { configureStore } from '@reduxjs/toolkit'; 
import { persistStore, persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage'; 
// Utilise le stockage local (localStorage) comme mécanisme de persistance.
import authReducer from './auth/authSlice'; 

const persistConfig = {
  key: 'root', // Définit une clé racine pour stocker les données dans localStorage.
  storage,     // Spécifie que `localStorage` sera utilisé.
  whitelist: ['auth'], // Seule la slice `auth` sera persistée (pas d'autres slices éventuelles).
};

const persistedReducer = persistReducer(persistConfig, authReducer); 
// Enveloppe le reducer `auth` avec la logique de persistance de Redux Persist.

const store = configureStore({
  reducer: {
    auth: persistedReducer, // Associe le reducer persistant à la slice `auth`.
  },
  // Avant d'atteindre les reducers, l'action passe par un ou plusieurs middlewares
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
      // Cela désactive la vérification de sérialisation pour éviter les erreurs
      // avec Redux Persist, qui ajoute des données non sérialisables à l'état.
    }),
});
// Configure le store Redux avec le reducer `auth` persistant et un middleware ajusté.

const persistor = persistStore(store); 
// Crée un `persistor` qui gère la synchronisation entre le store et le stockage.

export { store, persistor }; 
// Exporte le `store` pour l'utiliser dans l'application et le `persistor` pour gérer la persistance.
