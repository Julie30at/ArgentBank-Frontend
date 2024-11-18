import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../components/header/index';
import { Footer } from '../../components/footer';
import { Tags } from '../../components/tags';
import { fetchProfile } from '../../redux/auth/authSlice'; // Import de la fonction pour récupérer le profil
import './index.css';

export function Edit() {
  // Accéder aux données du store Redux
  const dispatch = useDispatch();
  const { token, user, isAuthenticated } = useSelector((state) => state.auth);
  
  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion (ou afficher un message d'erreur)
  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(fetchProfile(token)); // Récupérer les informations utilisateur
    }
  }, [dispatch, token, isAuthenticated]);

  // Initialisation des états pour le profil
  const [userName, setUserName] = useState(user?.userName || '');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');

  // Gestion de la sauvegarde des modifications
  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saved:', { userName, firstName, lastName });
    // Mettre à jour le profil dans le store Redux ou via une API si nécessaire
    // Pour cet exemple, nous ne mettons à jour que l'état local ici
  };

  // Gestion de l'annulation des modifications
  const handleCancel = () => {
    setUserName(user?.userName || ''); // Restaure les données initiales
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
  };

  return (
    <div>
      <Header pageType="edit" />
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
