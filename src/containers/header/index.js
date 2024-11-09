import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/argentBankLogo.png';
import './index.css';

export function Header({ token, username, setToken, setUsername }) {
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    // Mettre à jour l'état seulement si les valeurs sont absentes
    if (!token && storedToken) setToken(storedToken);
    if (!username && storedUsername) setUsername(storedUsername);
  }, [token, username, setToken, setUsername]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken('');
    setUsername('');
    navigate('/'); // Rediriger vers la page d'accueil
  };

  const formatName = (name) => {
    // Capitaliser la première lettre du prénom et mettre le reste en minuscules
    if (!name) return 'User';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const firstName = formatName(username); // Appliquer la transformation ici

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="main-nav-item">
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
      </div>
    </nav>
  );
}
