import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../components/header/index';
import { Footer } from '../../components/footer';
import { Tags } from '../../components/tags';
import { fetchProfile } from '../../redux/auth/authSlice'; // Import de la fonction pour récupérer le profil
import './index.css';

export function Edit() {
  const dispatch = useDispatch();
  const { token, user, isAuthenticated } = useSelector((state) => state.auth);

  // États locaux pour gérer les champs de formulaire
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Récupérer le profil utilisateur lorsque le composant se charge
  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(fetchProfile(token));
    }
  }, [dispatch, token, isAuthenticated]);

  // Mettre à jour les champs locaux lorsque les données utilisateur sont disponibles
  useEffect(() => {
    if (user) {
      setUserName(user.userName || '');
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [user]);

  // Gestion de la sauvegarde des modifications
  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saved:', { userName, firstName, lastName });
    // Appel à une API pour sauvegarder les données si nécessaire
    // Exemple : dispatch(updateUserProfile({ userName, firstName, lastName }));
  };

  // Gestion de l'annulation des modifications
  const handleCancel = () => {
    setUserName(user?.userName || '');
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
  };

  return (
    <div>
      <Header pageType="edit" />
      <main>
        {user ? (
          <div className="form-container">
            <h2 className="edit-title">Edit user info</h2>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="username">User name:</label>
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
                <label htmlFor="firstname">First name:</label>
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
                <label htmlFor="lastname">Last name:</label>
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
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>Chargement des données...</div>
        )}
        <Tags isEditPage={true} />
      </main>
      <Footer />
    </div>
  );
}
