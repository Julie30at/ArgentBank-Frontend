import { NavLink } from 'react-router-dom';
import logo from '../../assets/argentBankLogo.png';
import './index.css'

export function Header() {
    return (
         <nav className="main-nav">
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
       <div className="main-nav-item">
        <i className="fa fa-user-circle"></i>
          <NavLink
            to="/connexion"
            className="a">
            Sign In
          </NavLink>
        </div>
    </nav>
  );
}