import { useState, useEffect } from 'react';
import { Header } from '../../components/header/index';
import { Footer } from '../../components/footer';
import { Tags } from '../../components/tags';
import './index.css';

export function Edit() {
  // Utilisation de sessionStorage et localStorage pour récupérer les informations
  const [token, setToken] = useState(sessionStorage.getItem('token') || localStorage.getItem('token') || '');
  const [username, setUsername] = useState(sessionStorage.getItem('username') || localStorage.getItem('username') || '');
  
  // Pour les informations du profil, vérifie sessionStorage puis localStorage
  const [firstName, setFirstName] = useState(sessionStorage.getItem('firstName') || localStorage.getItem('firstName') || '');
  const [lastName, setLastName] = useState(sessionStorage.getItem('lastName') || localStorage.getItem('lastName') || '');
  const [userName, setUserName] = useState(username); // Initialise avec la valeur de `username` 

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('username') || localStorage.getItem('username');
    if (storedUserName) {
      setUserName(storedUserName); // Met à jour l'état avec la valeur stockée
    }
  }, []); // Déclenche au premier rendu

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saved:', { userName, firstName, lastName });
    // Mise à jour du localStorage et sessionStorage si nécessaire
    localStorage.setItem('username', userName); 
    sessionStorage.setItem('username', userName);
    localStorage.setItem('firstName', firstName); 
    sessionStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName); 
    sessionStorage.setItem('lastName', lastName);
  };

  const handleCancel = () => {
    setUserName(username); // Restaure la valeur initiale de `username`
    setFirstName(sessionStorage.getItem('firstName') || localStorage.getItem('firstName') || '');
    setLastName(sessionStorage.getItem('lastName') || localStorage.getItem('lastName') || '');
  };

  return (
    <div>
      <Header 
        token={token} 
        username={username} 
        setToken={setToken} 
        setUsername={setUsername} 
        pageType="edit"
      />
      <main>
        <div className="form-container">
          <h2 className='edit-title'>Edit user info</h2>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="username">User name: </label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstname">First name: </label>
              <input 
                type="text" 
                id="firstname" 
                name="firstname" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)} 
                disabled 
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last name: </label>
              <input 
                type="text" 
                id="lastname" 
                name="lastname" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} 
                disabled 
              />
            </div>
            <div className="button-group">
              <button type="submit" className="save-button">Save</button>
              <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
        <Tags isEditPage={true} />  
     </main>
      <Footer />
    </div>
  );
}
