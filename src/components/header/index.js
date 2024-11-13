import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/argentBankLogo.webp';
import './index.css';

export function Header({ token, username, setToken, setUsername, pageType }) {
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedUsername = localStorage.getItem('username') || sessionStorage.getItem('username');
    // Met à jour l'état seulement si les valeurs sont absentes
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
    navigate('/'); 
  };

  const formatName = (name) => {
    if (!name) return 'User';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const firstName = formatName(username);

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
