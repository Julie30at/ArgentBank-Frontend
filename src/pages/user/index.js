import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import { Header } from "../../containers/header";
import { Footer } from "../../containers/footer";
import { Tags } from "../../components/tags";
import { Button } from "../../components/button";
import './index.css';

export function User() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchProfile(storedToken);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.body);
      } else {
        throw new Error('Erreur de récupération du profil');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  // Fonction pour gérer le clic et rediriger vers /edit
  const handleEditClick = () => {
    navigate('/edit');
  };

  const firstName = profile?.firstName || 'User';
  const lastName = profile?.lastName || '';

  return (
    <div>
      <Header 
        token={token} 
        username={username} 
        setToken={setToken} 
        setUsername={setUsername} 
        pageType="user" // Ajout de la prop pageType pour indiquer que c'est la page de l'utilisateur
      />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back <br />
            {firstName} {lastName} ! <br />
          </h1>
          <Button
            label="Edit Name"
            onClick={handleEditClick} // Utilise handleEditClick pour la redirection
          />
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Tags />
      </main>
      <Footer />
    </div>
  );
}
