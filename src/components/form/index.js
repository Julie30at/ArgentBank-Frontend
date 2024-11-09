import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

export function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // Ajout de l'état pour "remember me"
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification du format de l'email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Réponse complète de l'API :", data); // Ajouter ce log pour examiner la réponse

      if (!response.ok) {
        throw new Error(data.message || 'Email ou mot de passe incorrect');
      }

      const { token } = data.body || {};
      if (token) {
        const storage = rememberMe ? localStorage : sessionStorage; // Utilisation de l'état rememberMe
        storage.setItem('token', token);
        console.log("Token stocké :", token);

        // Récupérer le userName si possible, ou utiliser un nom par défaut
        const userName = email.split('@')[0]; // Par exemple, on utilise la première partie de l'email comme userName

        storage.setItem('username', userName); // Stocker un userName par défaut
        console.log("Username stocké :", userName);

        // Redirection vers la page /user après la connexion réussie
        navigate('/user');
      } else {
        throw new Error('Token manquant dans la réponse');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe} // Liaison de l'état rememberMe
              onChange={(e) => setRememberMe(e.target.checked)} // Mise à jour de l'état rememberMe
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
}
