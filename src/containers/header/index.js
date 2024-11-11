import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/argentBankLogo.webp';
import './index.css';

export function Header({ token, username, setToken, setUsername, pageType }) {
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedUsername = localStorage.getItem('username') || sessionStorage.getItem('username');
    // Mettre à jour l'état seulement si les valeurs sont absentes
    if (!token && storedToken) setToken(storedToken);
    if (!username && storedUsername) setUsername(storedUsername);
  }, [token, username, setToken, setUsername]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    setToken('');
    setUsername('');
    navigate('/'); // Rediriger vers la page d'accueil
  };

  const formatName = (name) => {
    if (!name) return 'User';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const firstName = formatName(username);

  return (
    <nav className={`main-nav ${pageType === 'edit' ? 'edit-page' : ''}`}>
      <div className='edit-logo'>
      {/* Afficher une icône informative sur la page /edit */}
      {pageType === 'edit' && (
        <span className="fa fa-edit icon-informative"></span> // Icône informative
      )}
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      </div>
      <div className="main-nav-item">
        {/* Afficher les éléments à droite dans l'ordre voulu sur /edit */}
        {pageType === 'edit' ? (
          <>
            {/* Prénom */}
            <span className="header-first-name">{firstName}</span>
            {/* Icône user circle */}
            <span className="fa fa-user-circle"></span>
            {/* Icône molette pour paramètres */}
            <NavLink to="/user" className="a">
              <span className="fa fa-cogs"></span> {/* Icône paramètres */}
            </NavLink>
            {/* Icône d'arrêt */}
            <NavLink to="/" onClick={handleLogout} className="a sign-out-link">
              <span className="fa fa-power-off"></span> {/* Icône arrêt */}
            </NavLink>
          </>
        ) : (
          <>
            {/* Afficher pour les autres pages */}
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
