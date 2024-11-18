import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice'; // Redux action pour la déconnexion
import { fetchProfile } from '../../redux/auth/authSlice'; // Thunk pour charger le profil
import logo from '../../assets/argentBankLogo.webp';
import './index.css';

export function Header({ pageType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer le token et l'utilisateur depuis Redux
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Charger les données du profil si le token est présent
    if (token && !user) {
      dispatch(fetchProfile(token));
    }
  }, [token, user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const formatName = (name) => {
    if (!name) return 'User';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const firstName = user?.firstName ? formatName(user.firstName) : 'User';

  return (
    <nav className={`main-nav ${pageType === 'edit' ? 'edit-page' : ''}`}>
      <div className='edit-logo'>
      {pageType === 'edit' && (
        <span className="fa fa-edit icon-informative"></span> 
      )}
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      </div>
      <div className="main-nav-item">
        {pageType === 'edit' ? (
          <>
            <span className="header-first-name">{firstName}</span>
            <span className="fa fa-user-circle"></span>
            <div className='edit-link'>
            <NavLink to="/user" className="a">
              <span className="fa fa-solid fa-gear"></span> 
            </NavLink>
            <NavLink to="/" onClick={handleLogout} className="a sign-out-link">
              <span className="fa fa-power-off"></span>
            </NavLink>
            </div>
          </>
        ) : (
          <>
            <span className="fa fa-user-circle"></span>
            {token ? (
              <>
                <NavLink to="/user" className="a header-first-name">
                  {firstName}
                </NavLink>
                <NavLink to="/" onClick={handleLogout} className="a sign-out-link">
                  <span className="fa fa-sign-out"></span> Sign Out
                </NavLink>
              </>
            ) : (
              <NavLink to="/connexion" className="a sign-in-link">
                Sign In
              </NavLink>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
