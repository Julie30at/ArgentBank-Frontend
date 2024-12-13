import { useEffect } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';  
import { useSelector, useDispatch } from 'react-redux'; 
import { logout, fetchProfile } from '../../redux/auth/authSlice';  
import logo from '../../assets/argentBankLogo.webp';  
import './index.css';  

export function Header({ pageType }) {  
  const dispatch = useDispatch();  
  const navigate = useNavigate();  
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile(token));
    }
  }, [token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

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
            <span className="header-first-name">{user?.userName}</span>  
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
        ) : token ? (
          <>
            <NavLink to="/user" className="a header-first-name">
              {user?.userName || 'User'}
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
