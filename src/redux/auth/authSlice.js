import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk pour la connexion (login)
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      // Requête API pour la connexion
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Envoi de l'email et du mot de passe
      });

      const data = await response.json();
      
      // Si la réponse n'est pas OK, retourner une erreur
      if (!response.ok) {
        return rejectWithValue(data.message || 'Email ou mot de passe incorrect');
      }

      // Récupération du token et gestion du stockage (localStorage ou sessionStorage selon "rememberMe")
      const { token } = data.body || {};
      const storage = rememberMe ? localStorage : sessionStorage; // Choisir le stockage approprié
      storage.setItem('token', token); // Sauvegarder le token

      // Retourner les informations nécessaires pour l'état Redux
      return { token, email, rememberMe }; 
    } catch (error) {
      // Si une erreur réseau ou serveur se produit
      return rejectWithValue('Erreur réseau ou serveur.');
    }
  }
);

// Thunk pour récupérer le profil utilisateur
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (token, { rejectWithValue }) => {
    try {
      // Requête API pour récupérer les données utilisateur avec le token
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }, // Authentification via le token
      });

      const data = await response.json();

      // Si la réponse n'est pas OK, retourner une erreur
      if (!response.ok) {
        return rejectWithValue('Impossible de récupérer le profil utilisateur.');
      }

      // Retourner les données utilisateur
      return data.body; 
    } catch (error) {
      // Si une erreur réseau ou serveur se produit
      return rejectWithValue('Erreur réseau ou serveur.');
    }
  }
);

// Vérification de l'authentification à partir du token dans le stockage
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      // Vérifier si un token existe dans localStorage ou sessionStorage
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) return rejectWithValue('Aucun token trouvé'); // Si aucun token n'est trouvé

      // Requête pour récupérer le profil utilisateur avec le token
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      // Si la réponse n'est pas OK, retourner une erreur
      if (!response.ok) {
        return rejectWithValue('Erreur lors de la récupération du profil.');
      }

      // Retourner les données utilisateur
      return data.body;
    } catch (error) {
      // Si une erreur réseau ou serveur se produit
      return rejectWithValue('Erreur réseau ou serveur.');
    }
  }
);

// État initial du slice avec des valeurs par défaut
const initialState = {
  isAuthenticated: false, // Indique si l'utilisateur est authentifié
  email: '', // Stocke l'email de l'utilisateur
  rememberMe: false, // Stocke si l'utilisateur a activé "Remember Me"
  token: null, // Stocke le token d'authentification
  user: null, // Stocke les informations de l'utilisateur
  error: null, // Stocke les messages d'erreur
  loading: false, // Indique si une requête est en cours (pour gérer l'affichage de chargement)
};

// Création du slice pour gérer l'authentification
const authSlice = createSlice({
  name: 'auth', // Nom du slice
  initialState, // L'état initial défini ci-dessus
  reducers: {
    // Réduction pour la déconnexion (reset de l'état)
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      sessionStorage.clear(); // Effacer le stockage de session
      localStorage.clear(); // Effacer le stockage local
    },
  },
  extraReducers: (builder) => {
    builder
      // Lors du succès de la connexion (login)
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.rememberMe = action.payload.rememberMe;
      })
      // En cas d'échec de la connexion (login)
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Lors du succès de la récupération du profil utilisateur
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload; // Mettre à jour les données utilisateur
      })
      // En cas d'échec de la récupération du profil utilisateur
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Lors du succès de la vérification de l'authentification
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload; // Mettre à jour les informations utilisateur
      })
      // En cas d'échec de la vérification de l'authentification
      .addCase(checkAuth.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Exporter l'action logout
export const { logout } = authSlice.actions;

// Exporter le reducer du slice
export default authSlice.reducer;
