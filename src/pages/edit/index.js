import { useState, useEffect } from 'react';
import { Header } from '../../containers/header/index';
import { Footer } from '../../containers/footer';
import { Tags } from '../../components/tags';

export function Edit() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  
  // Utilisation de sessionStorage et localStorage pour récupérer les informations
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || sessionStorage.getItem('firstName') || '');
  const [lastName, setLastName] = useState(localStorage.getItem('lastName') || sessionStorage.getItem('lastName') || '');
  const [userName, setUserName] = useState(''); // Initialiser sans valeur

  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
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
  };

  const handleCancel = () => {
    setUserName(username); // Restaure la valeur initiale de `username`
    setFirstName(localStorage.getItem('firstName') || sessionStorage.getItem('firstName') || '');
    setLastName(localStorage.getItem('lastName') || sessionStorage.getItem('lastName') || '');
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
          <h2>Edit User Info</h2>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="username">User Name</label>
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
              <label htmlFor="firstname">First Name</label>
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
              <label htmlFor="lastname">Last Name</label>
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
        <Tags />
      </main>
      <Footer />
    </div>
  );
}
