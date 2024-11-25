import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk pour la connexion (login)
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      // Appel API pour la connexion
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Retourne un message d'erreur précis si disponible
        return rejectWithValue(data.message || 'Email ou mot de passe incorrect.');
      }

      const { token } = data.body || {};
      // Stocke le token selon `rememberMe` (localStorage ou sessionStorage)
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', token);

      return { token, email, rememberMe };
    } catch (error) {
      // Retourne une erreur réseau ou serveur
      return rejectWithValue(error.message || 'Erreur réseau ou serveur.');
    }
  }
);

// Thunk pour récupérer le profil utilisateur
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      // Tentative de récupération du corps de la réponse, si disponible
      const data = await response.json();

      if (!response.ok) {
        // Si la réponse n'est pas ok, on retourne un message générique
        return rejectWithValue('Erreur serveur');
      }

      return data.body;
    } catch (error) {
      // En cas d'erreur réseau ou autre erreur serveur, on retourne un message générique
      return rejectWithValue('Erreur serveur');
    }
  }
);

// État initial
const initialState = {
  isAuthenticated: !!(localStorage.getItem('token') || sessionStorage.getItem('token')),
  email: '',
  rememberMe: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || sessionStorage.getItem('token'),
  user: null,
};

// authSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      // Déconnexion : réinitialise les données d'authentification
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.email = null;
      sessionStorage.clear();
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion du login
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.rememberMe = action.payload.rememberMe;
      })
      // Gestion du profil utilisateur
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
