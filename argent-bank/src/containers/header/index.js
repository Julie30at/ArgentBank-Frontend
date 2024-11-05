import { NavLink } from 'react-router-dom';
import logo from '../../assets/argentBankLogo.png';

export function Header() {
    return (
         <nav 
         className="main-nav">
      <NavLink 
      className="main-nav-logo" 
      to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
       <div classNameName="link">
          <NavLink
            to="/connexion"
            classNameName={({ isActive }) => (isActive ? 'active' : '')}
          >
            Sign In
          </NavLink>
        </div>
    </nav>
  );
}