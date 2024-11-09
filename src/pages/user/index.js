import { useState, useEffect } from "react";
import { Header } from "../../containers/header";
import { Footer } from "../../containers/footer";
import { Tags } from "../../components/tags";
import './index.css';

export function User() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [profile, setProfile] = useState(null); // Pour stocker les infos du profil
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // Récupérer le profil si le token est présent
      fetchProfile(storedToken);
    }
  }, []);

  // Fonction pour récupérer le profil utilisateur
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
        setProfile(data.body); // Stocker les données du profil dans le state
      } else {
        throw new Error('Erreur de récupération du profil');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      localStorage.setItem('username', newUsername); // Mettre à jour le nom d'utilisateur dans localStorage
      setUsername(newUsername);
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    setNewUsername(username);
  }, [username]);

  // Extraire prénom et nom du profil
  const firstName = profile?.firstName || 'User'; // Si le prénom est disponible dans le profil
  const lastName = profile?.lastName || ''; // Si le nom est disponible dans le profil

  return (
    <div>
      <Header token={token} username={username} setToken={setToken} setUsername={setUsername} />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back <br />
           {firstName} {lastName} ! <br />
          </h1>
          <button className="edit-button" onClick={handleEditClick}>
            {isEditing ? 'Save Name' : 'Edit Name'}
          </button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Tags />
      </main>
      <Footer />
    </div>
  );
}
