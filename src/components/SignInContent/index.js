import { useState } from 'react';
import { useDispatch } from 'react-redux'; // Pas besoin de useSelector pour l'erreur
import { login } from '../../redux/auth/authSlice'; // Importer l'action login depuis le slice
import { useNavigate } from 'react-router-dom';
import './index.css';

export function SignInContent() {
  // État local pour gérer les champs du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // État local pour afficher un message d'erreur personnalisé

  // Dispatch de Redux et navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation de l'email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('L\'email est invalide'); // Affichage d'un message d'erreur si l'email est invalide
      return;
    }

    // Réinitialiser l'erreur à chaque nouvelle tentative
    setErrorMessage('');

    try {
      // Envoi de l'action login avec les données du formulaire
      const action = await dispatch(login({ email, password, rememberMe }));

      if (action.error) {
        // Affichage d'un message d'erreur si l'action échoue
        setErrorMessage(action.error.message || 'Erreur lors de la connexion');
      } else {
        // Redirection vers la page de profil après une connexion réussie
        navigate('/user');
      }
    } catch (err) {
      // Gestion des erreurs réseau ou serveur
      console.error('Erreur réseau ou serveur :', err);
      setErrorMessage('Erreur réseau ou serveur.');
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          {/* Champ pour l'email */}
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-label="Email" // Amélioration de l'accessibilité
            />
          </div>

          {/* Champ pour le mot de passe */}
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              aria-label="Password" // Amélioration de l'accessibilité
            />
          </div>

          {/* Affichage de l'erreur provenant de l'état local */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Case à cocher pour "Remember me" */}
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {/* Bouton de soumission */}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
