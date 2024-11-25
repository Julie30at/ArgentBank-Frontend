import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from './redux/auth/authSlice';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/home';
import { Connexion } from './pages/connexion';
import { User } from './pages/user';
import { Edit } from './pages/edit';
import { Transactions } from './pages/transactions';
import { PrivateRoute } from './redux/auth/privateRoute'; 

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && token && !user) {
      dispatch(fetchProfile());
    }
  }, [isAuthenticated, token, user, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        {/* Routes protégées */}
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
