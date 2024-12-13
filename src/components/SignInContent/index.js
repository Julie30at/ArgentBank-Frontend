import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, fetchProfile } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './index.css';

export function SignInContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation locale de l'email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('L\'email est invalide.');
      return;
    }

    setErrorMessage(''); // Réinitialise le message d'erreur

    const action = dispatch(login({ email, password, rememberMe }));

    action.then((result) => {
      if (login.fulfilled.match(result)) {
        // Si la connexion réussit, récupérer le profil
        dispatch(fetchProfile()).then((profileAction) => {
          if (fetchProfile.fulfilled.match(profileAction)) {
            navigate('/user');
          } else {
            // Si la récupération du profil échoue, afficher une erreur sans rediriger
            setErrorMessage(profileAction.payload || 'Impossible de récupérer le profil.');
          }
        });
      } else {
        // Si la connexion échoue, afficher l'erreur retournée
        setErrorMessage(result.payload || 'Nom d\'utilisateur ou mot de passe invalide.');
      }
    }).catch((err) => {
      // Gestion des erreurs réseau ou autres
      console.error('Erreur réseau ou serveur :', err);
      setErrorMessage('Erreur réseau ou serveur.');
    });
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-label="Email"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              aria-label="Password"
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
