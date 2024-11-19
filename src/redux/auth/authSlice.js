import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk pour la connexion (login)
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Email ou mot de passe incorrect');
      }

      const { token } = data.body || {};
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', token);

      return { token, email, rememberMe };
    } catch (error) {
      throw new Error(error.message || 'Erreur réseau ou serveur.');
    }
  }
);

// Thunk pour récupérer le profil utilisateur
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { getState }) => {
    const { token } = getState().auth;

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Impossible de récupérer le profil utilisateur.');
      }

      return data.body;
    } catch (error) {
      throw new Error(error.message || 'Erreur réseau ou serveur.');
    }
  }
);

// Initialisation de l'état sans gestion des erreurs dans Redux
const initialState = {
  isAuthenticated: !!(localStorage.getItem('token') || sessionStorage.getItem('token')),
  email: '',
  rememberMe: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || sessionStorage.getItem('token'),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      sessionStorage.clear();
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.rememberMe = action.payload.rememberMe;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
