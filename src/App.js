import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from './redux/auth/authSlice';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Connexion } from './pages/connexion';
import { User } from './pages/user';
import { Edit } from './pages/edit';
import { Transactions } from './pages/transactions';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, token, user } = useSelector((state) => state.auth); // Ajout de profile

  // Chargement conditionnel du profil utilisateur
  useEffect(() => {
    if (isAuthenticated && token && !user) {
      dispatch(fetchProfile());
    }
  }, [isAuthenticated, token, user, dispatch]); // Ajout de profile dans les dépendances

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/user" element={<User />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default App;
